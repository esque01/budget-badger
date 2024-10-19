import { app, BrowserWindow } from "electron";
import path from "path";

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
        }
    });

    mainWindow.loadURL("http://localhost:3000");
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length == 0) createWindow();
});