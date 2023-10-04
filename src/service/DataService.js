import HttpClient from '@/utils/HttpClient';

const API_HOST = 'http://localhost:30080/api/v1/';

const LocalCache = {
  marked(key) {
    if (key) {
      sessionStorage.setItem(key, 1)
    }
  },
  exist(key) {
    if (key) {
      return !!sessionStorage.getItem(key)
    }
    return false
  }
}

const DetailKeyFun = (detailId, detailType) => (detailType + '-' + detailId);

const DataService = {

  checkLocalMarked(detailId, detailType) {
    return LocalCache.exist(DetailKeyFun(detailId, detailType));
  },

  setLocalMarked(detailId, detailType) {
    LocalCache.marked(DetailKeyFun(detailId, detailType));
  },

  async markReadByDetailId(detailId, detailType) {
    console.log('markReadByDetailId', detailId, detailType)
    LocalCache.marked(DetailKeyFun(detailId, detailType));
    return await HttpClient.postJSON(API_HOST + 'detail/markReadByDetailId', { detailId, detailType });
  },

  async markScore(detailId, detailType, score) {
    LocalCache.marked(DetailKeyFun(detailId, detailType));
    return await HttpClient.postJSON(API_HOST + 'detail/markScore', { detailId, detailType, score });
  },

  async markAllReadWithSameKeyword(callback) {
    var result = await HttpClient.postJSON(API_HOST + 'detail/markAllReadWithSameKeyword', {});
    if (result.success) {
      callback(result.data);
    }
  },

  async checkKeywordRead(keyword, callback) {
    var result = await HttpClient.getJSON(API_HOST + 'detail/checkKeywordRead/' + keyword);
    if (result.success) {
      callback(result.data);
    }
  },

  async createDetail(rdata, callback, errorCallback) {
    var result = await HttpClient.postJSON(API_HOST + 'detail/createDetail', rdata);
    if (result.success) {
      callback(result.data);
      return result.data.data;
    } else {
      errorCallback(result.errMsg);
      return 0;
    }
  },

  async createList(rdata) {
    return await HttpClient.postJSON(API_HOST + 'listing/createList', rdata);
  },

  async listingExist(url) {
    return await HttpClient.getJSON(API_HOST + 'listing/exist?pageUrl=' + url);
  }

}

export default DataService

