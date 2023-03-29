import RuleMatcher from './RuleMatcher';
import HttpAdaptor from './HttpAdaptor';
import Html2Json from './Html2Json';
import DataService from './DataService';

class ContentParse {

  constructor(rules) {
    this.ruleMatcher = new RuleMatcher(rules);
  }

  checkUrlRead(contentId) {
    if(!contentId) {
      return false;
    }
    return DataService.contentExistLocal(...contentId)
  }

  async parse(contentUrl) {
    contentUrl = this.filterUrl(contentUrl);

    if (!contentUrl) {
      console.log('contentUrl is null');
      return;
    }
    console.log('parse contentUrl:' + contentUrl);

    let urlRule = this.ruleMatcher.match(contentUrl)
    if (!urlRule.rule) {
      window.open(contentUrl, '_blank');
      return;
    }

    if (this.checkUrlRead(urlRule.contentId)) {
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

    document.getElementById("nowUrl").setAttribute('href', contentUrl);

    let dataRule = rule.dataRule;
    let responseData;
    if (dataRule === 'json') {
      responseData = JSON.parse(html).data;
    } else {
      responseData = Html2Json.htmlToJson(html, dataRule);
    }
    //console.log('responseData : ' + JSON.stringify(responseData));

    if (rule.target === 'listing') {
      let listingData = this.processListingData(responseData.list);
      let listingNext = responseData.next
      return { listingData, listingNext, listFlag: true, autoDisplayList: !!params.autodisplay};
    } else {
      let contentData = this.processContentData(responseData.list, contentUrl, urlRule.contentId);
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

  processContentData(list, contentUrl, contentId) {
    list.forEach(it => {
      it.contentId = contentId;
      it.contentIdString = contentId.reverse().join('-');
      it.contentUrl = contentUrl;
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