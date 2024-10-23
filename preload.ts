import { contextBridge, ipcRenderer } from "electron";
import { LoginFormValues, LoginResponse } from "./src/pages/Login/Login";


contextBridge.exposeInMainWorld('electron', {
    login: (data: LoginFormValues) => ipcRenderer.send('login', data),
    onLoginResponse: (callback: (response: LoginResponse) => void) => ipcRenderer.on('login-response', (event, response) => callback(response))
});