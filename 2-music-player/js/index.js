const parseFiles = window.mm.parseFiles;
const allSongs = [];
let isPlayingSong = false;
let currentSongIndex;

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
  updatePlayButtonIcon();
  isPlayingSong = true;
  currentSongHeading.textContent = "Playing now: " + allSongs[index].title;
}

function playOrPauseSong() {
  if (allSongs.length === 0) return;
  if (isPlayingSong) {
    audioPlayer.pause();
    updatePlayButtonIcon();
    isPlayingSong = false;
  } else {
    audioPlayer.play();
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
      <td>${data.duration}</td>
    </tr>
  `
  );
  $("#table-body").append(songRows);
}
