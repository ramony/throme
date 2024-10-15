import { makeAutoObservable, runInAction } from "mobx";

import ConfigLoad from '@/service/ConfigLoad';
import DataService from '@/service/DataService';
import ContentParse from '@/service/ContentParse';
import { bindClassMethods } from '@/utils/ClassUtils';
import { nanoid } from 'nanoid'
import ApiHost from '@/utils/ApiHost';

class AppStore {

  listingData = [];

  listingSelected = { index: -1 };

  contentData = [];

  loading = false;

  listingNext = null;

  autoDisplay = false;

  totalPages = null;

  nextUrlVisitSet = new Set();

  constructor() {
    makeAutoObservable(this);
    bindClassMethods(this);
  }

  async loadConfig() {
    console.log('loadConfig invoked');
    let rules = await ConfigLoad.loadRules()
    this.contentParse = new ContentParse(rules);
  }

  handleEntry() {
    this.handleUrl(ConfigLoad.loadEntryPath());
  }

  async selectNextItem() {
    let { index } = this.listingSelected;
    if (index >= 0) {
      this.handleItemSelected(index + 1);
    }
  }

  async handleItemSelected(index) {
    if (index >= this.listingData.length) {
      return;
    }
    let item = this.listingData[index];
    this.handleUrl(item.urlFn || item.url);
    this.listingSelected = { url: item.url, index };
  }

  async handleUrl(urls, append) {
    console.log('handleUrl invoked');
    if (!urls || !this.contentParse) {
      return;
    }
    if (!Object.prototype.toString.call(urls).includes('Array')) {
      urls = [urls];
    }
    runInAction(() => this.loading = true);
    urls = await this.contentParse.flatUrl(urls);
    if (urls.length > 0) {
      if (!append) {
        //reset list view.
        await this.handleUrlInner(urls.shift(), false);
      }
      if (urls.length > 0) {
        await Promise.all(urls.map(url => this.handleUrlInner(url, true)));
      }
    }
    runInAction(() => this.loading = false);
  }

  async handleNext() {
    let url = this.listingNext;
    if (!url) {
      return;
    }
    if (this.nextUrlVisitSet.has(url)) {
      return;
    }
    this.nextUrlVisitSet.add(url);
    console.log('handleNext invoked, url:', url);

    this.handleUrl(url, true);
  }

  async handleUrlInner(url, append) {
    console.log('url', url)
    if (url) {
      url = url.replace('@apiHost@', ApiHost.GetAPIHost());
    }
    let result = await this.contentParse.parse(url, append);
    if (!result) {
      return;
    }
    if (result.unMatched) {
      console.log('No rule for url', url);
      return;
    }
    if (result.listFlag) {
      this.totalPages = result.totalPages;
      runInAction(() => this.handleListingData(result, append));
      this.listingNext = result.listingNext;
      if (this.autoDisplay && result?.autoDisplayList) {
        console.log('auto display count:', result.listingData.length);
        const itemUrls = result.listingData.map(item => item.url);
        setTimeout(async () => this.handleUrl(itemUrls, true), 1)
      }
    } else {
      runInAction(() => this.handleContentData(result, append))
      if (!append) {
        //if new content, reset scrollTop value.
        document.getElementsByClassName("Content")[0].scrollTop = 0;
      }
    }
  }

  handleListingData(result, append) {
    if (append) {
      this.listingData.push(...result.listingData);
    } else {
      this.listingData = [...result.listingData];
      this.listingSelected = { index: -1 };
      this.contentData = [];
    }
  }

  handleContentData(result, append) {
    if (append) {
      this.contentData.push(...result.contentData)
    } else {
      this.contentData = [...result.contentData];
    }
  }

  openLink() {
    console.log('openLink invoked')
    let url = prompt('Open URL:')
    if (url) {
      this.handleUrl(url);
    }
  }

  resetLink() {
    console.log('resetLink invoked');
    //To reset base url so that we can reload local entry.json data.
    document.getElementsByTagName("base")[0].setAttribute('href', '')
    this.handleEntry();
  }

  setAutoDisplay(value) {
    this.autoDisplay = value;
  }

  closeContent(index) {
    this.contentData.splice(index, 1);
    if (this.contentData.length == 0) {
      this.selectNextItem();
    }
  }

  closeAllContent() {
    this.contentData = [];
  }

  removeContent(index, item) {
    let contentIds = item.contentIds;
    DataService.markReadByDetailId(contentIds[0], contentIds[1])
    this.closeContent(index);
  }

  markLaterContent(index, item) {
    let contentIds = item.contentIds;
    DataService.markReadLater(contentIds[0], contentIds[1], 10)
    this.closeContent(index);
  }

}

export { AppStore };