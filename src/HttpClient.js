class HttpClient {

	createSuccess(data) {
		return {success : true, data: data};
	}

	createFail(errMsg) {
		return {success: false, errMsg: errMsg};
	}


	async getHtml(endpoint, encoding) {
		var params = {
			headers:{'content-type': "text/html;charset=" + encoding}
		}
		try {
			const res = await fetch(endpoint, params);
			const buffer =  await res.arrayBuffer();
			const html =  new TextDecoder(encoding).decode(buffer);
			return this.createSuccess(html);
		} catch (e) {
			console.log(endpoint + " getHtml error, " + e)
			return this.createFail(e);
		}
	}


	async getJSON(endpoint) {
		try {
			const res = await fetch(endpoint, {
				method : 'get', 
				headers: {
		      		'Content-Type': 'application/json'
				}
			});
			return await res.json();
		} catch (e) {
			console.log(endpoint + " getJSON error, " + e)
			return this.createFail(e);
		}
	}


	async postJSON(endpoint, requestBody) {
		try {
			const res = await fetch(endpoint, {
				method : 'post', 
				headers: {
		      		'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestBody)
			})
			return await res.json();
		} catch (e) {
			console.log(endpoint + " getJSON error, " + e)
			return this.createFail(e);
		}

	}

}

export default new HttpClient()