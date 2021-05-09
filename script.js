//You can edit ALL of the code here

function setup() {
  // get tv show cast

  // fetch(`http://api.tvmaze.com/shows/1?embed=cast`)
  //   .then((response) => {
  //     if (response.status >= 200 && response.status <= 299) {
  //       return response.json();
  //     } else {
  //       throw new Error(
  //         `error message: ${response.status} ${response.statusText}`
  //       );
  //     }
  //   })
  //   .then((allCast) => getAllCastFromApi(allCast))
  //   .catch((error) => console.log(error));

  // get all tv shows
  fetch(`http://api.tvmaze.com/shows`)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw new Error(
          `error message: ${response.status} ${response.statusText}`
        );
      }
    })
    .then((allShows) => getAllShowsFromApi(allShows))
    .catch((error) => console.log(error));

  function getAllShowsFromApi(allShows) {
    // display select options for tv shows on shows page
    addTvShowOptionsToShowsPage(allShows);
    // make page for all tv shows
    makePageForTvShows(allShows);
    // display select options for tv shows on episodes page
    addTvShowOptions(allShows);

    //loop through all the tv shows, get the tittle of the tv show and find its episodes
    for (let i = 0; i < allShows.length - 1; i++) {
      // click on tv show to find its episodes by tv show name
      document
        .getElementsByClassName("tv-show-group")
        [i].addEventListener(
          "click",
          findShowEpisodes(i, allShows, getAllEpisodes)
        );
    }

    // search tv shows by select options on the tv shows page page
    document
      .getElementById("select-show-on-show-page")
      .addEventListener(
        "change",
        searchTvShowBySelectOnTvShowPage(allShows, getAllEpisodes)
      );

    // search tv shows by search input tv shows page page
    document
      .getElementById("search-shows")
      .addEventListener(
        "input",
        SearchTvShowBySearchInput(allShows, getAllEpisodes)
      );

    // search tv shows by select options on the episodes page
    document
      .getElementById("select-show")
      .addEventListener(
        "change",
        SearchTvShowBySelectOptionsOnTheEpisodesPage(allShows, getAllEpisodes)
      );
  }

  // searching episodes starts here

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
          getTheEpisodesOfTheSelectedTv(i, displayTvShow, getAllEpisodes)
        );
    }
  };
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
          GetTheEpisodesOfTheSelectedTvShow(i, displayTvShow, getAllEpisodes)
        );
    }
  };
}

