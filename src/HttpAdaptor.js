import HttpClient from './HttpClient';

const UseProxy = true;

class HttpAdaptor {

  static async getHtml(endpoint, encoding) {
    if (UseProxy && endpoint.includes("http")) {
      endpoint = "http://localhost:8888/302?url=" + endpoint;
    }
    return HttpClient.getHtml(endpoint, encoding);
  }

}

export default HttpAdaptor