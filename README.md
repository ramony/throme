npm install @mui/material @emotion/react @emotion/styled npm install @mui/icons-material @mui/material @emotion/styled @emotion/react npm install mobx mobx-react npm i nanoid


docker-compose -f docker-compose-mysql.yml up -d

docker-compose up -d

npm install --save sequelize


1. 使用已存在的镜像（拉取远程镜像）
如果 docker-compose.yml 中直接指定了远程镜像（如 image: nginx:alpine），docker-compose up -d 会：

首次运行：从 Docker Hub 或指定的镜像仓库拉取镜像。
非首次运行：若本地已有该镜像，不会重新拉取，除非你显式指定 --pull 参数：
bash
docker-compose up -d --pull=always  # 强制拉取最新镜像


2. 使用本地构建的镜像（通过 build 字段）
如果 docker-compose.yml 中使用 build 字段指定了 Dockerfile 路径：

yaml
services:
  app:
    build: .  # 或 build: ./path/to/Dockerfile
    image: my-custom-app  # 可选：指定镜像名称


docker-compose up -d 会：

首次运行：根据 Dockerfile 构建镜像。
非首次运行：
默认行为：不会重新构建镜像，即使 Dockerfile 已修改。
强制重建：使用 --build 参数：
bash
docker-compose up -d --build  # 强制重新构建镜像