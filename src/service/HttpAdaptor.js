import getHtml from '@/utils/ServerHttpClient';
import HttpClient from '@/utils/HttpClient';
import DataService from '@/service/DataService';

const HttpAdaptor = {

  async getHtml(url, encoding) {
    let aUrl = url
    let result;
    if (!url.startsWith("http")) {
      if (url.startsWith("query")) {
        let params = url.replace(/query\((.+)\)/, "$1").replace(/'/g, '"');
        let query = JSON.parse(params);
        result = await DataService.queryDetail(query);
      } else {
        aUrl = "/" + url;
        result = await HttpClient.getHtml(aUrl, encoding);
      }
    } else {
      result = await getHtml(encoding, aUrl);
    }
    return result;
  }

}

export default HttpAdaptor;