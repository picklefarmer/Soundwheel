'use strict';

const electron = require('electron');
const app = electron.app;
var ipc = require('electron').ipcMain;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
		width: 2400,
		height: 800,
		transparent:true,
		frame:false,
		'node-integration':false
	});

  mainWindow.loadURL('http://localhost:4200/offline/song/destiny/edit');
  //mainWindow.loadURL('file://' + __dirname + '/../index.html');
			mainWindow.webContents.openDevTools();


  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
