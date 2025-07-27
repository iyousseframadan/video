let time = 0;
let playing = false;
let muted = false;
let speed = 1;
let loopId;

function format(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function refresh() {
  document.getElementById("seekBar").value = Math.floor(time / 10);
  document.getElementById("timer").textContent = `${format(time)} / 4:00`;
}

function handleSeek() {
  time = document.getElementById("seekBar").value * 10;
  refresh();
}

function startPlayback() {
  if (!playing) {
    playing = true;
    loopId = setInterval(() => {
      time += speed;
      if (time >= 240) {
        time = 240;
        halt();
      }
      refresh();
    }, 1000);
  }
}

function halt() {
  playing = false;
  clearInterval(loopId);
  refresh();
}

function backward(seconds) {
  time = Math.max(0, time - seconds);
  refresh();
}

function forward(seconds) {
  time = Math.min(240, time + seconds);
  refresh();
}

function adjustVolume() {
  const volumeVal = document.getElementById("audioControl").value;
  document.getElementById("audioLabel").textContent = volumeVal;
  if (volumeVal == 0 && !muted) {
    muted = true;
    document.getElementById("soundToggle").textContent = "play";
  } else if (volumeVal > 0 && muted) {
    muted = false;
    document.getElementById("soundToggle").textContent = "mute";
  }
}

function muteToggle() {
  muted = !muted;
  document.getElementById("soundToggle").textContent = muted ? "paly" : "mute";
  document.getElementById("audioControl").value = muted ? 0 : 100;
  document.getElementById("audioLabel").textContent = muted ? "0" : "100";
}

function updateSpeed() {
  const rateVal = document.getElementById("rateControl").value;
  const rateOptions = [0.25, 0.5, 1, 2];
  speed = rateOptions[rateVal];
  document.getElementById("rateLabel").textContent = speed + "x";
}
