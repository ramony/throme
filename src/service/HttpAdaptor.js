import HttpClient from '@/utils/HttpClient';

const needHttpProxy = (endpoint) => {
  let extensionFlag = window.location.href.indexOf("chrome-extension://") !== -1
  return !extensionFlag && endpoint.includes("http");
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