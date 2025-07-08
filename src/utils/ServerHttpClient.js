"use server"

const CreateSuccess = (data) => ({ success: true, data: data });
const CreateFail = (errorMsg) => ({ success: false, errorCode: '999', errorMsg: errorMsg });


export default async function (encoding, endpoint) {
  let params = {
    headers: {
      'content-type': "text/html;charset=" + encoding
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
}
