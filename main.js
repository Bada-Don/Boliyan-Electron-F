// In ELECTRON APP/main.js

const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let pythonProcess = null;

function createPythonProcess() {
  let pythonExe;
  
  if (app.isPackaged) {
    // In production, use portable Python environment
    const portablePythonPath = path.join(process.resourcesPath, 'backend', 'portable-python', 'python.exe');
    const fs = require('fs');
    
    if (fs.existsSync(portablePythonPath)) {
      pythonExe = portablePythonPath;
      console.log('Using portable Python environment');
    } else {
      // Fallback to system Python if portable not available
      if (process.platform === 'win32') {
        const possiblePaths = [
          'python.exe',
          'python3.exe',
          path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Python', 'Python39', 'python.exe'),
          path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Python', 'Python310', 'python.exe'),
          path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Python', 'Python311', 'python.exe'),
          path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Python', 'Python312', 'python.exe'),
          path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Python', 'Python313', 'python.exe'),
          'C:\\Python39\\python.exe',
          'C:\\Python310\\python.exe',
          'C:\\Python311\\python.exe',
          'C:\\Python312\\python.exe',
          'C:\\Python313\\python.exe'
        ];
        
        for (const pyPath of possiblePaths) {
          try {
            if (fs.existsSync(pyPath)) {
              pythonExe = pyPath;
              console.log('Using system Python:', pyPath);
              break;
            }
          } catch (error) {
            continue;
          }
        }
        
        if (!pythonExe) {
          console.error('No Python installation found. Please install Python 3.9+ and ensure it\'s in PATH');
          return;
        }
      } else {
        pythonExe = 'python3';
      }
    }
  } else {
    // In development, use virtual environment
    pythonExe = process.platform === 'win32'
      ? path.join(__dirname, 'backend', 'venv', 'Scripts', 'python.exe')
      : path.join(__dirname, 'backend', 'venv', 'bin', 'python');
  }
  
  const scriptPath = path.join(__dirname, 'backend', 'app.py');

  console.log('Starting Python process with:', pythonExe);
  pythonProcess = spawn(pythonExe, [scriptPath]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python stdout: ${data}`);
  });
  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python stderr: ${data}`);
  });
  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
  });
}

function createWindow() {
  const mainWindow = new BrowserWindow({

    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Check if the app is packaged or in development mode
  if (app.isPackaged) {
    // If packaged, load the built HTML file
    mainWindow.loadFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  } else {
    // In development, try to load the Vite dev server first
    const devServerURL = 'http://localhost:5173'; // Vite default port
    const fallbackPath = path.join(__dirname, 'frontend', 'dist', 'index.html');
    
    // Check if dist folder exists (frontend has been built)
    const fs = require('fs');
    const distExists = fs.existsSync(fallbackPath);
    
    if (distExists) {
      // Try dev server first, fallback to built files
      mainWindow.loadURL(devServerURL).catch(() => {
        console.log('Dev server not running, loading built files...');
        mainWindow.loadFile(fallbackPath);
      });
    } else {
      // No built files, try dev server
      mainWindow.loadURL(devServerURL).catch((error) => {
        console.error('Failed to load dev server:', error);
        mainWindow.loadURL('data:text/html,<h1>Please run "npm run dev" in the frontend directory first</h1>');
      });
    }
    
    // Open the DevTools automatically in development
    // mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createPythonProcess();
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('will-quit', () => {
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