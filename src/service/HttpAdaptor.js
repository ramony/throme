import HttpClient from '../utils/HttpClient';
import ConfigLoad from '../service/ConfigLoad';

const HttpAdaptor = {

  async getHtml(endpoint, encoding) {
    if (ConfigLoad.isDataProxy() && endpoint.includes("http")) {
      endpoint = "http://localhost:8888/302?url=" + encodeURIComponent(endpoint);
    }
    return HttpClient.getHtml(endpoint, encoding);
  }

}

export default HttpAdaptor