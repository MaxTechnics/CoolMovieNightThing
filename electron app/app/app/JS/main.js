var RPCtime = 'no';

setBody(strings.centerMessage, strings.headerText, strings.footerText, strings.movie);
if (strings.imageURL != '') {
	document.getElementsByClassName('Background')[0].style.backgroundImage = `url('${strings.imageURL}')`;
}
document.getElementsByClassName('Background')[0].style.opacity = strings.opacity;
var counter = setInterval(() => {
	calcTime(new Date(strings.time).getTime());
}, 1000);

document.addEventListener('DOMContentLoaded', function() {
	setTimeout(() => {
		removeFadeOut(document.getElementById('loadingscreen'), 500);
		document.getElementsByClassName('Background')[0].style.opacity = strings.opacity;
	}, 1000);
}, false);

// Helper functions
function fadeIn(el, speed) {
	let seconds = speed / 1000;
	el.style.transition = 'opacity ' + seconds + 's ease';
	el.style.opacity = 1;
}

function fadeOut(el, speed) {
	let seconds = speed / 1000;
	el.style.transition = 'opacity ' + seconds + 's ease';
	el.style.opacity = 0;
}

function removeFadeOut(el, speed) {
	let seconds = speed / 1000;
	el.style.transition = 'opacity ' + seconds + 's ease';

	el.style.opacity = 0;
	setTimeout(function() {
		el.parentNode.removeChild(el);
	}, speed);
}

function calcTime(endDate) {

	// Get current date and time
	var now = new Date().getTime();

	// Find the distance between now and the count down date
	var distance = endDate - now;

	// Time calculations for hours, minutes and seconds
	var hours = Math.floor((distance / (1000 * 60 * 60)));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	// Add a 0 if needed
	if (hours < 10) {
		hours = '0' + hours;
	}
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	if (seconds < 10) {
		seconds = '0' + seconds;
	}

	RPCtime = `${strings.RPCCountMessage} ${hours}h ${minutes}m`;
	if (minutes === '00') {
		RPCtime = strings.RPCAlmostThere;
	}

	// Write to body 
	updateBody(hours, minutes, seconds);

	// Countdown hits 0, update and clearinterval
	if (distance < 0) {
		clearInterval(counter);
		clearInterval(countRPC);
		let centerText = document.getElementById('text');
		let hoursText = document.getElementsByClassName('timetext')[0];
		let minutText = document.getElementsByClassName('timetext')[1];
		let seconText = document.getElementsByClassName('timetext')[2];
		let hoursDigit = document.getElementsByClassName('time')[0];
		let minutDigit = document.getElementsByClassName('time')[1];
		let seconDigit = document.getElementsByClassName('time')[2];
		let headerEl = document.getElementsByTagName('header')[0];
		let footerEl = document.getElementsByTagName('footer')[0];
		centerText.innerHTML = strings.postCounterMessage;
		removeFadeOut(headerEl, 2000);
		removeFadeOut(footerEl, 2000);
		hoursText.innerHTML = '';
		minutText.innerHTML = '';
		seconText.innerHTML = '';
		hoursDigit.innerHTML = '';
		minutDigit.innerHTML = '';
		seconDigit.innerHTML = '';
		//headerEl.innerHTML = '';
		//footerEl.innerHTML = '';
		document.getElementsByClassName('Background')[0].style.opacity = strings.postCounterOpacity;
		setInterval(() => {
			// Update RPC
			updateRPC(`${strings.movie}`, `${strings.RPCPostCountMsg}`, strings.RPCPostCountlarge_image, strings.RPCPostCountlarge_text, strings.RPCPostCountsmall_image, strings.RPCPostCountsmall_text, strings.RPCPostCountbtn1TXT, strings.RPCPostCountbtn1URL, strings.RPCPostCountbtn2TXT, strings.RPCPostCountbtn2URL);
		}, 16000);
	}
}

function setBody(centerString, headerString, footerString, movie) {
	let centerText = document.getElementById('text');
	let hoursText = document.getElementsByClassName('timetext')[0];
	let minutText = document.getElementsByClassName('timetext')[1];
	let seconText = document.getElementsByClassName('timetext')[2];
	let headerEl = document.getElementsByTagName('header')[0];
	let footerEl = document.getElementsByTagName('footer')[0];
	centerText.innerHTML = centerString;
	hoursText.innerHTML = 'h';
	minutText.innerHTML = 'm';
	seconText.innerHTML = 's';
	headerEl.innerHTML = headerString + movie;
	footerEl.innerHTML = footerString;
}

function updateBody(h, m, s) {
	let hoursDigit = document.getElementsByClassName('time')[0];
	let minutDigit = document.getElementsByClassName('time')[1];
	let seconDigit = document.getElementsByClassName('time')[2];
	hoursDigit.innerHTML = h;
	minutDigit.innerHTML = m;
	seconDigit.innerHTML = s;
}


var countRPC = setInterval(() => {
	// Update RPC
	updateRPC(`${strings.movie}`, RPCtime, strings.RPClarge_image, strings.RPClarge_text, strings.RPCsmall_image, strings.RPCsmall_text, strings.RPCbtn1TXT, strings.RPCbtn1URL, strings.RPCbtn2TXT, strings.RPCbtn2URL);
}, 16000);

/*function initializeRPC() {
	updateRPC(`Streaming ${strings.movie}`, 'Time will appear soon.', strings.RPClarge_image, strings.RPClarge_text, strings.RPCsmall_image, strings.RPCsmall_text, strings.RPCbtn1TXT, strings.RPCbtn1URL, strings.RPCbtn2TXT, strings.RPCbtn2URL);
}*/

// Version checking
let currentVersion = 1.1;
if (strings.latestVersion) {
	if (currentVersion == strings.latestVersion) {
		console.log('Up to date');
	}
	if (currentVersion < strings.latestVersion) {
		console.warn('Update available');
		setTimeout(() => {
			Swal.fire({
				showClass: {
					popup: 'fadein'
				},
				hideClass: {
					popup: 'fadeout'
				},
				toast: true,
				position: 'top-end',
				icon: 'info',
				title: `Update available! (${currentVersion} => ${strings.latestVersion})`,
				showConfirmButton: false,
				timer: 20000,
				timerProgressBar: true
			})
		}, 2000);
	}
}

if (!strings.latestVersion) {
	Swal.fire({
		showClass: {
			popup: 'fadein'
		},
		hideClass: {
			popup: 'fadeout'
		},
		toast: true,
		position: 'top-end',
		icon: 'error',
		title: 'Error checking for updates',
		showConfirmButton: false,
		timer: 10000,
		timerProgressBar: true,
	})
}
