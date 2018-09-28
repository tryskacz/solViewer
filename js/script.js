//Make the DIV element draggagle:
dragElement(document.getElementById("dragable"));

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

var content = document.getElementById('dragable');
var dX = 0.75;
var zX = 2.0;
var dR = 0;
var rR = 0;

var direction;
var rotation;

window.addEventListener('wheel', function(e) {
  // s ctrl pokud tL™eba
  // if (!e.ctrlKey) {
  //     return;
  // }
  direction = (e.deltaY > 0) ? -0.1 : 0.1;

  if (e.ctrlKey) {
    direction = direction / 2;
  }
  if (e.altKey) {
    direction = direction * 2;
  }
  if (e.altKey && e.ctrlKey) {
    direction = direction / 8;
  }

  autoScaling = false;
  updateScale(direction);

  e.preventDefault();
  return;
});

window.addEventListener('keypress', function(e) {
  var keynum;
  if (window.event) { // IE                    
    keynum = e.keyCode;
  } else if (e.which) { // Netscape/Firefox/Opera                   
    keynum = e.which;
  }

  var char = String.fromCharCode(keynum);

  if (char == 'w' || char == 'W' || char == 'e' || char == 'q' || char == 'E' || char == 'Q') {
    switch(char) {
      case 'e':
       rotation = 15;
       break;
      case 'q':
       rotation = -15;
       break;
      case 'E':
       rotation = 30;
       break;
      case 'Q':
       rotation = -30;
       break;
      default:
       rotation = 0;       
    }
    updateRotate(rotation);
  }

});

function updateRotate(rotation) {
  dR += rotation;
  if (rotation == 0) dR = 0;
  if (dR < -180) dR = -180;
  if (dR > 180) dR = 180;
}

function updateScale(direction) {
  dX += direction;
  if (dX < -3.0) dX = -3.0;
  if (dX > 3.0) dX = 3.0;
}

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player(document.getElementById('iframe'), {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.setPlaybackQuality('hires');
  event.target.playVideo();
  event.target.setPlaybackQuality('hires');

  setInterval(ScaleOnStart, 16);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    // onPlayerReady(event);
    event.target.seekTo(0);
  }
}

function ScaleOnStart() {
  if (Math.abs(dX - zX) > 0.01) {
    zX = zX + (dX - zX) * 0.05;
    content.style.transform = 'scale(' + zX + ') rotate(' + rR + 'deg)';
  }
  if (rR != dR) {
    if (dR > rR) rR = rR + 1;
    if (dR < rR) rR = rR - 1;
    content.style.transform = 'scale(' + zX + ') rotate(' + rR + 'deg)';
  }
}

function changeSource(linkId) {
  player.loadVideoById(linkId, 0, "large");
  // reset zoom
  dX = 0.75;
  zX = 4;
}


//stupid menu control
function menuControl() {
  if (document.getElementById('menuControlBtn').style.marginBottom == '0px') {
    document.getElementById('menu').style.top = '0px';
    document.getElementById('menu').style.opacity = '1';
    document.getElementById('menuControlBtn').style.marginBottom = '8px';
  } else {
    document.getElementById('menu').style.top = '-76px';
    document.getElementById('menuControlBtn').style.marginBottom = '0';
    document.getElementById('menu').style.opacity = '0.01';

  }
}

function bottomMenuControl() {
  if (document.getElementById('bottomMenuControlBtn').style.marginBottom == '8px') {
    document.getElementById('bottomMenu').style.top = '0px';
    document.getElementById('bottomMenu').style.opacity = '1';
    document.getElementById('bottomMenuControlBtn').style.marginBottom = '2px';
  } else {
    document.getElementById('bottomMenu').style.top = '84px';
    document.getElementById('bottomMenuControlBtn').style.marginBottom = '8px';
    document.getElementById('bottomMenu').style.opacity = '0.01';

  }
}

function leftMenuControl() {
  if (document.getElementById('leftMenuControlBtn').style.marginLeft == '6px') {
    document.getElementById('leftMenu').style.left = '0px';
    document.getElementById('leftMenu').style.opacity = '1';
    document.getElementById('leftMenuControlBtn').style.marginLeft = '-6px';
  } else {
    document.getElementById('leftMenu').style.left = '-242px';
    document.getElementById('leftMenuControlBtn').style.marginLeft = '6px';
    document.getElementById('leftMenu').style.opacity = '0.01';

  }
}


var slRed = document.getElementById("slRed");
var slGreen = document.getElementById("slGreen");
var slBlue = document.getElementById("slBlue");
var slAlpha = document.getElementById("slAlpha");


slRed.oninput = function() {
  showRgba();
}
slGreen.oninput = function() {
  showRgba();
}
slBlue.oninput = function() {
  showRgba();
}
slAlpha.oninput = function() {
  showRgba();
}

function showRgba() {
  var rgba = 'rgba('+slRed.value+','+slGreen.value+','+slBlue.value+','+slAlpha.value+')';
  document.getElementById('overlayRgba').innerHTML = rgba;
  document.getElementById('colorSquare').style.background = rgba;
  document.getElementById('overlay').style.background = rgba;


  var style = document.querySelector('[data="test"]');
  style.innerHTML = ".slider.sl-red::-webkit-slider-thumb { background: rgba(255,0,0,"+(slRed.value/255)+") !important; }"+
  ".slider.sl-green::-webkit-slider-thumb { background: rgba(0,255,0,"+(slGreen.value/255)+") !important; }"+
  ".slider.sl-blue::-webkit-slider-thumb { background: rgba(0,0,255,"+(slBlue.value/255)+") !important; }"+
  ".slider.sl-alpha::-webkit-slider-thumb { background: rgba(50,50,50,"+slAlpha.value+") !important; }";
}
