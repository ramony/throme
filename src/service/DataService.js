import { createDetailApi, queryApi, markReadByDetailIdApi, markReadLaterByDetailIdApi } from '@/api/DetailRespository';
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

const CreateJson = (jsonData) => {
  console.log('jsonData.success', jsonData.success)
  if (jsonData.success == undefined) {
    return { success: true, data: jsonData };
  }
  return jsonData;
};

const DetailKeyFun = (detailId, detailType) => (detailType + '-' + detailId);

const DataService = {

  checkLocalMarked(detailId, detailType) {
    return LocalCache.exist(DetailKeyFun(detailId, detailType));
  },

  setLocalMarked(detailId, detailType) {
    LocalCache.marked(DetailKeyFun(detailId, detailType));
  },

  async markReadByDetailId(detailId, detailType) {
    return await markReadByDetailIdApi(detailType, detailId);
  },

  async markReadLater(detailId, detailType, score) {
    return await markReadLaterByDetailIdApi(detailType, detailId);
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
    var result = await createDetailApi(rdata);
    console.log('result', result)
    if (result.success) {
      callback(result.data);
      return result.data;
    } else {
      errorCallback(result.errorMsg);
      return 0;
    }
  },


  async queryDetail(query) {
    let queryResult = await queryApi(query);
    return CreateJson(queryResult);
  }

}

export default DataService

