const nfl = ['Arizona Cardinals','Atlanta Falcons','Baltimore Ravens','Buffalo Bills','Carolina Panthers','Chicago Bears','Cincinnati Bengals','Cleveland Browns','Dallas Cowboys','Denver Broncos','Detroit Lions','Green Bay Packers','Houston Texans','Indianapolis Colts','Jacksonville Jaguars','Kansas City Chiefs','Las Vegas Raiders','Los Angeles Chargers','Los Angeles Rams','Miami Dolphins','Minnesota Vikings','New England Patriots','New Orleans Saints','New York Giants','New York Jets','Philadelphia Eagles','Pittsburgh Steelers','San Francisco 49ers','Seattle Seahawks','Tampa Bay Buccaneers','Tennessee Titans','Washington Commanders'];

/*
For You (xfinity.com/stream)
scramble Just Recorded & Recently Watched
*/

if (location.href.endsWith('stream')) {

  //Remove Featured Row
  document.getElementById('featuredRow').remove();

  Array.from(document.getElementsByClassName('carousel-item-container')).forEach(checkShows);
  
  /*
  Loop through all shows in the Just Recorded and Recently Watched carousels
  Scramble titles and images if content is found
  */ 
  function checkShows (show) {
    if (show.getElementsByClassName('carousel-label')[0]) {
      nfl.forEach(checkNFL);
    }
    
    function checkNFL (team) {
      let showTitle = show.getElementsByClassName('carousel-label')[0].textContent;
      
      if (showTitle.includes(team)) {
        show.getElementsByClassName('carousel-label')[0].textContent = randomGame(10) + ' vs ' + randomGame(10);
        show.getElementsByClassName('tv-image')[0].setAttribute('src','https://edge.myriad-gn-xcr.xcr.comcast.net/select/image?entityId=7082181797443028112&width=320&ratio=4x3');
        console.log('Check Show SUCCESS');
      }
    }
  }
}

/*
Live TV > All Channels (for recording) (xfinity.com/stream/listings)
Keep console window high!
Scroll to correct channel/time block first
*/

if (location.href.endsWith('stream/listings')) {
  Array.from(document.getElementsByClassName('tv-grid-row')).forEach(checkShows);

  /*
  Loop through all shows for the selected channel/time block
  Scramble titles and images if game is found
  Add open show details event listener if game is found
  */
  function checkShows (show) {
    if (show.getElementsByClassName('grid-program-title')[0]) {
      nfl.forEach(checkNFL);
    }
    
    function checkNFL (team) {
      let showTitle = show.getElementsByClassName('grid-program-title')[0].textContent;
      if (showTitle.includes(team)) {
        console.log('Check Show SUCCESS');
        show.getElementsByClassName('grid-program-title')[0].textContent = randomGame(10) + ' vs ' + randomGame(10);
        show.getElementsByClassName('grid-program-title')[0].parentElement.setAttribute('title',randomGame(10) + ' vs ' + randomGame(10));
        show.getElementsByClassName('grid-program-title')[0].parentElement.addEventListener('click',openShow);
      }
    }
  }

  /*
  Wait for DOM changes
  Scramble title and remove description and image on details screen
  Add record show event listener
  */
  function openShow() {
    const openObserver = new MutationObserver((openMutations,openObs) => {
      const showDetails = document.getElementById('collapse');
      if (showDetails) {
        console.log('Open Show SUCCESS');
        showDetails.getElementsByTagName('h2')[0].textContent = randomGame(10) + ' vs ' + randomGame(10);
        showDetails.getElementsByTagName('tv-metadata-primary')[0].getElementsByTagName('section')[0].textContent = randomGame(10) + ' vs ' + randomGame(10);
        showDetails.getElementsByClassName('tv-image')[0].remove();
        document.getElementById('recordButton').getElementsByTagName('button')[0].addEventListener('click',recordShow);
        
        openObs.disconnect();
      }
    });
    openObserver.observe(document.getElementById('tvRouter'), {
      childList: true,
      subtree: true
    });
  }

  /*
  Wait for DOM changes
  Remove title and image on record screen
  Add confirm show event listener
  */
  function recordShow() {
    const recordObserver = new MutationObserver((recordMutations,recordObs) => {
      let recordDetails = document.getElementById('recordingOverlay');
      if (recordDetails.getElementsByClassName('tv-image').length == 0) {
        recordDetails = document.getElementById('recordSingleOverlay');
      }
      if (recordDetails) {
        console.log('Record Show SUCCESS');
        recordDetails.getElementsByTagName('h2')[0].remove();
        recordDetails.getElementsByClassName('tv-image')[0].remove();
        document.getElementById('recordSingleButton').getElementsByTagName('button')[0].addEventListener('click',confirmShow);
        
        if (!recordDetails.getElementsByTagName('h2')[0]) {
          recordObs.disconnect();
        }
      }
    });
    recordObserver.observe(document, {
      childList: true,
      subtree: true
    });
  }

  /*
  Wait for DOM changes
  Remove title and image on confirmation screen
  */
  function confirmShow() {
    const confirmObserver = new MutationObserver((confirmMutations,confirmObs) => {
      const confirmDetails = document.getElementById('recordSingleConfirmation');
      if (confirmDetails) {
        console.log('Confirm Show SUCCESS');
        confirmDetails.getElementsByTagName('h2')[0].remove();
        confirmDetails.getElementsByTagName('tv-poster')[0].remove();
        
        confirmObs.disconnect();
      }
    });
    confirmObserver.observe(document, {
      childList: true,
      subtree: true
    });
  }
}

/*
Saved > Recording (xfinity.com/stream/recordings)
Keep console window high!
Scroll down a little to load listings
*/

if (location.href.includes('stream/recordings')) {
  Array.from(document.getElementsByTagName('tv-list-row')).forEach(checkShows);

  function checkShows (show) {
    if (show.getElementsByTagName('h1')[0]) {
      nfl.forEach(checkNFL);
    }
   
    function checkNFL (team) {
      let showTitle = show.getElementsByTagName('h1')[0].textContent;
      if (showTitle.includes(team)) {
        show.getElementsByTagName('h1')[0].textContent = randomGame(10) + ' vs ' + randomGame(10);
        console.log('Check Show SUCCESS');
      }
    }
  }
}

/*
Saved > Scheduled (xfinity.com/stream/scheduled)
Keep console window high!
Scroll down a little to load listings
*/

if (location.href.endsWith('stream/scheduled')) {
  Array.from(document.getElementsByTagName('tv-list-row-group')).forEach(checkShows);

  function checkShows (show) {
    if (show.getElementsByTagName('h1')[0]) {
      nfl.forEach(checkNFL);
    }
   
    function checkNFL (team) {
      let showTitle = show.getElementsByTagName('h1')[0].textContent;
      if (showTitle.includes(team)) {
        show.getElementsByTagName('h1')[0].textContent = randomGame(10) + ' vs ' + randomGame(10);
        console.log('Check Show SUCCESS');
      }
    }
  }
}

function randomGame(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
