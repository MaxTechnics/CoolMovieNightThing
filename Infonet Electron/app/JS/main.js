setBody('Movie Night starts in:', 'Today we\'re watching: ', 'We present to you', 'Married... With Children');

document.addEventListener('DOMContentLoaded', function() {
	setTimeout(() => {
		removeFadeOut(document.getElementById('loadingscreen'), 500);
	}, 1000);
	
	setInterval(() => {
		calcTime(new Date('Apr 26, 2021 21:00:00').getTime());
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
	var seconds = speed / 1000;
	el.style.transition = "opacity " + seconds + "s ease";

	el.style.opacity = 0;
	setTimeout(function() {
		el.parentNode.removeChild(el);
	}, speed);
}

function calcTime(endDate){
	//var countDownDate = new Date(`${time}`).getTime();
  
  // Update the count down every 1 second
  var x = setInterval(function() {
  
    // Get today's date and time
    var now = new Date().getTime();
      
    // Find the distance between now and the count down date
    var distance = endDate - now;
      
    // Time calculations for days, hours, minutes and seconds
    //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance / (1000 * 60 * 60)));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (hours < 10) {
		  hours = '0' + hours;
    }
	  if (minutes < 10) {
	  	minutes = '0' + minutes;
	  }
	  if (seconds < 10) {
	  	seconds = '0' + seconds;
	  }

    // Output the result in an element with id="demo"
    //document.getElementById("countdown").innerHTML = /*days + "d " + */hours + "h " + minutes + "m " + seconds + "s ";
      
    // If the count down is over, write some text 
    if (distance < 0) {
      clearInterval(x);
	  }
	  let timeRemainingString = `${hours}h ${minutes}m ${seconds}s`;
	  updateBody(hours, minutes, seconds);
  }, 1000);
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

function updateBody(h, m ,s) {
	let hoursDigit = document.getElementsByClassName('time')[0];
	let minutDigit = document.getElementsByClassName('time')[1];
	let seconDigit = document.getElementsByClassName('time')[2];
	hoursDigit.innerHTML = h;
	minutDigit.innerHTML = m;
	seconDigit.innerHTML = s;
}


//reference
/*
// Set the date we're counting down to
  var countDownDate = new Date(`${time}`).getTime();
  
  // Update the count down every 1 second
  var x = setInterval(function() {
  
    // Get today's date and time
    var now = new Date().getTime();
      
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
      
    // Time calculations for days, hours, minutes and seconds
    //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance / (1000 * 60 * 60)));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (hours < 10) {
		  hours = '0' + hours;
    }
	  if (minutes < 10) {
	  	minutes = '0' + minutes;
	  }
	  if (seconds < 10) {
	  	seconds = '0' + seconds;
	  }

    // Output the result in an element with id="demo"
    document.getElementById("countdown").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
      
    // If the count down is over, write some text 
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("countdown").innerHTML = "";
      document.getElementById("title").innerHTML = "Starting soon...";
      document.getElementById("footer").innerHTML = "";
    }
  }, 1000);
  */
