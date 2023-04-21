const path = require('path');
const electron = require('electron');
const positioner = require('electron-traywindow-positioner');
const TimerTray = require('./app/timer_tray');

const { app, BrowserWindow, Tray } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 500,
    frame: false,
    resizable: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  tray = new TimerTray(iconPath);
  tray.on('click', (event, bounds) => {
    // click event bounds
    if(mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      positioner.position(mainWindow, tray.getBounds());
      mainWindow.show();
    }
  });
});
