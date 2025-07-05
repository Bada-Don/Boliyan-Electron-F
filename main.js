// In ELECTRON APP/main.js

const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const isDev = process.env.NODE_ENV === 'development';

// Keep a global reference to the python process object.
// If you don't, the process will be garbage collected and may stop running.
let pythonProcess = null;
let mainWindow = null;

function createPythonProcess() {
  try {
    // Determine the path to the python executable within the venv
    const pythonExe = process.platform === 'win32'
      ? path.join(__dirname, 'backend', 'venv', 'Scripts', 'python.exe')
      : path.join(__dirname, 'backend', 'venv', 'bin', 'python');

    // The path to your flask app's main script
    const scriptPath = path.join(__dirname, 'backend', 'app.py');

    // Check if files exist
    const fs = require('fs');
    if (!fs.existsSync(pythonExe)) {
      console.error(`Python executable not found at: ${pythonExe}`);
      dialog.showErrorBox('Error', 'Python virtual environment not found. Please run "npm run install:all" to set up the environment.');
      return;
    }

    if (!fs.existsSync(scriptPath)) {
      console.error(`Flask app not found at: ${scriptPath}`);
      dialog.showErrorBox('Error', 'Backend Flask app not found.');
      return;
    }

    // Spawn the python process
    pythonProcess = spawn(pythonExe, [scriptPath]);

    // Log output from the python script to the console
    pythonProcess.stdout.on('data', (data) => {
      console.log(`Python stdout: ${data}`);
    });

    // Log errors from the python script to the console
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      console.log(`Python process exited with code ${code}`);
      if (code !== 0 && mainWindow) {
        dialog.showErrorBox('Backend Error', `Python backend process exited with code ${code}`);
      }
    });

    pythonProcess.on('error', (error) => {
      console.error('Failed to start Python process:', error);
      dialog.showErrorBox('Error', 'Failed to start Python backend process.');
    });

  } catch (error) {
    console.error('Error creating Python process:', error);
    dialog.showErrorBox('Error', 'Failed to create Python process.');
  }
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, 'frontend', 'public', 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
    },
    show: false, // Don't show until ready
  });

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Determine the URL to load
  const loadURL = isDev 
    ? 'http://localhost:5173' 
    : `file://${path.join(__dirname, 'frontend', 'dist', 'index.html')}`;

  // Load the React app
  mainWindow.loadURL(loadURL);

  // Open DevTools in development
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Window',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            createWindow();
          }
        },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About Boliyan Electron',
              message: 'Boliyan Transliteration App',
              detail: 'Version 1.0.0\nA Punjabi transliteration application built with Electron, React, and Python.'
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished initialization.
app.whenReady().then(() => {
  // Create the application menu
  createMenu();

  // Start the Python backend first
  createPythonProcess();

  // Wait a bit for the backend to start, then create the frontend window
  setTimeout(() => {
    createWindow();
  }, 2000);

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// This will be called before the app quits
app.on('will-quit', () => {
  // Kill the python process before the app exits
  if (pythonProcess) {
    console.log('Killing Python process...');
    pythonProcess.kill();
    pythonProcess = null;
  }
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  dialog.showErrorBox('Error', 'An unexpected error occurred: ' + error.message);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  dialog.showErrorBox('Error', 'An unexpected error occurred: ' + reason);
});