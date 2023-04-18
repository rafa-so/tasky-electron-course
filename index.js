const path = require('path');
const electron = require('electron');

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

  tray = new Tray(iconPath);
  tray.on('click', (event, bounds) => {
    // click event bounds
    const { x, y } = bounds;
    const { height, width } = mainWindow.getBounds();


    if(mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.setBounds({
        x: x - width / 2,
        y,
        height,
        width
      });
      mainWindow.show();
    }
  });
});
