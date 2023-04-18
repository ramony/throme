import { makeAutoObservable, runInAction } from "mobx";

import ConfigLoad from '@/service/ConfigLoad';
import ContentParse from '@/service/ContentParse';
import DataService from '@/service/DataService';
import { hashCode } from '@/utils/StringUtils';
import Unsafe from '@/utils/Unsafe';

class DownloadStore {

  downloadList = [];

  logs = ["Log Console"];

  filterOutKeywords = []

  constructor() {
    makeAutoObservable(this);
  }

  async loadConfig() {
    let config = await ConfigLoad.loadDownloads();
    let { list = [], defaultRange = [1, 3], filterOutKeywords = [] } = config;
    let [from, to] = defaultRange;
    runInAction(() => {
      this.downloadList = list.map(item => ({ checked: false, from, to, skip: true, ...item }));
    })
    this.filterOutKeywords = filterOutKeywords;
  }

  async startDownload() {
    //start to download from remote server.
    const { downloadList } = this;
    if (this.downloadList.length < 1) {
      this.buildLog(['Download list is required']);
      return;
    }
    let rules = await ConfigLoad.loadRules();
    let contentParse = new ContentParse(rules);
    this.addLogs("Start job");
    for (let item of downloadList) {
      if (!item.checked) {
        continue;
      }
      for (let i = item.from; i < item.to; i++) {
        let url = item.url.replace("{pageNo}", i);
        // this.addLogs(`Start to download ${url}`)
        let { listingData = [] } = await contentParse.parse(url);
        await this.mappingListingData(listingData, i, contentParse);
        let insertCount = await DataService.createDetail(listingData, count => {
          this.addLogs(`Done ${url}, count=${count}`)
          DataService.createList({ pageUrl: url });
        });
        if (insertCount === 0 && item.skip) {
          break;
        }
      }
    }
    this.addLogs("Done.")
  }

  async mappingListingData(listingData, pageNo, contentParse) {
    for (let item of listingData) {
      let contentIds = await contentParse.queryContentIds(item.url)
      let detailId = contentIds[0];
      item.detailId = detailId
      item.detailType = contentIds[1];
      item.detailOrder = /^[0-9]+$/.test(detailId) ? detailId : hashCode(detailId);
      item.detailTitle = item.title
      item.detailTitle = item.title
      item.detailUrl = item.url
      item.readFlag = 0;
      item.localFlag = 0;
      item.tagId = 0;
      item.pageNo = pageNo;
      item.keyword = Unsafe.getKeyword(item.title)
    };
  }

  async markAllReadWithSameKeyword() {
    DataService.markAllReadWithSameKeyword(count => {
      this.addLogs('processCount:' + count);
    });
  }

  addLogs(newLog) {
    this.logs.push(newLog);
  }

  changeText(index, keyName, e) {
    let value = e.target.value;
    this.downloadList[index][keyName] = value;
  }

  changeChecked(index, keyName, e) {
    let checked = e.target.checked;
    this.downloadList[index][keyName] = checked;
  }

}

export default DownloadStore