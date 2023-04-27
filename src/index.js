/*global chrome*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ContentParse from '@/service/ContentParse';

chrome.runtime.sendMessage({
  type: 'loadConfig'
}, rules => {
  let embedRules = rules;
  let contentParse = new ContentParse(rules)
  let { href } = window.location;
  if (!href.includes("chrome-extension") && !href.includes("localhost")) {
    if (!contentParse.match(href)) {
      console.log('not matched')
      return;
    }
  }
  let rootEle = document.getElementById('root');
  if (!rootEle) {
    rootEle = document.getElementsByTagName('body')[0];
  }
  console.log('matched', rootEle)
  const root = ReactDOM.createRoot(rootEle);
  root.render(
    <App embedRules={embedRules} />
  );

})




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
