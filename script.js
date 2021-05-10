// get allEpisodes from the api
function getAllEpisodes(allEpisodes) {
  makePageForEpisodes(allEpisodes); // make page for all episodes
  addOptions(allEpisodes); //select options for all episodes

  // search episodes through select
  document
    .getElementById("select")
    .addEventListener("change", searchEpisodesThroughSelect(allEpisodes));

  // search episodes by search bar input
  document.getElementById("total-episodes").textContent = allEpisodes.length;
  document
    .getElementById("text")
    .addEventListener("input", searchEpisodesBySearchInput(allEpisodes));
}

function searchEpisodesThroughSelect(allEpisodes) {
  return function (e) {
    e.preventDefault();

    let selectedEpisode = document.getElementById("select").value;
    let input = selectedEpisode.slice(9, selectedEpisode.length);
    let displayEpisode = allEpisodes.filter((element) => {
      if (element.name.includes(input)) {
        return element;
      }
    });
    makePageForEpisodes(displayEpisode);
  };
}

function searchEpisodesBySearchInput(allEpisodes) {
  return function (e) {
    e.preventDefault();
    let inputValue = document.getElementById("text").value;
    let input = inputValue.toLowerCase();
    let searchResults = allEpisodes.filter((element) => {
      if (
        element.name.toLowerCase().match(input) ||
        element.summary.toLowerCase().match(input)
      ) {
        return element;
      }
    });
    makePageForEpisodes(searchResults);
  };
}

function SearchTvShowBySelectOptionsOnTheEpisodesPage(
  allShows,
  getAllEpisodes
) {
  return function (e) {
    e.preventDefault();
    let selectedValue = document.getElementById("select-show").value;
    let selectedTvShow = allShows.filter((element) => {
      if (element.name === selectedValue) {
        return element;
      }
    });

    // retrieve all episodes
    fetch(`https://api.tvmaze.com/shows/${selectedTvShow[0].id}/episodes`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw new Error(
            `error message: ${response.status} ${response.statusText}`
          );
        }
      })
      .then((allEpisodes) => getAllEpisodes(allEpisodes))
      .catch((error) => console.log(error));
  };
}

//  show on the shows page
function findShowEpisodes(i, allShows, getAllEpisodes) {
  return function () {
    let selectedValue = document.getElementsByClassName("tv-show")[i]
      .textContent;
    document.getElementById("select-show").value = selectedValue;
    let selectedTvShow = allShows.filter((element) => {
      if (element.name === selectedValue) {
        return element;
      }
    });

    // retrieve all episodes for the clicked tv show on tv show home page
    fetch(`https://api.tvmaze.com/shows/${selectedTvShow[0].id}/episodes`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw new Error(
            `error message: ${response.status} ${response.statusText}`
          );
        }
      })
      .then((allEpisodes) => getAllEpisodes(allEpisodes))
      .catch((error) => console.log(error));
    hideDom();
  };
}

function GetTheEpisodesOfTheSearchedTvShow(i, displayTvShow, getAllEpisodes) {
  return function () {
    let selectedValue = document.getElementsByClassName("tv-show")[i]
      .textContent;
    document.getElementById("select-show").value = selectedValue;

    fetch(`https://api.tvmaze.com/shows/${displayTvShow[i].id}/episodes`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw new Error(
            `error message: ${response.status} ${response.statusText}`
          );
        }
      })
      .then((allEpisodes) => getAllEpisodes(allEpisodes))
      .catch((error) => console.log(error));
    hideDom();
  };
}

function SearchTvShowBySearchInput(allShows, getAllEpisodes) {
  return function (e) {
    e.preventDefault();

    let selectedTvShow = document.getElementById("search-shows").value;
    let input = selectedTvShow.toLowerCase();
    let displayTvShow = allShows.filter((element) => {
      if (
        element.name.toLowerCase().match(input) ||
        element.summary.toLowerCase().match(input)
      ) {
        return element;
      }
    });

    // get the episodes of the selected tv show
    makePageForTvShows(displayTvShow);
    for (let i = 0; i < displayTvShow.length; i++) {
      document
        .getElementsByClassName("tv-show-group")
        [i].addEventListener(
          "click",
          GetTheEpisodesOfTheSearchedTvShow(i, displayTvShow, getAllEpisodes)
        );
    }
  };
}

function getTheEpisodesOfTheSelectedTvShowOnTvShowPage(
  i,
  displayTvShow,
  getAllEpisodes
) {
  return function () {
    let selectedValue = document.getElementsByClassName("tv-show")[i]
      .textContent;
    document.getElementById("select-show").value = selectedValue;

    fetch(`https://api.tvmaze.com/shows/${displayTvShow[i].id}/episodes`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw new Error(
            `error message: ${response.status} ${response.statusText}`
          );
        }
      })
      .then((allEpisodes) => getAllEpisodes(allEpisodes))
      .catch((error) => console.log(error));
    hideDom();
  };
}

function searchTvShowBySelectOnTvShowPage(allShows, getAllEpisodes) {
  return function (e) {
    e.preventDefault();

    let selectedTvShow = document.getElementById("select-show-on-show-page")
      .value;
    let displayTvShow = allShows.filter((element) => {
      if (element.name.includes(selectedTvShow)) {
        return element;
      }
    });

    // get the episodes of the selected tv show
    makePageForTvShows(displayTvShow);
    for (let i = 0; i < displayTvShow.length; i++) {
      document
        .getElementsByClassName("tv-show-group")
        [i].addEventListener(
          "click",
          getTheEpisodesOfTheSelectedTvShowOnTvShowPage(
            i,
            displayTvShow,
            getAllEpisodes
          )
        );
    }
  };
}
