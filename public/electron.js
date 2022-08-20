// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const isDev = require("electron-is-dev");
const { extname } = require("path");
const { readFileSync, lstatSync, writeFileSync, existsSync } = require("fs");
const axios = require("axios");
const os = require("os");

require("@electron/remote/main").initialize();

let codes = [];

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false,
      contextIsolation: true,
      enableRemoteModule: true,
    }
  });

  const startURL = isDev ? "http://localhost:3000/login" : `file://${path.join(__dirname, "../build/index.html")}`;

  // and load the index.html of the app.
  mainWindow.loadURL(startURL);
  mainWindow.webContents.openDevTools();
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // IPC EVENTS
  ipcMain.on("user/authorized", () => {
    mainWindow.setContentSize(1440, 794)
  })

  ipcMain.on("app/close", () => {
    app.quit();
  });

  ipcMain.on("app/minimize", () => { mainWindow.minimize() });

  ipcMain.on("app/maximize", () => {
    if (mainWindow.isMaximized()) {
      mainWindow.restore();
    } else {
      mainWindow.maximize()
    }
  });

  ipcMain.on("app/restore", () => {
    mainWindow.setContentSize(600, 800)
  });

  ipcMain.on("user/upload", (_, path) => {
    if (lstatSync(path).isFile() === true) {
      if (extname(path) === ".txt") {
        const messages = readFileSync(path).toString().split("\n").map((message) => message.trim());
        // let counter = 0;

        console.log(messages);

        mainWindow.webContents.send("user/messages", messages);
      }
    }
  });

  ipcMain.on("app/theme", (_, mode) => {
    if(mode === "dark") {
      mainWindow.webContents.send("app/dom", "dark");
    } else if(mode === "light") {
      mainWindow.webContents.send("app/dom", "light");
      console.log("light");
    }
  });

  ipcMain.on("user/download", (_, key) => {
    var data = JSON.stringify({
      "Key": key
    });
    
    var config = {
      method: 'post',
      url: 'http://localhost:1234/v1/account/data',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      // console.log(response.data.data.Codes);
      codes.push(response.data.data.Codes);
      // console.log(codes[0]);
      if(existsSync(`${os.homedir()}/Downloads/gfb_backup_codes.txt`)) {
        writeFileSync(`${os.homedir()}/Downloads/gfb_backup_codes-${Math.floor(Math.random() * 1000) + 2}.txt`, `${codes[0]}`);
      } else {
        writeFileSync(`${os.homedir()}/Downloads/gfb_backup_codes.txt`, `${codes[0]}`);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  });
  
  ipcMain.on("open-web", () => {
    const shell = require("electron").shell;

    shell.openExternal("https://grindfreebot.netlify.app")
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.