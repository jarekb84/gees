/*global playerInfo, GetUnionArmyInfo, GetUnionPlanetInfo */

import _ from "lodash";

function fetchPlanetData(planetsToProcess, doneFetching) {
  if (planetsToProcess.length === 0) {
    setTimeout(() => {
      doneFetching();
    }, 1000);
    return;
  }

  const planetId = planetsToProcess.pop()[0];
  setTimeout(() => {
    console.log(`Fetching: ${planetId}`);
    GetUnionPlanetInfo(
      1,
      fetchPlanetData(planetsToProcess, doneFetching),
      planetId
    );
  }, _.random(1000, 2000));
}

function armyInfoFetchComplete(doneFetching) {
  let planetsToProcess = playerInfo.playerArmy.armyInfo.planets.slice(0);
  fetchPlanetData(planetsToProcess, doneFetching);
}

export function populatePlanetData(doneFetching) {
  GetUnionArmyInfo({}, () => armyInfoFetchComplete(doneFetching));
}
