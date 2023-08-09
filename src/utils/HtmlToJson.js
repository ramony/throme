import { nextFunMap, findOnUrl } from '@/utils/NextFunMap';

function htmlToJson(html, url, rule) {
  let { dataRule, htmlReplace } = rule
  let dom = htmlToDom(html, url, htmlReplace);
  return domToJson(dom, url, dataRule)
}

function htmlToDom(html, url, htmlReplace) {
  html = trimHtmlTag(html);
  let dom = document.createElement('div');
  if (htmlReplace) {
    for (let it of htmlReplace) {
      html = html.replace(new RegExp(it[0], 'gi'), it[1]);
    }
  }
  dom.innerHTML = html;
  return dom;
}

function domToJson(dom, url, dataRule) {
  if (!dataRule || !dom) {
    return {};
  }
  let typeOfRule = Object.prototype.toString.call(dataRule);
  if (typeOfRule.includes('String')) {
    let data;
    if (dataRule.includes('%')) {
      let [, param] = dataRule.split('%');
      data = findOnUrl(url, param)
    } else {
      let [selector, fnName, attr] = splitRule(dataRule);
      let subDom = queryAll(selector, dom);
      if (fnName != null) {
        let funMap = { ...nextFunMap, ...window.funMap };
        let fun = funMap[fnName];
        if (fun) {
          subDom = fun(subDom);
        }
      }
      if (attr) {
        data = getData(subDom, attr);
      } else {
        data = subDom;
      }
    }
    return data;
  } else if (typeOfRule.includes('Array')) {
    let [selector, arrayRule, extracFn] = dataRule;
    let domList = queryAll(selector, dom)
    extracFn = window.funMap?.[extracFn.replace(/@/, '')]
    let data = [...domList].map((it) => {
      let itData = domToJson(it, url, arrayRule);
      if (extracFn) {
        itData.extracFn = (fn) => extracFn(itData).then(res => fn(res))
      }
      return itData;
    });
    return data;
  } else if (typeOfRule.includes('Object')) {
    let data = {};
    for (let key in dataRule) {
      data[key] = domToJson(dom, url, dataRule[key])
    }
    return data;
  }
}

function splitRule(rule) {
  let [selector, funName, attr] = [rule, null, null];
  if (selector.includes("/")) {
    [selector, attr] = selector.split("/");
  }
  if (selector.includes("@")) {
    [selector, funName] = selector.split("@");
  }
  if (funName == null && attr == null) {
    attr = "html";
  }
  return [selector, funName, attr];
}

function getData(dom, attr) {
  if (dom.length === 0) {
    return '';
  }
  let node = dom[0];
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

function queryAll(selector, dom) {
  if (!dom) {
    return [];
  }
  if (selector === '') {
    return [dom];
  }
  if (selector.includes(":first")) {
    let [prefix, suffix] = selector.split(":first");
    return queryAll(suffix, dom.querySelector(prefix));
  }
  if (selector.includes("!")) {
    let [selector2, hideTags] = selector.split("!");
    let result = queryAll(selector2, dom);
    result.forEach(it => it.querySelectorAll(hideTags).forEach(item => {
      item.outerHTML = ''
    }))
    return result;
  }
  if (selector.includes('$')) {
    return [dom];
  }
  return dom.querySelectorAll(selector);;
}

function trimHtmlTag(html) {
  html = html.replace(/<meta[^>]+>/ig, '');
  html = html.replace(/<link[^>]+>/ig, '');
  html = html.replace(/<base[^>]+>/ig, '');
  html = html.replace(/<style[^>]*>[\d\D]+?<\/style>/ig, '');
  html = html.replace(/<script[^>]*>[\d\D]*?<\/script>/ig, '');
  html = html.replace(/<iframe[^>]*>[\d\D]*?<\/iframe>/ig, '');
  html = html.replace(/<!--[\d\D]*?-->/g, '');

  return html;
}



export { htmlToJson }


