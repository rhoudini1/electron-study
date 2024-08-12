const addMusicButton = document.getElementById("add-btn");
addMusicButton.addEventListener("click", chooseMusic);

function chooseMusic() {
  $("input").trigger("click");
}

function musicSelected() {
  const files = $("input").get(0).files;
  console.log(files);
}
