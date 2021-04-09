var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;
const path = require('path');
function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 1280,
		height: 720,
		minWidth: 1280,
		minHeight: 720,
		fullscreen: false,
		resizable: true,
		movable: true,
		alwaysOnTop: false,
		title: 'Movie Night',
		transparent: false,
		fullscreenable: true,
		titleBarStyle: 'hidden',
		//titleBarStyle: 'customButtonsOnHover', //hides parts of the traffic light contols on mac
		autoplayPolicy: 'no-user-gesture-required',
		center: true,
		backgroundThrottling: false,
		frame: false,
		icon: path.join(__dirname + '/Icon/icon.ico'), /*icns for mac! 512x512*/
		show: false, //Just don't show it yet
		webPreferences: {
			webSecurity: true,
			preload: path.join(`${__dirname}/electron`, 'preload.js'),
			enableRemoteModule: true
		}
	})

	// create a new splash-Window 
	const splashWindow = new BrowserWindow({
		width: 300,
		height: 300,
		transparent: true,
		title: 'Loading',
		frame: false,
		icon: path.join(__dirname + '/Icon/icon.ico'), /*icns for mac! 512x512*/
		alwaysOnTop: true,
		resizable: false,
		movable: true
	});
	splashWindow.loadFile('./app/splash/splash.html');
	//splashWindow.loadFile('./app/splash.asar/splash.html');


	//mainWindow.loadFile('./app/index.html');
	// For deploys use asar below
	//mainWindow.loadFile('./app/app.asar/index.html');
	mainWindow.loadFile('./app/app/index.html');
	//mainWindow.webContents.openDevTools() // Open inspector
	mainWindow.setMenuBarVisibility(false)

	mainWindow.once('ready-to-show', () => {
		setTimeout(() => {
			splashWindow.destroy();
		}, 500);
		mainWindow.show();
	});
}

// Don't cache stuff
app.commandLine.appendSwitch('disable-http-cache');

app.whenReady().then(() => {
	createWindow()

	app.on('activate', function() {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

app.on('window-all-closed', function() {
	//if (process.platform !== 'darwin') app.quit() //broken
	//if (process.platform == 'darwin') app.quit()
	app.quit();
})
