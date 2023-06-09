// Prevents an additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu};

fn main() {
    let tray = SystemTray::new()
        .with_menu(SystemTrayMenu::new()
            .add_item(CustomMenuItem::new("config", "Config"))
            .add_item(CustomMenuItem::new("quit", "Quit"))
        );

    tauri::Builder::default()
        .system_tray(tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => {
                match id.as_str() {
                    "config" => {
                        println!("Calling Config Window");
                        app.emit_all("open-config", ()).unwrap();
                    }
                    "quit" => {
                        println!("Quiting by tray menu");
                        app.exit(0);
                    }
                    _ => {}
                }
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
