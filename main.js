// In ELECTRON APP/main.js

const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process'); // <-- Import spawn

// Keep a global reference to the python process object.
// If you don't, the process will be garbage collected and may stop running.
let pythonProcess = null;

function createPythonProcess() {
  // Determine the path to the python executable within the venv
  const pythonExe = process.platform === 'win32'
    ? path.join(__dirname, 'backend', 'venv', 'Scripts', 'python.exe')
    : path.join(__dirname, 'backend', 'venv', 'bin', 'python');

  // The path to your flask app's main script
  const scriptPath = path.join(__dirname, 'backend', 'app.py');

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
  });
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Load the React app.
  // It's important this is the same port Vite is running on.
  mainWindow.loadURL('http://localhost:5173');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished initialization.
app.whenReady().then(() => {
  // Start the Python backend first
  createPythonProcess();

  // Then create the frontend window
  createWindow();

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