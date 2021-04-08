setBody(strings.centerMessage, strings.headerText, strings.footerText, strings.movie);
if (strings.imageURL != '') {
	document.getElementsByClassName('Background')[0].style.backgroundImage = `url('${strings.imageURL}')`;
}
var counter = setInterval(() => {
	calcTime(new Date(strings.time).getTime());
}, 1000);

document.addEventListener('DOMContentLoaded', function() {
	setTimeout(() => {
		removeFadeOut(document.getElementById('loadingscreen'), 500);
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

	// Write to body 
	updateBody(hours, minutes, seconds);

	// Countdown hits 0, update and clearinterval
	if (distance < 0) {
		clearInterval(counter);
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
		hoursText.innerHTML = '';
		minutText.innerHTML = '';
		seconText.innerHTML = '';
		hoursDigit.innerHTML = '';
		minutDigit.innerHTML = '';
		seconDigit.innerHTML = '';
		headerEl.innerHTML = '';
		footerEl.innerHTML = '';

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
