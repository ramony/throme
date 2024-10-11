import HttpClient from '@/utils/HttpClient';
import ApiHost from '@/utils/ApiHost';

const LocalCache = {
  marked(key) {
    if (key) {
      localStorage.setItem(key, 1)
    }
  },
  exist(key) {
    if (key) {
      return !!localStorage.getItem(key)
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
    return await HttpClient.postJSON(ApiHost.GetAPIHost() + '/detail/markReadByDetailId', { detailId, detailType });
  },

  async markScore(detailId, detailType, score) {
    LocalCache.marked(DetailKeyFun(detailId, detailType));
    return await HttpClient.postJSON(ApiHost.GetAPIHost() + '/detail/markScore', { detailId, detailType, score });
  },

  async markAllReadWithSameKeyword(callback) {
    var result = await HttpClient.postJSON(ApiHost.GetAPIHost() + '/detail/markAllReadWithSameKeyword', {});
    if (result.success) {
      callback(result.data);
    }
  },

  async checkKeywordRead(keyword, callback) {
    var result = await HttpClient.getJSON(ApiHost.GetAPIHost() + '/detail/checkKeywordRead/' + keyword);
    if (result.success) {
      callback(result.data);
    }
  },

  async createDetail(rdata, callback, errorCallback) {
    var result = await HttpClient.postJSON(ApiHost.GetAPIHost() + '/detail/createDetail', rdata);
    if (result.success) {
      callback(result.data);
      return result.data.data;
    } else {
      errorCallback(result.errMsg);
      return 0;
    }
  },

  async createList(rdata) {
    return await HttpClient.postJSON(ApiHost.GetAPIHost() + '/listing/createList', rdata);
  },

  async listingExist(url) {
    return await HttpClient.getJSON(ApiHost.GetAPIHost() + '/listing/exist?pageUrl=' + url);
  }

}

export default DataService

