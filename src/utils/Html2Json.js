import NextFunMap from './NextFunMap';

class Html2Json {

  static htmlToJson(html, url, rule) {
    let {dataRule, htmlReplace} = rule
    let dom = this.htmlToDom(html, url, htmlReplace);
    return this.domToJson(dom, url, dataRule)
  }

  static htmlToDom(html, url, htmlReplace) {
    html = this.trimHtmlTag(html, null);
    let dom = document.createElement('div');
    document.getElementsByTagName("base")[0].setAttribute('href', url);
    if(htmlReplace) {
        for(let it of htmlReplace) {
            html = html.replaceAll(it[0], it[1]);
        }
    }
    dom.innerHTML = html;
    return dom;
  }

  static domToJson(dom, url, dataRule) {
    if (!dataRule || !dom) {
      return {};
    }
    let typeOfRule = Object.prototype.toString.call(dataRule);
    if (typeOfRule.includes('String')) {
      let data;
      if (dataRule.includes('@')) {
        let [selector, func] = dataRule.split('@');
        data = NextFunMap[func](this.queryAll(selector, dom))
      } else if (dataRule.includes('#')) {
        let param = dataRule.substring(1);
        // pageNo=4 => pageNo=5
        let nextUrl = url.replace(new RegExp(`(${param}=)([0-9]+)`), (_, a, b) => a + (parseInt(b) + 1));
        if (nextUrl !== url) {
          data = nextUrl;
        }
      } else if (dataRule.includes('/')) {
        let [selector, attr] = dataRule.split('/');
        let subDom = this.queryAll(selector, dom);
        data = this.getData(subDom, attr)
      } else {
        let selector = dataRule;
        let subDom = this.queryAll(selector, dom);
        data = this.getData(subDom, 'html');
      }
      return data;
    } else if (typeOfRule.includes('Array')) {
      let [selector, arrayRule] = dataRule;
      let domList = this.queryAll(selector, dom)
      let data = [...domList].map((it) => this.domToJson(it, url, arrayRule));
      return data;
    } else if (typeOfRule.includes('Object')) {
      let data = {};
      for (let key in dataRule) {
        data[key] = this.domToJson(dom, url, dataRule[key])
      }
      return data;
    }
  }

  static getData(dom, attr) {
    if (!dom) {
      return '';
    }
    let node;
    if (dom.length != undefined) {
      if (dom.length == 0) {
        return '';
      }
      node = dom[0];
    } else {
      node = dom;
    }

    let data;
    if (attr === 'text') {
      data = node.innerText;
    } else if (attr === 'html') {
      data = node.innerHTML;
    } else if (attr === 'href') {
      data = node.href;
    } else {
      data = node.getAttribute(attr);
    }
    return data;
  }

  static queryAll(selector, dom) {
    if (!dom || selector === '' || selector === '$') {
      return dom;
    }
    if(selector.includes(":first")) {
        let [prefix, suffix] = selector.split(":first");
        return this.queryAll(suffix, dom.querySelector(prefix));
    }
    return dom.querySelectorAll(selector);
  }

  static trimHtmlTag(html, removeImg) {
    html = html.replace(/<meta[^>]+>/ig, '');
    html = html.replace(/<link[^>]+>/ig, '');
    html = html.replace(/<base[^>]+>/ig, '');
    html = html.replace(/<style[^>]*>[\d\D]+?<\/style>/ig, '');
    html = html.replace(/<script[^>]*>[\d\D]*?<\/script>/ig, '');
    html = html.replace(/<iframe[^>]*>[\d\D]*?<\/iframe>/ig, '');
    html = html.replace(/<!--[\d\D]*?-->/g, '');
    if (removeImg) {
      html = html.replace(/<img[^>]+>/ig, '');
    }
    return html;
  }

}

export default Html2Json


