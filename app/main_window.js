const electron = require('electron');
const { BrowserWindow }  = electron;

class MainWindow extends BrowserWindow {
  constructor(url){
    super({
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

    this.on('blur', this.onBlur);
    this.loadURL(url);
  }

  onBlur = () => {
    this.hide();
  }
}

module.exports = MainWindow;
