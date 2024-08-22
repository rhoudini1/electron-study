async function getStations() {
  const stationsJson = await window.radioApi.getStations();
  console.log(stationsJson);
  return JSON.parse(stationsJson);
}

async function renderStations() {
  const stationsList = await getStations();
  for (const station of stationsList) {
    const stationComponent = `
      <li class="list-group-item">
        <img class="img-circle media-object pull-left" src="" width="32" height="32" />
        <div class="media-body">
          <strong>${station.name}</strong>
          <p>${station.country}</p>
        </div>
      </li>
    `;
    $("#station-list").append(stationComponent);
  }
}

renderStations();
