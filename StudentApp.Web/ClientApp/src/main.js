const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url')

//instance of browserWindow to create a window in desktop
let win;

function createWindow(){
  win = new BrowserWindow();
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }))

  win.on('closed',() => {
    win = null;
  })
}

app.on('ready', createWindow);