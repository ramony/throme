import { observable } from "mobx";

import HttpAdaptor from '@/service/HttpAdaptor';
import DataService from '@/service/DataService';
import { extend } from '@/utils/Prototype';
import { htmlToJson } from '@/utils/HtmlToJson';
import RuleMatcher from '@/utils/RuleMatcher';
import Unsafe from '@/utils/Unsafe';
import { nanoid } from 'nanoid'
import { fnParser } from '@/utils/FnParser';

class ContentParse {

  constructor(rules) {
    this.ruleMatcher = new RuleMatcher(rules || []);
  }

  checkUrlRead(contentIds) {
    if (!contentIds) {
      return false;
    }
    return DataService.contentExistLocal(...contentIds)
  }

  async parse(contentUrl, append) {
    contentUrl = this.filterUrl(contentUrl);

    if (!contentUrl) {
      console.log('contentUrl is null');
      return;
    }
    console.log('parse contentUrl:' + contentUrl);

    let urlRule = this.ruleMatcher.match(contentUrl)
    if (!urlRule.rule) {
      return { unMatched: true };
    }

    if (this.checkUrlRead(urlRule.contentIds) && append) {
      return;
    }

    console.log('get parser for contentUrl:' + contentUrl);
    return this.sendRequest(contentUrl, urlRule);
  }

  queryContentIds(contentUrl) {
    contentUrl = this.filterUrl(contentUrl);

    if (!contentUrl) {
      console.log('contentUrl is null');
      return;
    }
    console.log('queryContentIds:' + contentUrl);

    let urlRule = this.ruleMatcher.match(contentUrl)
    if (!urlRule.rule) {
      return null;
    }
    return urlRule.contentIds;
  }

  async sendRequest(contentUrl, urlRule) {
    let rule = urlRule.rule;
    let params = rule.params;

    let isListUrl = rule.target === 'listing';
    let responseData;
    let { data, success, errMsg } = await HttpAdaptor.getHtml(contentUrl, params.encoding);
    if (success) {
      document.getElementsByTagName("base")[0].setAttribute('href', contentUrl);
      if (rule.dataRule === 'json') {
        responseData = JSON.parse(data).data;
      } else {
        responseData = htmlToJson(data, contentUrl, rule);
      }
      console.log('responseData', responseData.list.length, responseData);
    } else {
      let list = [{ "title": "Can't visit " + contentUrl + ", error:" + errMsg }];
      responseData = { list }
    }
    let list = this.convertByInterceptor(responseData.list)
    if (isListUrl) {
      let listingData = this.processListingData(list);
      let listingNext = this.convertUrl(responseData.next);
      return { listingData, listingNext, listFlag: true, autoDisplayList: !!params.autodisplay };
    } else {
      let contentData = this.processContentData(list, contentUrl, urlRule.contentIds);
      return { contentData }
    }
  }

  convertByInterceptor(list) {
    let fetchDataFromUrl = this.fetchDataFromUrl;
    return observable(list).map(item => {
      item.interceptor?.((idata) => { extend(item, idata) }, fetchDataFromUrl);
      return item;
    })
  }

  async fetchDataFromUrl(url, dataRule) {
    let htmlData = await HttpAdaptor.getHtml(url, 'utf-8');
    let responseData = htmlToJson(htmlData.data, url, { dataRule });
    return responseData;
  }

  processListingData(list) {
    list.forEach(item => {
      item.key = nanoid();
      if (item['postId']) {
        if (item['url']) {
          //hack
          item['url'] += '?postId=' + item['postId'];
        }
      }
    })
    return list;
  }

  processContentData(list, contentUrl, contentIds) {
    list.map(item => {
      item.key = nanoid();
      item.contentIds = contentIds;
      item.contentIdString = [...contentIds].reverse().join('-');
      item.contentUrl = contentUrl;
      item.downloaded = Unsafe.validateTitleIfExist(item.title);
      // item.extracFn?.((html) => { item.extraContent = html });
      return item;
    })
    return list;
  }

  filterUrl(contentUrl) {
    if (!contentUrl) {
      return null;
    }
    if (contentUrl.startsWith('javascript')) {
      return null;
    }
    if (contentUrl.includes('#')) {
      contentUrl = contentUrl.substr(0, contentUrl.indexOf('#'))
    }
    return contentUrl;
  }


  convertUrl(parsedUrl) {
    if (!parsedUrl) {
      return null;
    }
    if (!/^http/.test(parsedUrl)) {
      var a = document.createElement('a');
      a.setAttribute('href', parsedUrl);
      parsedUrl = a.href;
    }
    return parsedUrl;
  }

  async flatUrl(urls) {
    let theUrls = await Promise.all(urls.map(async (url) => {
      if (url.startsWith('@')) {
        let [fnDef, arg] = fnParser(url);
        return await fnDef(arg, this.fetchDataFromUrl);
      } else {
        return [url]
      }
    }));
    return theUrls.flatMap(x => x);
  }
}

export default ContentParse