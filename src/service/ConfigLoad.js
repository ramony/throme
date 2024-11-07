import HttpClient from '@/utils/HttpClient';
import { DataPaths } from '@/config/DataConfig';

const loadFile = async (config) => {
  return config.includes("yaml") ?
    HttpClient.getYaml(config) : HttpClient.getJSON(config);
}

const ConfigLoad = {
  async loadRules() {
    if (!this.rules) {
      let rules = [];
      for (let config of DataPaths.rules) {
        let fileRules;
        fileRules = await loadFile(config);
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
      let config = await loadFile(config);
      if (!config.success) {
        console.log('Fail to load download config');
        return { list: [] };
      }
      this.downloads = config.data;
    }
    return this.downloads;
  },
  loadEntryPath() {
    return DataPaths.entry;
  }
}

export default ConfigLoad;