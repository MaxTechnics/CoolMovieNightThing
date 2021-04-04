const { remote } = require('electron');
let win = remote.getCurrentWindow();
winMinimize = () => {
    win.minimize();
}
winMaximize = () => {
  if (win.isMaximized()) {
      win.unmaximize();
  } else{
      win.maximize();
  }
}
winClose = () => {
    win.close();
}