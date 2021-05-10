// get all tv shows
fetch(`https://api.tvmaze.com/shows
    `)
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

//use tv show data
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

  // search tv shows by search input on tv shows page page
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

// reload page
document.getElementById("show-page").addEventListener("click", function () {
  window.parent.location = window.parent.location.href;
}); 
