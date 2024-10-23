import { app, BrowserWindow, ipcMain } from "electron";
import isDev from "electron-is-dev";
import path from "path";
import { fileURLToPath } from "url";
import * as dotenv from 'dotenv';
import sqlite3 from "sqlite3";
import axios from "axios";

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
        width: isDev ? 1200 : 800,
        height: isDev ? 800 : 600,
        title: "Budget Badger",
        webPreferences: {
            preload: path.join(__dirName, "preload.js"),
            contextIsolation: false,
        }
    });

    mainWindow.loadURL(
        isDev ? 
        `http://localhost:3000` :
        `file://${path.join(__dirName, `../public/index.html`)}`
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

    mainWindow.webContents.openDevTools({ mode: 'detach' });
}

ipcMain.on('login', async (event, data) => {
   try {
        const response = await axios.post(`http://localhost:3000/api/v1/login`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        event.reply('login-response', { success: true, data: response.data });
   } 
   catch (error) {
        console.log('Login Error: ', error);
        event.reply('login-response', { success: false, error: error });
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