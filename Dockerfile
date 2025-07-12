# 使用 Node.js 运行时镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制项目的 package.json 和 package-lock.json（或 yarn.lock）
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制整个项目代码到容器中
COPY . .

# 构建 Next.js 项目
RUN npm run build

# 暴露 Next.js 应用默认的端口（通常是 3000）
EXPOSE 3000

# 定义容器启动时运行的命令
CMD ["npm", "start"]