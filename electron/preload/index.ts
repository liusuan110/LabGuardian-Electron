import { contextBridge } from 'electron'

const serverUrl = process.env.LABGUARDIAN_SERVER_URL || 'http://localhost:8000'

contextBridge.exposeInMainWorld('electronAPI', {
  serverUrl,
})
