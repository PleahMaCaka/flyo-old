import { app, BrowserWindow, Menu, Tray } from 'electron'

const isDev: boolean = process.env.VITE_DEV_SERVER_URL !== undefined

const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL as string // can check using isDev but need url

async function createWindow() {
    const win = new BrowserWindow({
        title: "flyo",
        width: 800,
        height: 800,
        alwaysOnTop: true,
        transparent: true,
        autoHideMenuBar: true,
        skipTaskbar: true,
        frame: false
    })

    const url = isDev ?
        new URL(VITE_DEV_SERVER_URL as string) :
        new URL("./dist/index.html")

    url.protocol = "flyo:"

    if (isDev) await win.loadURL(url.toString())
    else await win.loadFile(url.toString())
}

function createTray() {
    const tray = new Tray("./public/icon.ico")
    tray.setToolTip("Flyo")
    tray.setContextMenu(Menu.buildFromTemplate([
        {
            label: "Exit",
            click: () => {
                app.quit()
            }
        }
    ]))
}

async function buildElectron() {
    await createWindow()
    createTray()
}

app.whenReady().then(async () => {
    await buildElectron()

    app.on("ready", async () => {
        await buildElectron()
    })

    app.on('activate', async () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            await buildElectron()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})