import NextFunMap from './NextFunMap';


class Html2Json {

	htmlToJson(html, dataRule, removeImg) {
		var dom = this.htmlToDom(html, removeImg);
		return this.domToJson(dom, dataRule)
	}

	htmlToDom(html, removeImg) {
		html = this.trimHtmlTag(html, removeImg);
		let dom = document.createElement('div');
		dom.innerHTML = html;
		return dom;
	}

	domToJson(dom, dataRule) {
		if(!dataRule || !dom) {
			return {};
		}
		var typeOfRule = Object.prototype.toString.call(dataRule);
		var data;
		if(typeOfRule.includes('String')) {
			if(dataRule.includes('@')) {
				let [selector, func] = dataRule.split('@');
				data = NextFunMap[func](this.$s(selector,dom))
			} else if(dataRule.includes('/')) {
				let [selector, attr] = dataRule.split('/');
				let subDom = this.$s(selector, dom);
				data = this.getData(subDom, attr)
			} else {
				let selector = dataRule;
				let subDom = this.$s(selector, dom);
				return this.getData(subDom, 'html');
			}
			return data;
		} else if(typeOfRule.includes('Array')) {
			let [selector, arrayRule] = dataRule;
			let doms = this.$(selector, dom)
			let data =  [...doms].map((it)=> this.domToJson(it, arrayRule));
			return data;
		} else if(typeOfRule.includes('Object')) {
			var data = {};
			for(var key in dataRule) {
				data[key] = this.domToJson(dom, dataRule[key])
			}
			return data;
		}
	}

	getData(dom, attr) {
		if(!dom) {
			return '';
		}
		let node;
		if(Object.prototype.toString.call(dom).includes('NodeList')) {
			let [firstNode] =[...dom];
			if(firstNode == undefined) {
				return '';
			}
			node = firstNode
		} else {
			node = dom;
		}
		
		let data;
		if(attr == 'text') {
			data = node.innerText;
		} else if(attr == 'html') {
			data = node.innerHTML;
		} else if(attr == 'href') {
			data = node.href;
		} else {
			data = node.getAttribute(attr);
		}
		return data;
	}

	$s(selector, dom) {
		if(selector == '' || selector == '$') {
			return dom;
		}
		return this.$(selector, dom)
	}

	$(a, b) {
		let result ;
		if(b){
			result = b.querySelectorAll(a);
		} else {
			console.log('$:' + a )
			result = document.querySelectorAll(a);
		}
		return result;
	}

	trimHtmlTag(html, removeImg) {
		html = html.replace(/<meta[^>]+>/ig,'');
		html = html.replace(/<link[^>]+>/ig,'');
		html = html.replace(/<base[^>]+>/ig,'');
		html = html.replace(/<style[^>]*>[\d\D]+?<\/style>/ig,'');
		html = html.replace(/<script[^>]*>[\d\D]*?<\/script>/ig,'');
		html = html.replace(/<iframe[^>]*>[\d\D]*?<\/iframe>/ig,'');
		html = html.replace(/<!--[\d\D]*?-->/g,'');
		if(removeImg) {
			html = html.replace(/<img[^>]+>/ig,'');
		}
		return html;
	}

}

export default new Html2Json()


