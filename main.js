const {app, BrowserWindow} = require('electron');
const ipc = require("electron").ipcMain;

if (process.argv.join(" ").indexOf("--dev") !== -1) {
    process.env.LOBBYCLIENT_DEV = "true";
} else {
    process.env.LOBBYCLIENT_BUILD = "true";
}

let win;
  
function createWindow () {
    win = new BrowserWindow({width: 1280, height: 720, frame: false, titleBarStyle: 'hidden'});

    // MaxOS only :(
    win.setAspectRatio(16/9);

    // Disables Fullscreen by F11
    win.setFullScreenable(false);

    // Disables fullscreen by doubleclick and drag
    win.setResizable(false);

    if(process.env.LOBBYCLIENT_DEV) {
        win.loadURL('http://localhost:8080/');
    } else {
        win.loadFile('index.html');
    }

    if (process.env.LOBBYCLIENT_DEV) {
        win.webContents.openDevTools({ mode: 'detach' });
    }
    win.on('closed', () => {
      win = null;
    });

    ipc.on("close", () => {
        win && win.close();
    });

    ipc.on("minimize", () => {
        win && win.minimize();
    });
}
  
app.on('ready', createWindow);
  
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
});
  
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
