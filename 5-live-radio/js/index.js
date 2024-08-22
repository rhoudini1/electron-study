const audioPlayer = $("audio").get(0);

renderStations();

async function getStations() {
  const stationsJson = await window.radioApi.getStations();
  console.log(stationsJson);
  return JSON.parse(stationsJson);
}

async function renderStations() {
  const stationsList = await getStations();
  for (const station of stationsList) {
    const stationComponent = `
      <li class="list-group-item" ondblclick="playStream('${station.urlResolved}')">
        <img class="img-circle media-object pull-left" src="${station.favicon}" width="32" height="32" />
        <div class="media-body">
          <strong>${station.name}</strong>
          <p>${station.country}</p>
        </div>
      </li>
    `;
    $("#station-list").append(stationComponent);
  }
}

function playStream(url) {
  audioPlayer.src = url;
  audioPlayer.load();
  audioPlayer.play();
}
