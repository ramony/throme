import HttpClient from '@/utils/HttpClient';

const loadFile = async (config) => {
  return config.includes("yaml") ?
    HttpClient.getYaml(config) : HttpClient.getJSON(config);
}

const ConfigLoad = {

  async loadAppConfig(key) {
    if (!this.config) {
      this.config = await loadFile("config.yaml");;
    }
    return this.config.data[key];
  },

  async loadRules() {
    if (!this.rules) {
      let rules = [];
      let ruleFilePaths = await this.loadAppConfig('rules');
      for (let config of ruleFilePaths) {
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
      let downloadConfigPath = await this.loadAppConfig('download')
      let config = await loadFile(downloadConfigPath);
      if (!config.success) {
        console.log('Fail to load download config');
        return { list: [] };
      }
      this.downloads = config.data;
    }
    return this.downloads;
  },
  async loadEntryPath() {
    return await this.loadAppConfig('entry');
  }
}

export default ConfigLoad;