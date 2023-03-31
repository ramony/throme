import HttpClient from '../utils/HttpClient';

const UseProxy = true;

const HttpAdaptor = {

  async getHtml(endpoint, encoding) {
    if (UseProxy && endpoint.includes("http")) {
      endpoint = "http://localhost:8888/302?url=" + encodeURIComponent(endpoint);
    }
    return HttpClient.getHtml(endpoint, encoding);
  }

}

export default HttpAdaptor