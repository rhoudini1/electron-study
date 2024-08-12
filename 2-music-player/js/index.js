const parseFiles = window.mm.parseFiles;

const addMusicButton = document.getElementById("add-btn");
const currentSongHeading = document.getElementById("current-song");
const audioPlayer = $("audio").get(0);

addMusicButton.addEventListener("click", chooseMusic);

function chooseMusic() {
  $("input").trigger("click");
}

function playSong(path, title) {
  console.log(path);
  audioPlayer.src = path;
  audioPlayer.load();
  audioPlayer.play();
  currentSongHeading.textContent = "Playing now: " + title;
}

async function musicSelected() {
  const files = $("input").get(0).files;
  const filePaths = [];
  for (let i = 0; i < files.length; i++) {
    filePaths.push(files[i].path);
  }
  const jsonMetadata = await parseFiles(JSON.stringify(filePaths));
  const metadata = JSON.parse(jsonMetadata);
  const songRows = metadata.map(
    (data) => `
    <tr ondblclick="playSong('${data.path}', '${data.title}')">
      <td>${data.title}</td>
      <td>${data.artist}</td>
      <td>${data.duration}</td>
    </tr>
  `
  );
  $("#table-body").append(songRows);
}
