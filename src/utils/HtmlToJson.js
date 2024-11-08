import { nextFunMap, findOnUrl } from '@/utils/NextFunMap';
import { fnParser } from '@/utils/FnParser';
import { getType } from '@/utils/Prototype';
import * as cheerio from 'cheerio';


function htmlToJson(html, url, rule) {
  let { dataRule, htmlReplace } = rule
  html = htmlConvert(html, url, htmlReplace);
  const $ = cheerio.load(html);
  const data = parseRule(url, $, dataRule);
  return data;
}

function setNewTarget(dom) {
  if (dom) {
    dom.querySelectorAll("a").forEach(item => {
      item.target = '_blank';
    })
  }
}

function htmlConvert(html, url, htmlReplace) {
  html = trimHtmlTag(html);
  let dom = document.createElement('div');
  if (htmlReplace) {
    for (let it of htmlReplace) {
      html = html.replace(new RegExp(it.source, 'gi'), it.target);
    }
  }
  dom.innerHTML = html;
  setNewTarget(dom);
  return dom.innerHTML;
}

function parseRule(baseUrl, $, rule, context) {
  if (typeof rule === 'string') {
    // 处理简单的选择器字符串
    let [selector, attr] = splitRule(rule);
    let it = $(selector, context);
    if (attr) {
      return getData(it, attr, baseUrl);
    }
    return it.text().trim();
  } else if (rule.selector) {
    // 处理列表，每个子元素递归解析
    const result = [];
    $(rule.selector, context).each((i, elem) => {
      if (rule.children) {
        // 有嵌套规则，递归解析
        const item = {};
        for (const [key, childRule] of Object.entries(rule.children)) {
          item[key] = parseRule(baseUrl, $, childRule, elem);
        }
        result.push(item);
      } else {
        // 没有嵌套规则，直接获取文本
        result.push($(elem).text().trim());
      }
    });
    return result;
  } else if (rule.children) {
    // 处理单个元素的嵌套规则
    const result = {};
    for (const [key, childRule] of Object.entries(rule.children)) {
      result[key] = parseRule(baseUrl, $, childRule, context);
    }
    return result;
  } else {
    const result = {};
    for (const [key, childRule] of Object.entries(rule)) {
      result[key] = parseRule(baseUrl, $, childRule, context);
    }
    return result;
  }
}

function splitRule(rule) {
  let [selector, attr] = [rule, null, null];
  if (selector.includes("/")) {
    [selector, attr] = selector.split("/");
  }
  return [selector, attr];
}

function getData(node, attr, baseUrl) {
  let data = "";
  if (attr === 'text') {
    data = node.text();
  } else if (attr === 'html') {
    data = node.html();
  } else if (attr === 'fullhref') {
    data = new URL(node.attr('href'), baseUrl).href
  } else {
    data = node.attr(attr);
  }
  return data;
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


