
const CreateSuccess = (data) => ({ success: true, data: data });
const CreateFail = (errorMsg) => ({ success: false, errorCode: '999', errorMsg: errorMsg });
const CreateJson = (jsonData) => {
  console.log('jsonData.success', jsonData.success)
  if (jsonData.success == undefined) {
    return { success: true, data: jsonData };
  }
  return jsonData;
};

const DEFAULT_API_TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9...."

const GetJwtToken = () => {
  let apiToken = localStorage.getItem('apiToken');
  if (apiToken && apiToken.indexOf('Bearer') == -1) {
    apiToken = "Bearer " + apiToken;
  }
  return apiToken || DEFAULT_API_TOKEN;
}

const HttpClient = {

  async getHtml(endpoint, encoding) {
    let params = {
      headers: {
        'content-type': "text/html;charset=" + encoding,
        'Authorization': GetJwtToken()
      }
    }
    try {
      const res = await fetch(endpoint, params);
      const buffer = await res.arrayBuffer();
      const html = new TextDecoder(encoding).decode(buffer);
      return CreateSuccess(html);
    } catch (e) {
      console.log(endpoint + " getHtml error, " + e)
      return CreateFail(e);
    }
  },

  async getJSON(endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': GetJwtToken()
        }
      });
      const data = await res.json();
      return CreateJson(data);
    } catch (e) {
      console.log(endpoint + " getJSON error, " + e)
      return CreateFail(e);
    }
  },

  async postJSON(endpoint, rdata) {
    try {
      const res = await fetch(endpoint, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': GetJwtToken()
        },
        body: JSON.stringify(rdata || {})
      })
      const data = await res.json();
      return CreateJson(data);
    } catch (e) {
      console.log(endpoint + " getJSON error, " + e)
      return CreateFail(e);
    }
  }

}

export default HttpClient