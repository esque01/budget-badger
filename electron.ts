import { app, BrowserWindow, ipcMain } from "electron";
import isDev from "electron-is-dev";
import path from "path";
import { fileURLToPath } from "url";
import * as dotenv from 'dotenv';
import sqlite3 from "sqlite3";


const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

dotenv.config();

if (!process.env.DB_NAME) {
    throw new Error("DB_NAME is not defined in the environment variables.");
}

const dbPath = path.join(app.getPath('userData'), process.env.DB_NAME);

const database = new sqlite3.Database(dbPath, (error: Error | null) => {
    if (error) {
        console.log('Error opening database');
    }
    else {
        console.log('Connected to the SQLite database.');
    }
});


function createWindow() {

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirName, "preload.js"),
            contextIsolation: false,
        }
    });

    mainWindow.loadURL(
        isDev ? 
        `http://localhost:3000` :
        `file://${path.join(__dirName, `../build/index.html`)}`
    );

    mainWindow.on('closed', () => {
        database.close((error: Error | null) => {
            if (error) {
                console.log("Error closing SQLite database:  " + error.message);
            }
            else {
                console.log('Disconnected from SQLite database.');
            }
        })
    });
}

ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);

    if (win) {
        win.setTitle(title);
    }
});

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length == 0) createWindow();
});