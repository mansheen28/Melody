var w = c.width = window.innerWidth,
  h = c.height = window.innerHeight,
  ctx = c.getContext('2d'),

  minDist = 10,
  maxDist = 30,
  initialWidth = 10,
  maxLines = 100,
  initialLines = 4,
  speed = 5,

  lines = [],
  frame = 0,
  timeSinceLast = 0,

  dirs = [
    // straight x, y velocity
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
    // diagonals, 0.7 = sin(PI/4) = cos(PI/4)
    [.7, .7],
    [.7, -.7],
    [-.7, .7],
    [-.7, -.7]
  ],
  starter = { // starting parent line, just a pseudo line

    x: w / 2,
    y: h / 2,
    vx: 0,
    vy: 0,
    width: initialWidth
  };

function init() {

  lines.length = 0;

  for (var i = 0; i < initialLines; ++i)
    lines.push(new Line(starter));

  ctx.fillStyle = '#222';
  ctx.fillRect(0, 0, w, h);

  // if you want a cookie ;)
  // ctx.lineCap = 'round';
}
function getColor(x) {

  return 'hsl( hue, 80%, 50% )'.replace(
    'hue', x / w * 360 + frame
  );
}
function anim() {

  window.requestAnimationFrame(anim);

  ++frame;

  ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(0,0,0,.02)';
  ctx.fillRect(0, 0, w, h);
  ctx.shadowBlur = .5;

  for (var i = 0; i < lines.length; ++i)

    if (lines[i].step()) { // if true it's dead

      lines.splice(i, 1);
      --i;

    }

  // spawn new

  ++timeSinceLast

  if (lines.length < maxLines && timeSinceLast > 10 && Math.random() < .5) {

    timeSinceLast = 0;

    lines.push(new Line(starter));

    // cover the middle;
    ctx.fillStyle = ctx.shadowColor = getColor(starter.x);
    ctx.beginPath();
    ctx.arc(starter.x, starter.y, initialWidth, 0, Math.PI * 2);
    ctx.fill();
  }
}

function Line(parent) {

  this.x = parent.x | 0;
  this.y = parent.y | 0;
  this.width = parent.width / 1.25;

  do {

    var dir = dirs[(Math.random() * dirs.length) | 0];
    this.vx = dir[0];
    this.vy = dir[1];

  } while (
    (this.vx === -parent.vx && this.vy === -parent.vy) || (this.vx === parent.vx && this.vy === parent.vy));

  this.vx *= speed;
  this.vy *= speed;

  this.dist = (Math.random() * (maxDist - minDist) + minDist);

}
Line.prototype.step = function () {

  var dead = false;

  var prevX = this.x,
    prevY = this.y;

  this.x += this.vx;
  this.y += this.vy;

  --this.dist;

  // kill if out of screen
  if (this.x < 0 || this.x > w || this.y < 0 || this.y > h)
    dead = true;

  // make children :D
  if (this.dist <= 0 && this.width > 1) {

    // keep yo self, sometimes
    this.dist = Math.random() * (maxDist - minDist) + minDist;

    // add 2 children
    if (lines.length < maxLines) lines.push(new Line(this));
    if (lines.length < maxLines && Math.random() < .5) lines.push(new Line(this));

    // kill the poor thing
    if (Math.random() < .2) dead = true;
  }

  ctx.strokeStyle = ctx.shadowColor = getColor(this.x);
  ctx.beginPath();
  ctx.lineWidth = this.width;
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(prevX, prevY);
  ctx.stroke();

  if (dead) return true
}

init();
anim();

window.addEventListener('resize', function () {

  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
  starter.x = w / 2;
  starter.y = h / 2;

  init();
})


///////////////////////////////////////////////////////////////////
let musicContainer = document.querySelector(".container");
let favoriteBtn = document.querySelector(".fav-icon");
let audio = document.querySelector(".audio");
let playPauseBtn = document.querySelector(".play");
let startTime = document.querySelector(".start-time");
let endTime = document.querySelector(".end-time");
let progress = document.querySelector(".progress");
let progressContainer = document.querySelector(".time-bar");
let cover = document.querySelector(".main-pic");
let title = document.querySelector(".now-playing-title");
let prevBtn = document.querySelector(".prev");
let forwardBtn = document.querySelector(".forward");
let volume = document.querySelector(".sound-bar");
let row2 = document.querySelector(".row2")
let row3 = document.querySelector(".row3")
let row4 = document.querySelector(".row4")
let playTitle = document.querySelector(".playlist-title")
let content = document.querySelector(".content")
let audioList = document.querySelector(".audio-list");
let pic = document.querySelector(".main-pic")



