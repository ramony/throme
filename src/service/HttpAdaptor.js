import HttpClient from '@/utils/HttpClient';

const needHttpProxy = (endpoint) => {
  let { href } = window.location;
  return !href.includes("chrome-extension://") && endpoint.includes("http");
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