
const CreateSuccess = (data) => ({ success: true, data: data });
const CreateFail = (errMsg) => ({ success: false, errMsg: errMsg });

const getJSON = async (endpoint) => {
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
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const type = request.type
  if (type == 'loadConfig') {
    sendResponse((async () => {
      let data = await getJSON("configData/ruleConfig.json")
      console.log(JSON.stringify(data))
      //sendResponse(data);
      //sendResponse('inner data');
      return data;
    }));
  }
})