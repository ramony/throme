
const CreateSuccess = (data) => ({ success: true, data: data });
const CreateFail = (errMsg) => ({ success: false, errMsg: errMsg });

const HttpClient = {

  async getHtml(endpoint, encoding) {
    let params = {
      headers: { 'content-type': "text/html;charset=" + encoding }
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
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      return CreateSuccess(data);
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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rdata || {})
      })
      const data = await res.json();
      return CreateSuccess(data);
    } catch (e) {
      console.log(endpoint + " getJSON error, " + e)
      return CreateFail(e);
    }
  }

}

export default HttpClient