import HttpAdaptor from './HttpAdaptor';
import DataService from './DataService';

import Html2Json from '../utils/Html2Json';
import RuleMatcher from '../utils/RuleMatcher';

class ContentParse {

  constructor(rules) {
    this.ruleMatcher = new RuleMatcher(rules||[]);
  }

  checkUrlRead(contentIds) {
    if(!contentIds) {
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
      return {unMatched:true};
    }

    if (this.checkUrlRead(urlRule.contentIds) && append) {
      return;
    }

    console.log('get parser for contentUrl:' + contentUrl);
    return this.sendRequest(contentUrl, urlRule);
  }

  async sendRequest(contentUrl, urlRule) {
    let rule = urlRule.rule;
    let params = rule.params;

    let htmlData = await HttpAdaptor.getHtml(contentUrl, params.encoding);
    let html = htmlData.data;

    let dataRule = rule.dataRule;
    let responseData;
    if (dataRule === 'json') {
      responseData = JSON.parse(html);
    } else {
      responseData = Html2Json.htmlToJson(html, contentUrl, rule);
    }
    //console.log('responseData : ' + JSON.stringify(responseData));

    if (rule.target === 'listing') {
      let listingData = this.processListingData(responseData.list);
      let listingNext = responseData.next
      return { listingData, listingNext, listFlag: true, autoDisplayList: !!params.autodisplay};
    } else {
      let contentData = this.processContentData(responseData.list, contentUrl, urlRule.contentIds);
      return { contentData }
    }
  }

  processListingData(list) {
    list.forEach(it => {
      if (it['postId']) {
        if (it['url']) {
          //hack
          it['url'] += '?postId=' + it['postId'];
        }
      }
    })
    return list;
  }

  processContentData(list, contentUrl, contentIds) {
    list.forEach(it => {
      it.contentIds = contentIds;
      it.contentIdString = contentIds.reverse().join('-');
      it.contentUrl = contentUrl;
      if(it.title) {
        //let keyword = window.GetVideoKeyword?(it.title)
        try{
          it.downloaded = window.ValidateTitleIfExist(it.title);
        } catch(e){

        }
      }
    })
    return list;
  }

  filterUrl(contentUrl) {
    if (!contentUrl) {
      return null;
    }
    if (contentUrl.indexOf('javascript') === 0) {
      return null;
    }
    if (contentUrl.indexOf('#') !== -1) {
      contentUrl = contentUrl.substr(0, contentUrl.indexOf('#'))
    }
    return contentUrl;
  }

}

export default ContentParse