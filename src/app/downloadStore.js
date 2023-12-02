import { makeAutoObservable, runInAction } from "mobx";

import ConfigLoad from '@/service/ConfigLoad';
import ContentParse from '@/service/ContentParse';
import DataService from '@/service/DataService';
import { toBigInt } from '@/utils/StringUtils';
import Unsafe from '@/utils/Unsafe';
import { bindClassMethods } from '@/utils/ClassUtils';
// import { nanoid } from 'nanoid'

class DownloadStore {

  downloadList = [];

  logs = [];

  filterOutKeywords = []

  constructor() {
    makeAutoObservable(this);
    bindClassMethods(this);
    this.addLogs("Log Console:");
  }

  async loadConfig() {
    let config = await ConfigLoad.loadDownloads();
    let { list = [], defaultRange = [1, 100], filterOutKeywords = [] } = config;
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
        listingData = this.filterListingData(listingData, i, contentParse, item.skipTitleKeyword);
        let insertCount = await DataService.createDetail(listingData, count => {
          this.addLogs(`Done ${url}, count=${count.data}`)
          DataService.createList({ pageUrl: url });
        }, (errMsg) => {
          this.addLogs(`Error to fetch ${url}, errMsg: ${errMsg}`)
        });
        if (insertCount === 0 && item.skip) {
          break;
        }
      }
    }
    this.addLogs("Done.")
  }

  filterListingData(listingData, pageNo, contentParse, skipTitleKeyword) {
    var result = [];
    for (let item of listingData) {
      let contentIds = contentParse.queryContentIds(item.url)
      if (!contentIds) {
        continue;
      }
      item.readFlag = 0;
      if (skipTitleKeyword && item.title.includes(skipTitleKeyword)) {
        console.log('skip ' + item.title);
        item.readFlag = 1;
      }
      let detailId = contentIds[0];
      item.detailType = contentIds[1];
      item.detailId = detailId
      //item.detailOrder = /^[0-9]+$/.test(detailId) ? detailId : hashCode(detailId);
      let detailOrder = toBigInt(detailId);
      item.detailOrder = detailOrder
      item.detailTitle = item.title
      item.detailUrl = item.url
      item.localFlag = 0;
      item.tagId = 0;
      item.pageNo = pageNo;
      item.keyword = Unsafe.getKeyword(item.title);
      result.push(item);
    };
    return result;
  }

  async markAllReadWithSameKeyword() {
    DataService.markAllReadWithSameKeyword(res => {
      this.addLogs('processCount:' + res.data);
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