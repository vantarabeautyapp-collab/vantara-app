const { app, BrowserWindow, shell } = require('electron')
const path = require('path')
const { spawn } = require('child_process')
const crypto = require('crypto')
const fs = require('fs')

const isDev = process.env.NODE_ENV !== 'production'
const PORT = 3005
let mainWindow
let nextServer

function waitForServer(url, retries = 30) {
  return new Promise((resolve, reject) => {
    const http = require('http')
    let attempts = 0
    const check = () => {
      http.get(url, (res) => {
        resolve()
      }).on('error', () => {
        attempts++
        if (attempts >= retries) return reject(new Error('Server did not start'))
        setTimeout(check, 1000)
      })
    }
    check()
  })
}

// Load or generate a persistent, cryptographically secure JWT secret for Electron builds.
// Stored in userData so it survives app updates but is unique per installation.
function getElectronJwtSecret() {
  const secretFile = path.join(app.getPath('userData'), 'vantara', '.jwt_secret')
  const dir = path.dirname(secretFile)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (fs.existsSync(secretFile)) {
    const s = fs.readFileSync(secretFile, 'utf-8').trim()
    if (s.length >= 32) return s
  }
  const newSecret = crypto.randomBytes(48).toString('hex')
  fs.writeFileSync(secretFile, newSecret, { mode: 0o600 }) // owner-read-only
  return newSecret
}

async function startNextServer() {
  const dbDir = path.join(app.getPath('userData'), 'vantara')
  const env = {
    ...process.env,
    PORT: String(PORT),
    DATA_PATH: dbDir,
    JWT_SECRET: getElectronJwtSecret(),
    NODE_ENV: 'production',
  }

  const nextScript = path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'bin', 'next')
  nextServer = spawn(process.execPath, [nextScript, 'start', '--port', String(PORT)], {
    cwd: path.join(__dirname, '..'),
    env,
    stdio: 'pipe',
  })

  nextServer.stdout.on('data', d => process.stdout.write('[next] ' + d))
  nextServer.stderr.on('data', d => process.stderr.write('[next] ' + d))
  nextServer.on('error', err => console.error('Next.js server error:', err))

  await waitForServer(`http://localhost:${PORT}`)
}

async function createWindow() {
  if (!isDev) {
    await startNextServer()
  }

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    backgroundColor: '#0A0A0A',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    show: false,
    // icon: path.join(__dirname, '..', 'public', 'icon.png'),
  })

  mainWindow.loadURL(`http://localhost:${PORT}`)

  mainWindow.once('ready-to-show', () => mainWindow.show())

  // Open external links in default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (nextServer) nextServer.kill()
  app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
