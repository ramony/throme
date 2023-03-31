import NextFunMap from './NextFunMap';

class Html2Json {

  static htmlToJson(html, url, dataRule, removeImg) {
    let dom = this.htmlToDom(html, url, removeImg);
    return this.domToJson(dom, url, dataRule)
  }

  static htmlToDom(html, url, removeImg) {
    html = this.trimHtmlTag(html, removeImg);
    let dom = document.createElement('div');
    document.getElementsByTagName("base")[0].setAttribute('href', url);
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
        data = NextFunMap[func](this.$s(selector, dom))
      } else if (dataRule.includes('#')) {
        let param = dataRule.substring(1);
        let nextUrl = url.replace(new RegExp(`(${param}=)([0-9]+)`), (_, a, b) => a + (parseInt(b) + 1));
        if (nextUrl !== url) {
          data = nextUrl;
        }
      } else if (dataRule.includes('/')) {
        let [selector, attr] = dataRule.split('/');
        let subDom = this.$s(selector, dom);
        data = this.getData(subDom, attr)
      } else {
        let selector = dataRule;
        let subDom = this.$s(selector, dom);
        data = this.getData(subDom, 'html');
      }
      return data;
    } else if (typeOfRule.includes('Array')) {
      let [selector, arrayRule] = dataRule;
      let doms = this.$(selector, dom)
      let data = [...doms].map((it) => this.domToJson(it, url, arrayRule));
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
    if (Object.prototype.toString.call(dom).includes('NodeList')) {
      let [firstNode] = [...dom];
      if (firstNode === undefined) {
        return '';
      }
      node = firstNode
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

  static $s(selector, dom) {
    if (selector === '' || selector === '$') {
      return dom;
    }
    return this.$(selector, dom)
  }

  static $(a, b) {
    let result;
    if (b) {
      result = b.querySelectorAll(a);
    } else {
      console.log('$:' + a)
      result = document.querySelectorAll(a);
    }
    return result;
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


