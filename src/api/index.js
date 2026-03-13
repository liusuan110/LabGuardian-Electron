/**
 * API 客户端 — 对接 LabGuardian-Server (FastAPI)
 *
 * 改动点 (相对 teacher/frontend 原版):
 *   - baseURL: /api  →  http://localhost:8000/api/v1
 *   - 路径:   /classroom  →  /classroom/stations
 *   - 通过 preload 暴露的 electronAPI.serverUrl 动态获取后端地址
 */

import axios from 'axios'

// Electron preload 注入的服务端地址；在浏览器 dev 模式下 fallback
const serverUrl =
  (typeof window !== 'undefined' && window.electronAPI?.serverUrl) ||
  'http://localhost:8000'

const api = axios.create({
  baseURL: `${serverUrl}/api/v1`,
  timeout: 5000,
})

export default {
  // ---- 教师端查询 ----
  getClassroom: () => api.get('/classroom/stations'),
  getRanking: () => api.get('/classroom/ranking'),
  getAlerts: () => api.get('/classroom/alerts'),
  getStats: () => api.get('/classroom/stats'),
  getStation: (id) => api.get(`/classroom/station/${id}`),
  getThumbnail: (id) => api.get(`/classroom/station/${id}/thumbnail`),

  // ---- 教师指导 ----
  sendGuidance: (stationId, type, message, sender = 'Teacher') =>
    api.post(`/classroom/station/${stationId}/guidance`, {
      station_id: stationId,
      type,
      message,
      sender,
    }),
  broadcast: (message, sender = 'Teacher') =>
    api.post('/classroom/broadcast', { message, sender }),

  // ---- 参考电路 ----
  setReference: (data) => api.post('/classroom/reference', data),

  // ---- 会话管理 ----
  resetSession: () => api.post('/classroom/reset'),

  // ---- Pipeline (新增) ----
  runPipeline: (images_b64, station_id = 'teacher') =>
    api.post('/pipeline/run', { station_id, images_b64 }),
  submitPipeline: (images_b64, reference_path = null) =>
    api.post('/pipeline/submit', { images_b64, reference_path }),
  getPipelineStatus: (jobId) => api.get(`/pipeline/status/${jobId}`),

  // ---- 工具 ----
  getServerUrl: () => serverUrl,
}
