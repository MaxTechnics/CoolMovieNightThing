// Infonet HyperText Script File
// Credits to Wout P. for making this file possible!

// Disable context menu, CTRL+SHIFT+I, CTRL+SHIFT+J, CTRL+U
window.addEventListener('contextmenu', function (e) {
  // do something here... or how about nothing
  e.preventDefault();
}, false);

document.onkeydown = function (event)
{
  event = (event || window.event);
  if (event.keyCode == 123 || event.keyCode == 18)
  {
    return false;
  }
}
document.onkeydown = function(e) {
  if(event.keyCode == 123) {
  return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
  return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
  return false;
  }
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
  return false;
  }
}


// Loader and overlay fadeout
function removeFadeOut( el, speed ) {
  var seconds = speed/1000;
  el.style.transition = "opacity "+seconds+"s ease";

  el.style.opacity = 0;
//  setTimeout(function() {
//      el.parentNode.removeChild(el);
//  }, speed);
}
// Overlay fadein for reload
function fadeIn( el, speed ) {
  var seconds = speed/1000;
  el.style.transition = "opacity "+seconds+"s ease";

  el.style.opacity = 1;
}


function StartInfonetHyperText() {
  var vid = document.getElementById('HyperTextTheme');
  vid.oncanplay = function() {

    Swal.fire({
      title: 'Event',
      text: "Due to an event, only Default mode is availale",
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Okay',
      reverseButtons: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    }).then((result) => {
      if (result.value) {
       letsAgo();
      }
    })
  }; 
}

function letsAgo() {

removeFadeOut(document.getElementById('overlay'), 300);
setTimeout(() => {
  document.getElementById('HyperTextTheme').play();
}, 150);
setTimeout(finalGo, 20000);
}

function finalGo() {
  document.getElementById('overlay').remove();
  document.getElementById('HyperTextTheme').remove();
  const iframe = Object.assign(document.createElement('iframe'), {
    id: 'mainframe',
    src: 'bye.html',
    class: 'mainframe'
  });
  document.body.append(iframe);

  
}