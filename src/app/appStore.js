import { makeAutoObservable, runInAction } from "mobx";

import ConfigLoad from '@/service/ConfigLoad';
import DataService from '@/service/DataService';
import ContentParse from '@/service/ContentParse';
import { bindClassMethods } from '@/utils/ClassUtils';

class AppStore {

  listingData = [];

  contentData = [];

  loading = false;

  listingNext = null;

  autoDisplay = false;

  nextUrlVisitSet = new Set();

  constructor() {
    makeAutoObservable(this);
    bindClassMethods(this);
  }

  async loadConfig(embedRules) {
    console.log('loadConfig invoked');
    let rules = embedRules || await ConfigLoad.loadRules()
    this.contentParse = new ContentParse(rules);
    return this.contentParse;
  }

  handleEntry() {
    this.handleUrl(ConfigLoad.loadEntryPath());
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
    await Promise.all(urls.map(url => this.handleUrlInner(url, append)));
    runInAction(() => this.loading = false);
  }

  async handleUrlInner(url, append) {
    let result = await this.contentParse.parse(url, append);
    if (!result) {
      return;
    }
    if (result.unMatched) {
      console.log('No rule for url', url);
      return;
    }
    runInAction(() => this.handleUrlData(result, append))
    if (result.listFlag) {
      this.listingNext = result.listingNext;
      if (this.autoDisplay && result?.autoDisplayList) {
        console.log('auto display count:', result.listingData.length);
        const itemUrls = result.listingData.map(item => item.url);
        setTimeout(async () => this.handleUrl(itemUrls, true), 1)
      }
    } else {
      if (!append) {
        //if new content, reset scrollTop value.
        document.getElementsByClassName("Content")[0].scrollTop = 0;
      }
    }
  }

  handleUrlData(result, append) {
    if (result.listFlag) {
      if (append) {
        this.listingData.push(...result.listingData);
      } else {
        this.listingData = [...result.listingData];
        this.contentData = []
      }
    } else {
      if (append) {
        this.contentData.push(...result.contentData)
      } else {
        this.contentData = [...result.contentData];
      }
    }
  }

  handleNext() {
    let { nextUrlVisitSet, listingNext } = this;
    if (!listingNext) {
      return;
    }
    if (this.nextUrlVisitSet.has(listingNext)) {
      return;
    }
    nextUrlVisitSet.add(listingNext);
    console.log('handleNext invoked, url:', listingNext);

    this.handleUrl(listingNext, true);
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
    this.contentData.splice(index, 1)
  }

  closeAllContent() {
    this.contentData = [];
  }

  removeContent(index, item) {
    let contentIds = item.contentIds;
    DataService.markReadByDetailId(contentIds[0], contentIds[1])
    this.closeContent(index);
  }

  likeContent(index, item) {
    let contentIds = item.contentIds;
    DataService.markScore(contentIds[0], contentIds[1], 10)
    this.closeContent(index);
  }

}

export { AppStore };