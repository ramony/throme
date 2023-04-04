import HttpClient from '../utils/HttpClient';
import { Paths } from '../config/ThromeConfig';

const ConfigLoad = {
  async loadRules() {
    if (!this.rules) {
      let rules = [];
      for (let config of Paths.rules) {
        let fileRules = await HttpClient.getJSON(config);
        if (!fileRules.success) {
          console.log('Fail to load rule config');
          return;
        }
        rules.push(...fileRules.data);
      }
      this.rules = rules;
    }
    return this.rules;
  },
  async loadDownloads() {
    if (!this.downloads) {
      let config = await HttpClient.getJSON(Paths.download);
      if (!config.success) {
        console.log('Fail to load download config');
        return { list: [] };
      }
      this.downloads = config.data;
    }
    return this.downloads;
  },
  loadEntryPath() {
    return Paths.entry;
  },
  isDataProxy() {
    //If no chromeFlag is set, use http proxy.
    if (localStorage.getItem("chromeFlag")) {
      return false;
    }
    return true;
  }
}

export default ConfigLoad;