//song titles
const songs = ['city-of-gold', 'brown-munde', 'dil-diya-gallan', 'mai-ta-vi-pyaar-karda', 'wafa-na-ras-aai']

const titles = ['Music', 'Playlist', 'favorites']

const fav = ['false', 'false', 'false', 'false'];


//keep track of songs
let songIndex = 0;
let titleIndex = 0;
//load song initially

loadSong(songs[songIndex]);

//load title initially
loadTitle(titles[titleIndex]);

//update song details
function loadSong(song) {
  title.innerText = song;



  audio.src = `songs/${song}.mpeg`;
  cover.src = `images/${song}.jpg`;


}





function loadTitle(title) {

  playTitle.innerText = title;
  title.src = `.home-tab/${titles}`;
  


}



function playpause() {
  if (playPauseBtn.innerHTML == " play_circle_outline") {
    playPauseBtn.innerHTML = "pause_circle";
    audio.play();
  } else {
    playPauseBtn.innerHTML = " play_circle_outline"
    audio.pause();
  }
}

playPauseBtn.addEventListener("click", playpause)



//change song back
prevBtn.addEventListener("click", function () {


  if (songIndex > 0) {
    songIndex -= 1;

  } else songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  loadLikes(songIndex);
  playPauseBtn.textContent= "pause_circle"

  audio.play();

})

//forward
forwardBtn.addEventListener("click", function () {


  if (songIndex < songs.length - 1) {
    songIndex += 1;

  } else songIndex = 0;
  loadSong(songs[songIndex]);
  loadLikes(songIndex);
  playPauseBtn.textContent= "pause_circle"

  audio.play();

})

// Update progress bar
audio.addEventListener('timeupdate', function (e) {
  const { duration, currentTime } = e.srcElement
  const progressPercent = (currentTime / duration) * 100

  progress.style.width = `${progressPercent}%`
  let totalTimeMin = Math.floor(duration / 60);
  let totalTimeSec = Math.floor(duration % 60);

  if (totalTimeSec < 10) {
    totalTimeSec = "0" + totalTimeSec;
  }
  let totalTimeDuration = totalTimeMin + ":" + totalTimeSec;
  if (duration) {
    endTime.textContent = totalTimeDuration;
  }

  let currentTimeMin = Math.floor(currentTime / 60);
  let currentTimeSec = Math.floor(currentTime % 60);

  if (currentTimeSec < 10) {
    currentTimeSec = "0" + currentTimeSec;
  }
  let currentTimeDuration = currentTimeMin + ":" + currentTimeSec;
  startTime.textContent = currentTimeDuration;
});


progressContainer.addEventListener("click", function (e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
})


//volume

let volumeBarClicked = true;

function openVolumeBar() {
  volumeBarClicked = false;
  let volumeBar = document.createElement("input");
  volumeBar.classList.add("range-sound");
  volumeBar.setAttribute("type", "range");

  volumeBar.setAttribute("min", "0");
  volumeBar.setAttribute("max", "100");
  volumeBar.setAttribute("value", "100");
  musicContainer.append(volumeBar);


  

}

function closeVolumeBar() {
  volumeBarClicked = true;
  let volumeBar = document.querySelector(".range-sound");
  
  volumeBar.remove();

}
document.querySelector(".soundIcon").addEventListener("click", function (e) {

  volumeBarClicked ? openVolumeBar() : closeVolumeBar();
  if (!volumeBarClicked) {
    document.querySelector(".range-sound").addEventListener("change", function (e) {

      console.log(e.currentTarget.value)
      audio.volume = e.currentTarget.value / 100;

    })
  }
})


//favourite ke liye
favoriteBtn.addEventListener("click", function () {
  if (fav[songIndex] == 'true') {
    fav[songIndex] = 'false';
  } else {
    fav[songIndex] = 'true';
  }
  loadLikes(songIndex);
})


function loadLikes(index) {
  if (fav[index] == 'true') {

    favoriteBtn.style.color = "red";
  } else {

    favoriteBtn.style.color = "grey";

  }
}

///////////////////////////// div creating

for(let i=0; i<songs.length; i++)
{
  const div = document.createElement("div");    //create div
  
  div.classList.add(`pSong-${i}`);   //adding class
  div.classList.add("pSong")
  div.innerText = songs[i];    //songs names
  audioList.appendChild(div);  
  
    
 
}

for(let i=0; i<songs.length; i++){
  document.querySelector(`.pSong-${i}`).addEventListener("click", function(e){
   
let idx= parseInt(e.currentTarget.classList[0].split("-")[1]);   //array 
loadSong(songs[idx]);
playpause();
audio.play();
playPauseBtn.textContent= "pause_circle"


  })
}









