import HttpClient from '@/utils/HttpClient';

const needHttpProxy = (endpoint) => {
  return endpoint.includes("localhost");
}

const HttpAdaptor = {

  async getHtml(endpoint, encoding) {
    if (needHttpProxy(endpoint)) {
      endpoint = "http://localhost:8888/302?url=" + encodeURIComponent(endpoint);
    }
    return HttpClient.getHtml(endpoint, encoding);
  }

}

export default HttpAdaptor;