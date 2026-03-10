const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const net = require('net');

const PORT = 18090;
let mainWindow = null;
let serverProcess = null;

/* ===== Find Python ===== */
function findPython() {
  const candidates = process.platform === 'win32'
    ? ['python', 'python3', 'py']
    : ['python3', 'python'];
  return candidates;
}

/* ===== Check if port is available ===== */
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => { server.close(); resolve(true); });
    server.listen(port, '127.0.0.1');
  });
}

/* ===== Start Flask Server ===== */
async function startServer() {
  const available = await isPortAvailable(PORT);
  if (!available) {
    console.log(`Port ${PORT} already in use, assuming server is running.`);
    return;
  }

  const appDir = app.isPackaged
    ? path.join(process.resourcesPath, 'app')
    : path.join(__dirname, '..', 'app');

  const serverScript = path.join(appDir, 'server.py');
  const pythons = findPython();

  for (const py of pythons) {
    try {
      serverProcess = spawn(py, [serverScript, '--no-browser'], {
        cwd: appDir,
        env: { ...process.env, NEURALDOCK_PORT: String(PORT) },
        stdio: ['ignore', 'pipe', 'pipe']
      });

      serverProcess.stdout.on('data', (d) => console.log(`[server] ${d}`));
      serverProcess.stderr.on('data', (d) => console.error(`[server] ${d}`));
      serverProcess.on('error', () => {});

      // Wait a moment to see if it crashes immediately
      await new Promise(r => setTimeout(r, 500));
      if (serverProcess.exitCode === null) {
        console.log(`Server started with ${py}`);
        return;
      }
    } catch (e) {
      continue;
    }
  }

  dialog.showErrorBox(
    'NeuralDock - Python Not Found',
    'Could not find Python 3. Please install Python 3.8+ and Flask.\n\npip install flask'
  );
}

/* ===== Wait for server to be ready ===== */
function waitForServer(maxRetries = 30) {
  return new Promise((resolve, reject) => {
    let retries = 0;
    const check = () => {
      const req = net.createConnection({ port: PORT, host: '127.0.0.1' }, () => {
        req.end();
        resolve();
      });
      req.on('error', () => {
        retries++;
        if (retries >= maxRetries) reject(new Error('Server did not start'));
        else setTimeout(check, 500);
      });
    };
    check();
  });
}

/* ===== Create Window ===== */
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    title: 'NeuralDock',
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    backgroundColor: '#0f1117',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    },
    show: false
  });

  mainWindow.loadURL(`http://localhost:${PORT}`);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => { mainWindow = null; });

  // Open external links in browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

/* ===== Menu ===== */
function buildMenu() {
  const isMac = process.platform === 'darwin';
  const template = [
    ...(isMac ? [{
      label: 'NeuralDock',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
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
      label: 'Help',
      submenu: [
        {
          label: 'GitHub',
          click: () => shell.openExternal('https://github.com/anson55sky/NeuralDock')
        },
        {
          label: 'Report Issue',
          click: () => shell.openExternal('https://github.com/anson55sky/NeuralDock/issues')
        }
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

/* ===== App Lifecycle ===== */
app.whenReady().then(async () => {
  buildMenu();
  await startServer();
  try {
    await waitForServer();
  } catch (e) {
    dialog.showErrorBox('NeuralDock', 'Failed to start backend server.');
    app.quit();
    return;
  }
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('will-quit', () => {
  if (serverProcess && serverProcess.exitCode === null) {
    serverProcess.kill();
  }
});
