const parseFiles = window.mm.parseFiles;
const allSongs = [];
let isPlayingSong = false;
let currentSongIndex = null;
let timer = null;

const addMusicButton = document.getElementById("add-btn");
const playAndPauseButton = document.getElementById("play-button");
const currentSongHeading = document.getElementById("current-song");
const audioPlayer = $("audio").get(0);
const playIcon = $("#play-button span");

addMusicButton.addEventListener("click", chooseMusic);
playAndPauseButton.addEventListener("click", playOrPauseSong);

function chooseMusic() {
  $("input").trigger("click");
}

function playSong(index) {
  currentSongIndex = index;
  audioPlayer.src = allSongs[index].path;
  audioPlayer.load();
  audioPlayer.play();
  timer = setInterval(updateTimer, 1000);
  playIcon.removeClass("icon-play");
  playIcon.addClass("icon-pause");
  isPlayingSong = true;
  currentSongHeading.textContent = "Playing now: " + allSongs[index].title;
}

function playOrPauseSong() {
  if (allSongs.length === 0) return;
  if (isPlayingSong) {
    audioPlayer.pause();
    clearInterval(timer);
    updatePlayButtonIcon();
    isPlayingSong = false;
  } else {
    if (currentSongIndex === null) {
      playSong(0);
      return;
    }
    audioPlayer.play();
    timer = setInterval(updateTimer, 1000);
    updatePlayButtonIcon();
    isPlayingSong = true;
  }
}

function playNext() {
  const totalSongs = allSongs.length;
  if (totalSongs === 0) return;
  const isLastSong = totalSongs - 1 === currentSongIndex;
  const indexToPlay = isLastSong ? 0 : currentSongIndex + 1;
  playSong(indexToPlay);
  currentSongIndex = indexToPlay;
}

function playPrevious() {
  const totalSongs = allSongs.length;
  if (totalSongs === 0) return;
  const isFirstSong = currentSongIndex === 0;
  const indexToPlay = isFirstSong ? totalSongs - 1 : currentSongIndex - 1;
  playSong(indexToPlay);
  currentSongIndex = indexToPlay;
}

function updatePlayButtonIcon() {
  const iconToRemove = isPlayingSong ? "icon-pause" : "icon-play";
  const iconToAdd = isPlayingSong ? "icon-play" : "icon-pause";
  playIcon.removeClass(iconToRemove);
  playIcon.addClass(iconToAdd);
}

function changeVolume(input) {
  audioPlayer.volume = input.value;
  const soundIcon = document.getElementById("icon-sound");
  if (input.value === "0") {
    soundIcon.classList.remove("icon-sound");
    soundIcon.classList.add("icon-mute");
  } else {
    soundIcon.classList.remove("icon-mute");
    soundIcon.classList.add("icon-sound");
  }
}

function updateTimer() {
  $("#time-left").text(secondsToTime(audioPlayer.currentTime));
  $("#total-time").text(secondsToTime(audioPlayer.duration));
  if (audioPlayer.currentTime >= audioPlayer.duration) playNext();
}

function clearPlaylist() {
  if (allSongs.length === 0) return;
  clearInterval(timer);
  timer = null;
  audioPlayer.pause();
  audioPlayer.src = "";
  currentSongIndex = null;
  playIcon.removeClass("icon-pause");
  playIcon.addClass("icon-play");
  isPlayingSong = false;
  $("#time-left").text("00:00");
  $("#total-time").text("00:00");
  $("#table-body").html("");
  currentSongHeading.textContent = "";
  allSongs.splice(0, allSongs.length);
  $("input").val("");
}

async function musicSelected() {
  const files = $("input").get(0).files;
  const currentLastIndexOfSongs = allSongs.length - 1;
  const filePaths = [];
  for (let i = 0; i < files.length; i++) {
    filePaths.push(files[i].path);
  }
  const jsonMetadata = await parseFiles(JSON.stringify(filePaths));
  const metadata = JSON.parse(jsonMetadata);
  const songsToAdd = metadata.map((data) => ({
    path: data.path,
    title: data.title,
  }));
  allSongs.push.apply(allSongs, songsToAdd);
  const songRows = metadata.map(
    (data, index) => `
    <tr ondblclick="playSong(${currentLastIndexOfSongs + index + 1})">
      <td>${data.title}</td>
      <td>${data.artist}</td>
      <td>${secondsToTime(data.duration)}</td>
    </tr>
  `
  );
  $("#table-body").append(songRows);
}

/* Helper function offered by AcodebiZ in this video
  to convert time in seconds to human readable minute length */
function secondsToTime(t) {
  return padZero(parseInt((t / 60) % 60)) + ":" + padZero(parseInt(t % 60));
}
function padZero(v) {
  return v < 10 ? "0" + v : v;
}