function GetTheEpisodesOfTheSelectedTvShow(i, displayTvShow, getAllEpisodes) {
  return function () {
    let selectedValue = document.getElementsByClassName("tv-show")[i]
      .textContent;
    document.getElementById("select-show").value = selectedValue;

    fetch(`https://api.tvmaze.com/shows/${displayTvShow[0].id}/episodes`)
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

function getTheEpisodesOfTheSelectedTv(i, displayTvShow, getAllEpisodes) {
  return function () {
    let selectedValue = document.getElementsByClassName("tv-show")[i]
      .textContent;
    document.getElementById("select-show").value = selectedValue;

    fetch(`https://api.tvmaze.com/shows/${displayTvShow[0].id}/episodes`)
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

    // retrieve all episodes for the clicked tv show
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

function hideDom() {
  document.getElementById("root").style.display = "flex";
  document.getElementById("search").style.display = "flex";
  document.getElementById("tv-shows").style.display = "none";
  document.getElementById("search-shows").style.display = "none";
  document.getElementById("select-show-on-show-page").style.display = "none";
}

// making html pages and options starts here

// add cast to tv shows
// function addCastToTvShow(allShows){
//   return allShows
// };
// let castShows = addCastToTvShow()

// function getAllCastFromApi(allCast, castShows){
//   // let castImage = allCast._embedded.cast[0].person.image.medium
//   // return castImage
//   for (let i = 0; i < castShows.length; i++) {
//     document.getElementsByClassName("tv-show-group")[i].style.color = 'red'
//     // document.getElementsByClassName("tv-show-group")[i].style.backgroundImage = `url('')`
//   }
// }

// function addCastToTvShow(allShows){
//   for (let i = 0; i < allShows.length; i++) {
//     document.getElementsByClassName("tv-show-group")[i].style.color = 'red'
//     // document.getElementsByClassName("tv-show-group")[i].style.backgroundImage = `url('')`
//   }
// }

// make page for all tv shows
function makePageForTvShows(tvShows) {
  let rootElem = document.getElementById("tv-shows");
  rootElem.innerHTML = " ";

  for (let i = 0; i < tvShows.length; i++) {
    console.log(tvShows.length)
    // get cast for tv show from api
    // get tv show Id
    let tvShowId = tvShows[i].id;
    fetch(`http://api.tvmaze.com/shows/${tvShowId}?embed=cast`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw new Error(
            `error message: ${response.status} ${response.statusText}`
          );
        }
      })
      .then((allCast) => getAllCastFromApi(allCast))
      .catch((error) => console.log(error));

    // add cast for tv show to tv shows
    function getAllCastFromApi(allCast) {
        let castImage1 = allCast._embedded.cast[0].person.image.medium;
        let castImage2 = allCast._embedded.cast[1].person.image.medium;
        let castImage3 = allCast._embedded.cast[2].person.image.medium;
        let castImage4 = allCast._embedded.cast[3].person.image.medium;
        document.getElementsByClassName("cast1")[
          i
        ].style.backgroundImage = `url("${castImage1}")`;
        document.getElementsByClassName("cast2")[
          i
        ].style.backgroundImage = `url("${castImage2}")`;
        document.getElementsByClassName("cast3")[
          i
        ].style.backgroundImage = `url("${castImage3}")`;
        document.getElementsByClassName("cast4")[
          i
        ].style.backgroundImage = `url("${castImage4}")`;
      // }
    }

    let episodeGrouping = document.createElement("div");
    episodeGrouping.className = "tv-show-group";
    episodeGrouping.id = i;
    let statsGrouping = document.createElement("section");
    let castGrouping = document.createElement("ul");
    let header = document.createElement("h3");
    header.className = "tv-show";
    if (tvShows[i].image) {
      let mediumImage = document.createElement("img");
      mediumImage.src = tvShows[i].image.medium;
      let summaryText = document.createElement("p");
      let removeHtml = tvShows[i].summary;
      let htmlRemoved = removeHtml.replace(/<\/?[^>]+(>|$)/g, "");
      let episodeName = document.createTextNode(`${tvShows[i].name}`);
      let episodeSummaryText = document.createTextNode(`${htmlRemoved.substr(0, 200)}`);

      // rating html
      let ratingHeader = document.createElement("h3");
      let rp = document.createElement("p");
      let gp = document.createElement("p");
      let sp = document.createElement("p");
      let rtp = document.createElement("p");

      let ratingHeaderContent = document.createTextNode("Ratings:");
      let rated = document.createTextNode(
        `Rated: ${tvShows[i].rating.average}`
      );
      let genres = document.createTextNode(`Genres: ${tvShows[i].genres}`);
      let status = document.createTextNode(`Status: ${tvShows[i].status}`);
      let runTime = document.createTextNode(`Run time: ${tvShows[i].runtime}`);

      // cast html
      let castHeader = document.createElement("h3");
      let cast1 = document.createElement("li");
      let cast2 = document.createElement("li");
      let cast3 = document.createElement("li");
      let cast4 = document.createElement("li");
      cast1.className = "cast1";
      cast2.className = "cast2";
      cast3.className = "cast3";
      cast4.className = "cast4";

      let castHeaderContent = document.createTextNode(`Cast:`);

      castHeader.appendChild(castHeaderContent);

      // castGrouping.appendChild(castHeader)
      castGrouping.appendChild(cast1);
      castGrouping.appendChild(cast2);
      castGrouping.appendChild(cast3);
      castGrouping.appendChild(cast4);

      ratingHeader.appendChild(ratingHeaderContent);
      rp.appendChild(rated);
      gp.appendChild(genres);
      sp.appendChild(status);
      rtp.appendChild(runTime);

      statsGrouping.appendChild(rp);
      statsGrouping.appendChild(gp);
      statsGrouping.appendChild(sp);
      statsGrouping.appendChild(rtp);

      header.appendChild(episodeName);
      summaryText.appendChild(episodeSummaryText);

      episodeGrouping.appendChild(header);
      episodeGrouping.appendChild(mediumImage);
      episodeGrouping.appendChild(summaryText);
      episodeGrouping.appendChild(ratingHeader);
      episodeGrouping.appendChild(statsGrouping);
      episodeGrouping.appendChild(castHeader);
      episodeGrouping.appendChild(castGrouping);

      rootElem.appendChild(episodeGrouping);
    }
  }
  document.getElementById("search-results").textContent = tvShows.length;
}

// make page for episodes
function makePageForEpisodes(episodeList) {
  let rootElem = document.getElementById("root");
  rootElem.innerHTML = " ";

  episodeList.forEach((element) => {
    let episodeGrouping = document.createElement("div");
    let header = document.createElement("h3");
    if (element.image && element.summary) {
      let mediumImage = document.createElement("img");
      mediumImage.setAttribute("src", `${element.image.medium}`);
      let summaryText = document.createElement("p");
      let removeHtml = element.summary;
      let htmlRemoved = removeHtml.replace(/<\/?[^>]+(>|$)/g, "");
      let episodeName = document.createTextNode(`${element.name}`);
      let SeasonNumber = document.createTextNode(` - S0${element.season}`);
      let episodeNumber = document.createTextNode(`E0${element.number}`);
      let episodeSummaryText = document.createTextNode(`${htmlRemoved}`);

      header.appendChild(episodeName);
      header.appendChild(SeasonNumber);
      header.appendChild(episodeNumber);
      summaryText.appendChild(episodeSummaryText);

      episodeGrouping.appendChild(header);
      episodeGrouping.appendChild(mediumImage);
      episodeGrouping.appendChild(summaryText);

      rootElem.appendChild(episodeGrouping);
    } else if (element.summary === null) {
      let mediumImage = document.createElement("img");
      mediumImage.setAttribute(
        "src",
        "https://www.kapa-oil.com/wp-content/plugins/slider/images/slider-icon.png"
      );
      mediumImage.style.width = "100px";
      let summaryText = document.createElement("p");
      element.summary = "No description";
      let removeHtml = element.summary;
      let htmlRemoved = removeHtml.replace(/<\/?[^>]+(>|$)/g, "");
      let episodeName = document.createTextNode(`${element.name}`);
      let SeasonNumber = document.createTextNode(` - S0${element.season}`);
      let episodeNumber = document.createTextNode(`E0${element.number}`);
      let episodeSummaryText = document.createTextNode(`${htmlRemoved}`);

      header.appendChild(episodeName);
      header.appendChild(SeasonNumber);
      header.appendChild(episodeNumber);
      summaryText.appendChild(episodeSummaryText);

      episodeGrouping.appendChild(header);
      episodeGrouping.appendChild(mediumImage);
      episodeGrouping.appendChild(summaryText);

      rootElem.appendChild(episodeGrouping);
    } else {
      let mediumImage = document.createElement("img");
      mediumImage.setAttribute(
        "src",
        "https://www.kapa-oil.com/wp-content/plugins/slider/images/slider-icon.png"
      );
      mediumImage.style.width = "100px";
      let summaryText = document.createElement("p");
      let removeHtml = element.summary;
      let htmlRemoved = removeHtml.replace(/<\/?[^>]+(>|$)/g, "");
      let episodeName = document.createTextNode(`${element.name}`);
      let SeasonNumber = document.createTextNode(` - S0${element.season}`);
      let episodeNumber = document.createTextNode(`E0${element.number}`);
      let episodeSummaryText = document.createTextNode(`${htmlRemoved}`);

      header.appendChild(episodeName);
      header.appendChild(SeasonNumber);
      header.appendChild(episodeNumber);
      summaryText.appendChild(episodeSummaryText);

      episodeGrouping.appendChild(header);
      episodeGrouping.appendChild(mediumImage);
      episodeGrouping.appendChild(summaryText);

      rootElem.appendChild(episodeGrouping);
    }
  });
  document.getElementById("search-results").textContent = episodeList.length;
}

// make options to select tv shows on shows page
function addTvShowOptionsToShowsPage(listOfAllEpisodes) {
  let select = document.getElementById("select-show-on-show-page");
  listOfAllEpisodes.forEach((element) => {
    let option = document.createElement("option");
    let optionContent = document.createTextNode(`${element.name}`);
    option.appendChild(optionContent);
    select.appendChild(option);
  });
}

// make options to select tv shows on episodes page
function addTvShowOptions(listOfAllEpisodes) {
  let select = document.getElementById("select-show");
  listOfAllEpisodes.forEach((element) => {
    let option = document.createElement("option");
    let optionContent = document.createTextNode(`${element.name}`);
    option.appendChild(optionContent);
    select.appendChild(option);
  });
}

// make options to select episodes
function addOptions(listOfAllEpisodes) {
  let select = document.getElementById("select");
  select.innerHTML = " ";
  listOfAllEpisodes.forEach((element) => {
    let option = document.createElement("option");
    if (element.season < 10 && element.number < 10) {
      let optionContent = document.createTextNode(
        `S0${element.season}E0${element.number} - ${element.name}`
      );
      option.appendChild(optionContent);
      select.appendChild(option);
    } else if (element.season > 9 && element.number > 9) {
      let optionContent = document.createTextNode(
        `S${element.season}E${element.number} - ${element.name}`
      );
      option.appendChild(optionContent);
      select.appendChild(option);
    } else if (element.season > 9 && element.number < 10) {
      let optionContent = document.createTextNode(
        `S${element.season}E0${element.number} - ${element.name}`
      );
      option.appendChild(optionContent);
      select.appendChild(option);
    } else {
      let optionContent = document.createTextNode(
        `S0${element.season}E${element.number} - ${element.name}`
      );
      option.appendChild(optionContent);
      select.appendChild(option);
    }
  });
}

window.onload = setup;

// refresh page on click to go back to the tv shows list
document.getElementById("show-page").addEventListener("click", function () {
  window.parent.location = window.parent.location.href;
});
