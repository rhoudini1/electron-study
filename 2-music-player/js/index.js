const parseFiles = window.mm.parseFiles;

const addMusicButton = document.getElementById("add-btn");
addMusicButton.addEventListener("click", chooseMusic);

function chooseMusic() {
  $("input").trigger("click");
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
    <tr>
      <td>${data.title}</td>
      <td>${data.artist}</td>
      <td>${data.duration}</td>
    </tr>
  `
  );
  $("#table-body").append(songRows);
}
