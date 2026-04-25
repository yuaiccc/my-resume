# 1. 搞一台装好了 Node.js 的迷你 Linux 电脑作为基础（加上了国内可用的镜像前缀）
FROM docker.1panel.live/library/node:20-alpine

# 2. 在这台迷你电脑里，建一个叫 /app 的文件夹，并进入
WORKDIR /app

# 3. 把你本机电脑上的“食材清单”抄写到迷你电脑里
COPY package.json package-lock.json* pnpm-lock.yaml* ./

# 4. 在迷你电脑里执行安装命令，买齐所有食材
RUN npm install

# 5. 把你本机写好的所有源代码，搬进 /app 文件夹里
COPY . .

# 6. 在迷你电脑里执行打包编译命令
RUN npm run build

# 7. 告诉迷你电脑的保安：放行 3000 号门
EXPOSE 3000

# 8. 迷你电脑开机后，自动执行这行命令来启动你的网站
CMD ["npm", "start"]