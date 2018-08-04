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
let packages = undefined;
let dependenciesToInstall = [];

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

    ipc.on("installPackage", (event, host, packageCreator, packageName, packageVersion, path) => {
        downloadPackage(host, packageCreator, packageName, packageVersion, path);
    });
}

function downloadPackage(host, packageCreator, packageName, packageVersion, path) {
    const packagesDir = path + '/lspm/';
    loadPackagesInstalled(packagesDir);
    if(isAlreadyInstalled(packageCreator, packageName, packageVersion) == 1) {
        manageDependencies(host, path);
        return;
    }

    const filename = `${packageCreator}-${packageName}-${packageVersion}.zip`;
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

    const request = https.get(`https://${host}/package/download/${packageCreator}/${packageName}/${packageVersion}`).on('response', (res) => {
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
          installPackage(host, path, filePath, packageCreator, packageName, packageVersion);
          win.webContents.send('install-info', 'Installing package...');
      }).on('error', (err) => {
          file.emit('error', new Error(https.STATUS_CODES[res.statusCode]));
          clearTimeout( timeoutId );
          win.webContents.send('install-info', err.message);
      });
    });

    const fn = timeoutWrapper(request);
    let timeoutId = setTimeout(fn, timeout);
}

/*
Returns 1 for yes
Returns 0 for no
Returns -1 for not same version
*/
function isAlreadyInstalled(packageCreator, packageName, packageVersion) {
    if(packages.installed[`${packageCreator}-${packageName}`] != undefined) {
        if(packages.installed[`${packageCreator}-${packageName}`] === packageVersion) {
            return 1;
        }
        return -1;
    }
    return 0;
}

function loadPackagesInstalled(packagesDir) {
    // Register file that we downloaded in packages.lock to track what is installed
    const packageLock = packagesDir + 'packages.lock';
    packages = {
        installed: {}
    };
    if(fs.existsSync(packageLock)) {
        packages = JSON.parse(fs.readFileSync(packageLock, 'utf8'));
    }
}

function installPackage(host, path, filePath, packageCreator, packageName, packageVersion) {
    packages.installed[`${packageCreator}-${packageName}`] = packageVersion;

    const packageLock = path + '/lspm/packages.lock';
    const file = fs.createWriteStream(packageLock);
    file.write(JSON.stringify(packages));
    file.end();

    fs.readFile(filePath, function(err, data) {
        if (err) throw err;
        JSZip.loadAsync(data).then(function (zip) {
            zip.file("manifest.json").async("string").then((res) => {
                let manifest = JSON.parse(res);
                if(manifest.dependencies != undefined) {
                    Object.keys(manifest.dependencies).forEach((dependency) => {
                        dependenciesToInstall.push({
                            name: dependency,
                            version: manifest.dependencies[dependency],
                        });
                    });
                    manageDependencies(host, path);
                }
            });
        });
    });
}

function manageDependencies(host, path) {
    if(dependenciesToInstall.length == 0) {
        win.webContents.send('install-info', 'Package successfully installed!');
        return;
    }
    const nextDepencyToInstall = dependenciesToInstall.pop();
    console.log(nextDepencyToInstall);
    const packageInfo = nextDepencyToInstall.name.split('-');
    downloadPackage(host, packageInfo[0], packageInfo[1], nextDepencyToInstall.version, path);
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
