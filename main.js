const {app, BrowserWindow, protocol} = require('electron');
const ipc = require("electron").ipcMain;
const fs = require('fs');
const JSZip = require("jszip");
const https = require('https');
const url = require('url');

if (process.argv.join(" ").indexOf("--dev") !== -1) {
    process.env.LOBBYCLIENT_DEV = "true";
} else {
    process.env.LOBBYCLIENT_BUILD = "true";
}

let win;

const isAlreadyOpen = app.makeSingleInstance((commandLine, workingDirectory) => {
    if (win) {
        win.webContents.send('lspm', commandLine[1]);
    }
});

if (isAlreadyOpen) {
    app.quit()
}
  
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

    win.webContents.openDevTools({ mode: 'detach' });
    if (process.env.LOBBYCLIENT_DEV) {
        //win.webContents.openDevTools({ mode: 'detach' });
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

    ipc.on("installPackage", (event, packageUrl, filename, path) => {
        downloadPackage(packageUrl, filename, path);
    });
}

function downloadPackage(packageUrl, filename, path) {
    const packagesDir = path + '/lspm/';
    if (!fs.existsSync(packagesDir)){
      fs.mkdirSync(packagesDir);
    }
    const filePath = packagesDir + filename;
    const file = fs.createWriteStream(filePath);
    const timeout = 30000;

    const timeoutWrapper = (req) => {
      return () => {
        req.abort();
        win.webContents.send('install-info', 'File transfer timeout!');
      };
    };

    const request = https.get(packageUrl).on('response', (res) => {
      const len = parseInt(res.headers['content-length'], 10);
      let downloaded = 0;

      res.on('data', (chunk) => {
          file.write(chunk);
          downloaded += chunk.length;
          win.webContents.send('install-info', 'Downloading ' + (100.0 * downloaded / len).toFixed(2) + '%');
          clearTimeout(timeoutId);
          timeoutId = setTimeout(fn, timeout);
      }).on('end', () => {
          clearTimeout(timeoutId);
          file.end();
          manageDependencies(packagesDir, filePath, filename);
          win.webContents.send('install-info', 'Download finished');
      }).on('error', (err) => {
          file.emit('error', new Error(https.STATUS_CODES[res.statusCode]));
          clearTimeout( timeoutId );
          win.webContents.send('install-info', err.message);
      });
    });

    const fn = timeoutWrapper(request);
    let timeoutId = setTimeout(fn, timeout);
}

function manageDependencies(packagesDir, filePath, filename) {
    const packageLock = packagesDir + 'packages.lock';
    let packages = {
        installed: []
    };
    if(fs.existsSync(packageLock)) {
        packages = JSON.parse(fs.readFileSync(packageLock, 'utf8'));
    }
    packages.installed.push(filename);

    const file = fs.createWriteStream(packageLock);
    file.write(JSON.stringify(packages));
    file.end();
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

app.setAsDefaultProtocolClient('lspm');
