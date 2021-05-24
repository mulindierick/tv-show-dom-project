function hideDom() {
  document.getElementById("root").style.display = "flex";
  document.getElementById("search").style.display = "flex";
  document.getElementById("tv-shows").style.display = "none";
  document.getElementById("search-shows").style.display = "none";
  document.getElementById("nav-tvshow-home").style.display = "none";
  document.getElementById("select-show-on-show-page").style.display = "none";
}

// making html pages and options starts here

// make page for all tv shows
function makePageForTvShows(tvShows) {
  let rootElem = document.getElementById("tv-shows");
  rootElem.innerHTML = " ";

  for (let i = 0; i < tvShows.length; i++) {
    // get cast for tv show from api
    // get tv show Id
    let tvShowId = tvShows[i].id;
    fetch(`https://api.tvmaze.com/shows/${tvShowId}?embed=cast`)
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
    
      // rating html
      let ratingHeader = document.createElement("h3");
      let rp = document.createElement("p");
      let gp = document.createElement("p");
      let sp = document.createElement("p");
      let rtp = document.createElement("p");

      let ratingHeaderContent = document.createTextNode("Ratings:");

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

      // ratings
      ratingHeader.textContent = "Ratings:"
      rp.textContent = `Rated: ${tvShows[i].rating.average}`
      gp.textContent = `Genres: ${tvShows[i].genres}`
      sp.textContent = `Status: ${tvShows[i].status}`
      rtp.textContent = `Run time: ${tvShows[i].runtime}`

      statsGrouping.appendChild(rp);
      statsGrouping.appendChild(gp);
      statsGrouping.appendChild(sp);
      statsGrouping.appendChild(rtp);

      header.appendChild(episodeName);
      summaryText.innerHTML = `${htmlRemoved.substr(0, 200)} <span id="read-more">more...</span>`

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
  document.getElementById("search-results-tv").textContent = tvShows.length;
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
      // let episodeSummaryText = document.createTextNode(`${htmlRemoved}`);

      header.appendChild(episodeName);
      header.appendChild(SeasonNumber);
      header.appendChild(episodeNumber);
      summaryText.innerHTML = `${htmlRemoved.substr(0, 200)} <span id="read-more">more...</span>`
      // summaryText.appendChild(episodeSummaryText);

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
      // let episodeSummaryText = document.createTextNode(`${htmlRemoved}`);

      header.appendChild(episodeName);
      header.appendChild(SeasonNumber);
      header.appendChild(episodeNumber);
      summaryText.innerHTML = `${htmlRemoved.substr(0, 200)} <span id="read-more">more...</span>`
      // summaryText.appendChild(episodeSummaryText);

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
      // let episodeSummaryText = document.createTextNode(`${htmlRemoved}`);

      header.appendChild(episodeName);
      header.appendChild(SeasonNumber);
      header.appendChild(episodeNumber);
      // summaryText.appendChild(episodeSummaryText);
      summaryText.innerHTML = `${htmlRemoved.substr(0, 200)} <span id="read-more">more...</span>`

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
