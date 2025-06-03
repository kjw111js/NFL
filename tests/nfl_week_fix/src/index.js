import "./styles.css";
const listTeams = [
  "BUF",
  "MIA",
  "NE",
  "NYJ",
  "DAL",
  "NYG",
  "PHI",
  "WSH",
  "BAL",
  "CIN",
  "CLE",
  "PIT",
  "CHI",
  "DET",
  "GB",
  "MIN",
  "HOU",
  "IND",
  "JAX",
  "TEN",
  "ATL",
  "CAR",
  "NO",
  "TB",
  "DEN",
  "KC",
  "LAC",
  "LV",
  "ARI",
  "LAR",
  "SEA",
  "SF",
];
const networks = [
  "ABC/ESPN",
  "CBSCBS CBS",
  "FOXFOX FOX",
  "NBC",
  "Netflix",
  "Prime VideoPrime Video Prime Video",
];
do {
  generateGame();
} while (document.getElementsByClassName("nfl-c-matchup-strip").length < 16);

function generateGame() {
  const setGame = document.createElement("div");
  setGame.setAttribute("class", "nfl-c-matchup-strip");
  setGame.innerHTML =
    '<span class="nfl-c-matchup-strip__date-time">9/7/25 1 PM</span>: <span class="nfl-c-matchup-strip__team">' +
    pickTeam() +
    ' </span>  @ <span class="nfl-c-matchup-strip__team"><span class="nfl-c-matchup-strip__networks">' +
    networks[Math.ceil(Math.random() * networks.length - 1)] +
    "</span> " +
    pickTeam() +
    " How to Watch Ticketmaster </span>";
  document.getElementById("rawSchedule").append(setGame);
}

function pickTeam() {
  const randomPick = Math.ceil(Math.random() * listTeams.length - 1);
  const setTeam = listTeams[randomPick];
  listTeams[randomPick] = listTeams[listTeams.length - 1];
  listTeams.pop();
  return setTeam;
}

/*A browser console program for creating a table from NFL.com's weekly schedule pages*/

let allGames = [];

//Get just the schedule data
Array.from(document.getElementsByClassName("nfl-c-matchup-strip")).forEach(
  clearRecords
);

//Cleanup and collect schedule data
function clearRecords(strip) {
  let date = "TBD";
  if (
    strip.getElementsByClassName("nfl-c-matchup-strip__date-time")[0] !=
    undefined
  ) {
    date = strip.getElementsByClassName("nfl-c-matchup-strip__date-time")[0]
      .textContent;
    date = date.replaceAll("EDT", "");
  }
  let tv = "TBD";
  if (
    strip.getElementsByClassName("nfl-c-matchup-strip__networks")[0] !=
    undefined
  ) {
    tv = strip.getElementsByClassName("nfl-c-matchup-strip__networks")[0]
      .textContent;
  }
  let home = strip.getElementsByClassName("nfl-c-matchup-strip__team")[1]
    .textContent;
  let away = strip.getElementsByClassName("nfl-c-matchup-strip__team")[0]
    .textContent;
  const record = /\(\d(-\d){1,2}\)/g;
  const replaceList = [
    [record, ""],
    ["How to Watch", ""],
    ["Ticketmaster", ""],
    ["CBSCBS CBS", "CBS"],
    ["FOXFOX FOX", "FOX"],
    ["Prime VideoPrime Video Prime Video", "Prime Video"],
    ["Ticketmaster", ""],
    ["  ", ""],
    ["BUF", "Buffalo Bills"],
    ["MIA", "Miami Dolphins"],
    ["NE", "New England Patriots"],
    ["NYJ", "New York Jets"],
    ["DAL", "Dallas Cowboys"],
    ["NYG", "New York Giants"],
    ["PHI", "Philadelphia Eagles"],
    ["WSH", "Washington Commanders"],
    ["BAL", "Baltimore Ravens"],
    ["CIN", "Cincinnati Bengals"],
    ["CLE", "Cleveland Browns"],
    ["PIT", "Pittsburgh Steelers"],
    ["CHI", "Chicago Bears"],
    ["DET", "Detroit Lions"],
    ["GB", "Green Bay Packers"],
    ["MIN", "Minnesota Vikings"],
    ["HOU", "Houston Texans"],
    ["IND", "Indianapolis Colts"],
    ["JAX", "Jacksonville Jaguars"],
    ["TEN", "Tennessee Titans"],
    ["ATL", "Atlanta Falcons"],
    ["CAR", "Carolina Panthers"],
    ["NO", "New Orleans Saints"],
    ["TB", "Tampa Bay Buccaneers"],
    ["DEN", "Denver Broncos"],
    ["KC", "Kansas City Chiefs"],
    ["LAC", "Los Angeles Chargers"],
    ["LV", "Las Vegas Raiders"],
    ["ARI", "Arizona Cardinals"],
    ["LAR", "Los Angeles Rams"],
    ["SEA", "Seattle Seahawks"],
    ["SF", "San Francisco 49ers"],
  ];
  replaceList.forEach(scheduleReplace);
  allGames.push({ date: date, tv: tv, home: home, away: away });

  function scheduleReplace(replaceText) {
    home = home.replaceAll(replaceText[0], replaceText[1]);
    away = away.replaceAll(replaceText[0], replaceText[1]);
  }
}

//Append data table to the bottom of the page
allGames.forEach(styleGames);

function styleGames(getGame) {
  const row = document.createElement("tr");
  const columns = ["date", "tv", "home", "away"];
  columns.forEach(buildRow);

  function buildRow(getColumn) {
    const cell = document.createElement("td");
    const text = document.createTextNode(getGame[getColumn]);
    cell.appendChild(text);
    row.appendChild(cell);
  }
  document.getElementById("finalSchedule").appendChild(row);
}
