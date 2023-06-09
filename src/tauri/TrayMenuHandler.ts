import { WebviewWindow } from "@tauri-apps/api/window"
import { listen } from "@tauri-apps/api/event"

function localhost(path: string) {
    const local = "http://localhost:5173"
    return local + path
}

export function registerTrayMenuEvents() {
    trayMenuEvents.forEach(e => e())
}

const trayMenuEvents = [
    openConfig
]

function openConfig() {
    listen("open-config", async () => {
        console.log("Opening Config")
        const configWindow = new WebviewWindow("config", {
            url: localhost("/config"),
        })
        // TODO open


    }).then(() => {
        console.log("Registered :: TrayMenu -> Config")
    })
}


