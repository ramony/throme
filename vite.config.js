import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
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
  },
  build: {
    target: 'esnext', // 根据需要设置目标浏览器版本
    minify: false // 禁用代码压缩
  }

})
