const { contextBridge, ipcRenderer } = require("electron");

const API = {
    interface: {
        authroized: () => ipcRenderer.send("user/authorized"),
        exit: () => ipcRenderer.send("app/close"),
        minimize: () => ipcRenderer.send("app/minimize"),
        maximize: () => ipcRenderer.send("app/maximize"),
        relocate: () => ipcRenderer.send("app/restore"),
        upload: (path) => ipcRenderer.send("user/upload", path),
        theme: (mode) => ipcRenderer.send("app/theme", mode),
        domTheme: (callback) => ipcRenderer.on("app/dom", (event, args) => {
            callback(args)
        }),
        downloadCodes: (key) => ipcRenderer.send("user/download", key),
        openWeb: () => ipcRenderer.send("open-web")
    },
    user: {
        messages: (callback) => ipcRenderer.on("user/messages", (event, args) => {
            callback(args);
        }),
    }
}

contextBridge.exposeInMainWorld("api", API);