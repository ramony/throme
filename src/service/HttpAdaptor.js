import getHtml from '@/utils/ServerHttpClient';
import HttpClient from '@/utils/HttpClient';


const HttpAdaptor = {

  async getHtml(url, encoding) {
    let aUrl = url
    if (!url.startsWith("http")) {
      aUrl = "http://localhost:3000/" + url;
      return await HttpClient.getHtml(aUrl, encoding);
    }
    let result = await getHtml(encoding, aUrl);
    return result;
  }

}

export default HttpAdaptor;