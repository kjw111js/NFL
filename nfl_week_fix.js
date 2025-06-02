/*A browser console program for creating a table from NFL.com's weekly schedule pages*/

let allGames = [];

//Get just the schedule data
Array.from(document.getElementsByClassName('nfl-c-matchup-strip')).forEach(clearRecords);

//Cleanup and collect schedule data
function clearRecords (strip) {
	let date = 'TBD';
	if (strip.getElementsByClassName('nfl-c-matchup-strip__date-time')[0] != undefined) {
		date = strip.getElementsByClassName('nfl-c-matchup-strip__date-time')[0].textContent;
		date = date.replaceAll('EDT', '');
	}
	let tv = 'TBD';
	if (strip.getElementsByClassName('nfl-c-matchup-strip__networks')[0] != undefined) {
		tv = strip.getElementsByClassName('nfl-c-matchup-strip__networks')[0].textContent;
	}
	let home = strip.getElementsByClassName('nfl-c-matchup-strip__team')[1].textContent;
	let away = strip.getElementsByClassName('nfl-c-matchup-strip__team')[0].textContent;
	const record = /\(\d(-\d){1,2}\)/g;
	home = home.replaceAll(record, '');
	home = home.replaceAll('How to Watch', '');
	home = home.replaceAll('Ticketmaster', '');
	home = home.replaceAll('CBSCBS CBS', 'CBS');
	home = home.replaceAll('FOXFOX FOX', 'FOX');
	home = home.replaceAll('Prime VideoPrime Video Prime Video', 'Prime Video');
	home = home.replaceAll('Ticketmaster', '');
	home = home.replaceAll('  ', '');
	home = home.replaceAll('BUF', 'Buffalo');
	home = home.replaceAll('MIA', 'Miami');
	home = home.replaceAll('NE', 'New England');
	home = home.replaceAll('NYJ', 'New York');
	home = home.replaceAll('DAL', 'Dallas');
	home = home.replaceAll('NYG', 'New York');
	home = home.replaceAll('PHI', 'Philadelphia');
	home = home.replaceAll('WSH', 'Washington');
	home = home.replaceAll('BAL', 'Baltimore');
	home = home.replaceAll('CIN', 'Cincinnati');
	home = home.replaceAll('CLE', 'Cleveland');
	home = home.replaceAll('PIT', 'Pittsburgh');
	home = home.replaceAll('CHI', 'Chicago');
	home = home.replaceAll('DET', 'Detriot');
	home = home.replaceAll('GB', 'Green Bay');
	home = home.replaceAll('MIN', 'Minnesota');
	home = home.replaceAll('HOU', 'Houston');
	home = home.replaceAll('IND', 'Indianapolis');
	home = home.replaceAll('JAX', 'Jacksonville');
	home = home.replaceAll('TEN', 'Tennessee');
	home = home.replaceAll('ATL', 'Atlanta');
	home = home.replaceAll('CAR', 'Carolina');
	home = home.replaceAll('NO', 'New Orleans');
	home = home.replaceAll('TB', 'Tampa Bay');
	home = home.replaceAll('DEN', 'Denver');
	home = home.replaceAll('KC', 'Kansas City');
	home = home.replaceAll('LAC', 'Los Angeles');
	home = home.replaceAll('LV', 'Las Vegas');
	home = home.replaceAll('ARI', 'Arizona');
	home = home.replaceAll('LAR', 'Los Angeles');
	home = home.replaceAll('SEA', 'Seattle');
	home = home.replaceAll('SF', 'San Francisco');
	away = away.replaceAll(record, '');
	away = away.replaceAll('How to Watch', '');
	away = away.replaceAll('Ticketmaster', '');
	away = away.replaceAll('CBSCBS CBS', 'CBS');
	away = away.replaceAll('FOXFOX FOX', 'FOX');
	away = away.replaceAll('Prime VideoPrime Video Prime Video', 'Prime Video');
	away = away.replaceAll('Ticketmaster', '');
	away = away.replaceAll('  ', '');
	away = away.replaceAll('BUF', 'Buffalo');
	away = away.replaceAll('MIA', 'Miami');
	away = away.replaceAll('NE', 'New England');
	away = away.replaceAll('NYJ', 'New York');
	away = away.replaceAll('DAL', 'Dallas');
	away = away.replaceAll('NYG', 'New York');
	away = away.replaceAll('PHI', 'Philadelphia');
	away = away.replaceAll('WAS', 'Washington');
	away = away.replaceAll('BAL', 'Baltimore');
	away = away.replaceAll('CIN', 'Cincinnati');
	away = away.replaceAll('CLE', 'Cleveland');
	away = away.replaceAll('PIT', 'Pittsburgh');
	away = away.replaceAll('CHI', 'Chicago');
	away = away.replaceAll('DET', 'Detroit');
	away = away.replaceAll('GB', 'Green Bay');
	away = away.replaceAll('MIN', 'Minnesota');
	away = away.replaceAll('HOU', 'Houston');
	away = away.replaceAll('IND', 'Indianapolis');
	away = away.replaceAll('JAX', 'Jacksonville');
	away = away.replaceAll('TEN', 'Tennessee');
	away = away.replaceAll('ATL', 'Atlanta');
	away = away.replaceAll('CAR', 'Carolina');
	away = away.replaceAll('NO', 'New Orleans');
	away = away.replaceAll('TB', 'Tampa Bay');
	away = away.replaceAll('DEN', 'Denver');
	away = away.replaceAll('KC', 'Kansas City');
	away = away.replaceAll('LAC', 'Los Angeles');
	away = away.replaceAll('LV', 'Las Vegas');
	away = away.replaceAll('ARI', 'Arizona');
	away = away.replaceAll('LAR', 'Los Angeles');
	away = away.replaceAll('SEA', 'Seattle');
	away = away.replaceAll('SF', 'San Francisco');
	allGames.push({date: date, tv: tv, home: home, away: away});
}

//Append data table to the bottom of the page
const table = document.createElement('table');
document.getElementById('main-content').appendChild(table);
allGames.forEach(styleGames);

function styleGames (getGame) {
	const row = document.createElement('tr');
	const cell1 = document.createElement('td');
	const text1 = document.createTextNode(getGame.date);
	cell1.appendChild(text1);
	row.appendChild(cell1);
	const cell2 = document.createElement('td');
	const text2 = document.createTextNode(getGame.tv);
	cell2.appendChild(text2);
	row.appendChild(cell2);
	const cell3 = document.createElement('td');
	row.appendChild(cell3);
	const cell4 = document.createElement('td');
	row.appendChild(cell4);
	const cell5 = document.createElement('td');	
	const text5 = document.createTextNode(getGame.home);
	cell5.appendChild(text5);
	row.appendChild(cell5);
	const cell6 = document.createElement('td');	
	const text6 = document.createTextNode(getGame.away);
	cell6.appendChild(text6);
	row.appendChild(cell6);
	document.getElementById('main-content').getElementsByTagName('table')[0].appendChild(row);
}
