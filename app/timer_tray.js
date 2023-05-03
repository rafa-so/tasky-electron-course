const electron = require('electron');
const positioner = require('electron-traywindow-positioner');
const { Tray, app, Menu } = electron;

class TimerTray extends Tray {
  constructor(iconPath, mainWindow){
    super(iconPath);

    this.mainWindow = mainWindow;
    this.setToolTip('Timer App');

    this.on('right-click', this.onRightClick);
    this.on('click', this.onClick);
  }

  onClick = (event, bounds) => {
    if(this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      positioner.position(this.mainWindow, this.getBounds());
      this.mainWindow.show();
    }
  }

  onRightClick = () => {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => app.quit(),
      }
    ]);

    this.popUpContextMenu(menuConfig);
  }
}

module.exports = TimerTray;
