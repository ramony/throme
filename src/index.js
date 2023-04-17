import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Store } from '@/app/store'
import AppContext from '@/app/appContext'
import { buildClassMethods } from '@/utils/ClassUtils';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = new Store();
buildClassMethods(Store.prototype, store);

root.render(
  <React.StrictMode>
    <AppContext.Provider value={store}>
      <App />
    </AppContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
