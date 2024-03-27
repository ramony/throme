import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";

import electron from 'vite-electron-plugin'
import renderer from 'vite-plugin-electron-renderer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron({
      include: ['electron'],
      main: {
        entry: 'electron/index.js', // 此处指向electron主进程文件
      },
    }),
    // 渲染进程可使用node.js API
    renderer({
      nodeIntegration: true,
    })
  ],
  resolve: {
    alias: [{
      find: "@",
      replacement: resolve(__dirname, 'src')
    }, {
      find: "components",
      replacement: resolve(__dirname, 'src/components')
    }, {
      find: "views",
      replacement: resolve(__dirname, 'src/views')
    }]
  },
  server: {
    hmr: {
      overlay: true
    }
  }

})
