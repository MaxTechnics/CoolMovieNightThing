const { remote } = require('electron');
let win = remote.getCurrentWindow();
winMinimize = () => {
	win.minimize();
}
winMaximize = () => {
	if (win.isMaximized()) {
		win.unmaximize();
	} else {
		win.maximize();
	}
}
winClose = () => {
	win.close();
}

const DiscordRPC = require('discord-rpc');

// Set this to your Client ID.
const clientId = '788168870615318578';

// Only needed if you want to use spectate, join, or ask to join
DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: 'ipc' });


// Movie night custom stuff 
updateRPC = async (details, state, largeIMG, largeTEXT, smallIMG, smallTEXT, button1TXT, button1URL, button2TXT, button2URL) => {
	rpc.request('SET_ACTIVITY', {
		pid: process.pid,
		activity: {
			details: details,
			state: state,

			assets: {
				large_image: largeIMG,
				large_text: largeTEXT,
				small_image: smallIMG,
				small_text: smallTEXT
			},
			buttons: [
				{ label: button1TXT, url: button1URL },
				{ label: button2TXT, url: button2URL }
			],

		}
	});
}
rpc.on('ready', () => {

});

rpc.login({ clientId }).catch(console.error);
