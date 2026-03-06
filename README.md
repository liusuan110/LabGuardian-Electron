# LabGuardian Electron

基于 [electron-vite-vue](https://github.com/electron-vite/electron-vite-vue) 模板，复用 `teacher/frontend` Vue 3 教师端页面。

## 项目结构

```
LabGuardian-Electron/
├── electron/
│   ├── main/index.ts        ← Electron 主进程 (窗口管理)
│   └── preload/index.ts     ← preload (暴露 serverUrl 给 renderer)
├── src/                     ← renderer = teacher/frontend 原样迁入
│   ├── main.js
│   ├── App.vue
│   ├── api/index.js          ← 唯一改动: baseURL → LabGuardian-Server
│   ├── router/index.js
│   ├── stores/classroom.js
│   ├── styles/main.css       ← PyDracula 暗色主题
│   ├── views/                ← 4 个页面 (原样)
│   └── components/           ← 5 个组件 (原样)
├── electron.vite.config.ts
├── package.json
└── index.html
```

## 与 LabGuardian-Server 对接

renderer 层通过 `src/api/index.js` 接入后端：

| 原始路径                | 新路径 (LabGuardian-Server)           |
|------------------------|--------------------------------------|
| `GET  /api/classroom`  | `GET  /api/v1/classroom/stations`    |
| `GET  /api/classroom/ranking` | `GET  /api/v1/classroom/ranking` |
| `GET  /api/classroom/alerts`  | `GET  /api/v1/classroom/alerts`  |
| `GET  /api/classroom/stats`   | `GET  /api/v1/classroom/stats`   |
| `POST /api/heartbeat`         | `POST /api/v1/classroom/heartbeat` |
| `WS   /ws/station/{id}`       | `WS   /ws/station/{id}`           |

## 快速启动

```bash
# 安装依赖
npm install

# 开发模式 (须先启动 LabGuardian-Server)
npm run dev

# 打包
npm run build:mac   # macOS
npm run build:win   # Windows
npm run build:linux # Linux
```

## 环境变量

通过 Electron 主进程传递给 renderer：

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `LABGUARDIAN_SERVER_URL` | `http://localhost:8000` | 后端服务器地址 |
