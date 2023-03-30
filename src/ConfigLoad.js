import HttpClient from './HttpClient';

const ConfigLoad = {
    async loadRules() {
        if (!this.rules) {
            let rules = [];
            for (let config of ["ruleConfig"]) {
                let fileRules = await HttpClient.getJSON(`${config}.json`);
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
            let config = await HttpClient.getJSON('downloadConfig.json');
            if (!config.success) {
                console.log('Fail to load download config');
                return { list: [] };
            }
            this.downloads = config.data;
        }
        return this.downloads;
    }
}

export default ConfigLoad;