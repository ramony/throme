import HttpClient from '@/utils/HttpClient';
import { DataPaths } from '@/config/DataConfig';

const ConfigLoad = {
  async loadRules(path) {
    if (!this.rules) {
      let thePath = path || DataPaths.rules;
      let rules = [];
      for (let config of thePath) {
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
      let config = await HttpClient.getJSON(DataPaths.download);
      if (!config.success) {
        console.log('Fail to load download config');
        return { list: [] };
      }
      this.downloads = config.data;
    }
    return this.downloads;
  },
  loadEntryPath() {
    let { href } = window.location;
    if (!href.includes("chrome-extension") && !href.includes("localhost")) {
      return href;
    }
    return DataPaths.entry;
  }
}

export default ConfigLoad;