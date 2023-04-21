const electron = require('electron');
const positioner = require('electron-traywindow-positioner');
const { Tray } = electron;

class TimerTray extends Tray {
  constructor(iconPath, mainWindow){
    super(iconPath);

    this.mainWindow = mainWindow;
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
}

module.exports = TimerTray;
