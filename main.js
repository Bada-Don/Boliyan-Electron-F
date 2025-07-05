const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // These are important security settings
      nodeIntegration: false, // Keep Node.js out of the renderer process
      contextIsolation: true, // Isolate the main world from the renderer
    },
  });

  // Determine the URL to load.
  // In development, we load from the Vite dev server.
  // In production, we load the built HTML file.
  const loadURL = isDev
    ? 'http://localhost:3000' // Your React app's dev server URL
    : `file://${path.join(__dirname, 'frontend/dist/index.html')}`;

  mainWindow.loadURL(loadURL);

  // Open the DevTools automatically in development.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

// This method will be called when Electron has finished initialization.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// On macOS, re-create a window when the dock icon is clicked and there are no other windows open.
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});