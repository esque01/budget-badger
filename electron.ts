import { app, BrowserWindow } from "electron";
import isDev from "electron-is-dev";
import path from "path";
import { fileURLToPath } from "url";

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

function createWindow() {

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirName, "preload.js"),
            contextIsolation: false,
            nodeIntegration: true,
        }
    });

    mainWindow.loadURL(
        isDev ? 
        `http://localhost:3000` :
        `file://${path.join(__dirName, `../build/index.html`)}`
    )
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length == 0) createWindow();
});