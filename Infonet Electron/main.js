const DiscordRPC = require('discord-rpc');
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
		title: 'Infonet HyperText',
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
		frame: false,
		alwaysOnTop: true,
		resizable: false,
		movable: true
	});
	splashWindow.loadFile('./app/splash.asar/splash.html');


	mainWindow.loadFile('./app/new.html');
	// For deploys use asar below
	//mainWindow.loadFile('./app/app.asar/Data/Pages/main.html')
	mainWindow.webContents.openDevTools()
	mainWindow.setMenuBarVisibility(false)

	mainWindow.once('ready-to-show', () => {
		setTimeout(() => {
			splashWindow.destroy();
		}, 1000);
		mainWindow.show();
	});
}

app.whenReady().then(() => {
	createWindow()

	app.on('activate', function() {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()

	})
})

app.on('window-all-closed', function() {
	//if (process.platform !== 'darwin') app.quit() //broken
	if (process.platform == 'darwin') app.quit()
})

//app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
//app.commandLine.appendSwitch('disable-site-isolation-trials')``


// Set this to your Client ID.
const clientId = '788168870615318578';

// Only needed if you want to use spectate, join, or ask to join
DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

async function setActivity() {
	//if (!rpc || !mainWindow) {
	//	return;
	//}

	// You'll need to have assets uploaded to
	// https://discord.com/developers/applications/<application_id>/rich-presence/assets
	/*rpc.setActivity({
		details: `Hello OwO`,
		state: 'Why are you looking at me?',
		startTimestamp,
		largeImageKey: 'maxim',
		largeImageText: 'Oxygen Amirite?',
		smallImageKey: 'maxim',
		smallImageText: 'GIVE ME COFFEE',
		instance: false,
	});*/
	rpc.request('SET_ACTIVITY', {
		pid: process.pid,
		activity: {
			details: 'Hello OwO',
			state: 'alive, i think',
			//timestamps: {
			//	start: 1017534582441 //Date.now()
			//},
			assets: {
				large_image: 'maxim', // large image key from developer portal > rich presence > art assets
				large_text: 'Oxygen Amirite?',
				small_image: 'maxim',
				small_text: 'GIME COFFEE'
			},
			buttons: [
				{ label: 'Remove Friend', url: 'osu://' },
				{ label: 'Join the channel', url: 'https://discord.gg/eYJ7HDAVBf' }
			],
			/*secrets: {
				match: 'funnymatch',
				join: 'funnijoin',
				spectate: 'spectatme',
			},
			party: {
				id: 'id',
				size: [1, 100]
			}*/
			//partyId: "ae488379-351d-4a4f-ad32-2b9b01c91657",
			//partySize: 1,
			//partyMax: 5,
			//joinSecret: "MTI4NzM0OjFpMmhuZToxMjMxMjM= "
		}
	});
}
rpc.on('ready', () => {
	// jointhing
	//rpc.subscribe('GAME_JOIN', function(payload) {
	//	console.log(payload)
	//	console.log(payload.secret)
	//	//shell.openExternal('steam://joinlobby/730/' + payload.secret)
	//	shell.openExternal('https://github.com/MaxTechnics/Tofu-Bot?token=' + payload.secret);
	//});

	setActivity();

	// activity can only be set every 15 seconds
	//setInterval(() => {
	//	setActivity();
	//}, 15e3);
});

rpc.login({ clientId }).catch(console.error);
