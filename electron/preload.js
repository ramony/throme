const fs = require('node:fs');

const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('fileAPI', {
    readFile: (filename) => {
        let data = fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });
        return data;
    }
})