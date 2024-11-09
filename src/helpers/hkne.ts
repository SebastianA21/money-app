import { app, BrowserWindow } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

import { createWindow } from "./window.ts";
import { createTray } from "./tray.ts";
import { WebSocketManager } from "../domain/entities/WebSocketManager.ts";
import { handlePrinterIPC } from "./ipc/PrinterIPC.ts";
import { getNetworkInfo} from "../application/services/NetworkInformation.ts";

const require = createRequire(import.meta.url)
export const __dirname = path.dirname(fileURLToPath(import.meta.url))

const wss = new WebSocketManager(8080); // Initialize WebSocket service


process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
export const SOURCE_DIR = path.join(process.env.APP_ROOT, 'src')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST
export const VITE_PUBLIC = VITE_DEV_SERVER_URL  ?path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST
export const DATA_DIR = path.join(SOURCE_DIR, 'data');
export const printerConfigFilePath = path.join(DATA_DIR, 'printerConfigs.json');
export const sharedPath = path.join(SOURCE_DIR, 'shared');
export const networkInfo = path.join(DATA_DIR, 'networkInfo.json');


let win: BrowserWindow | null = null;

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.whenReady().then(async () => {
  await getNetworkInfo();
  handlePrinterIPC();

  win = await createWindow(); // Adjust createWindow if it returns win
  createTray(win); // Pass the win instance to createTray
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
    createTray(win);
  }
});