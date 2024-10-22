import { contextBridge, ipcRenderer } from "electron";


contextBridge.exposeInMainWorld('electron', {
    setTitle: (title: string) => ipcRenderer.send('set-title', title)
});