//You can edit ALL of the code here
function setup() {

  // retrieve all episodes
  const allEpisodes = getAllEpisodes();

  // display opisodes
  makePageForEpisodes(allEpisodes)

  // display select options for the episodes
  addOptions(allEpisodes)

    // display selected episode
  document.getElementById("select").addEventListener("change", function(e){
    e.preventDefault();

    let selectedEpisode = document.getElementById("select").value;
    let input = selectedEpisode.slice(9, selectedEpisode.length);
    console.log(input)
    let displayEpisode = allEpisodes.filter(element =>{
      if (element.name.includes(input)) {
        return element;
      }
    })
  makePageForEpisodes(displayEpisode)
  })


  // search opisodes
  document.getElementById("total-episodes").textContent = allEpisodes.length;

  document.getElementById("text").addEventListener("input", function(e){
    e.preventDefault()
    let inputValue = document.getElementById("text").value;
    let input = inputValue.toLowerCase();
    let results = allEpisodes.filter(element => {
    if (element.name.toLowerCase().match(input) || element.summary.toLowerCase().match(input)) {
      return element;
    }
    })
    makePageForEpisodes(results)
  })

}


  // make page for episodes
function makePageForEpisodes(episodeList) {

  let rootElem = document.getElementById("root");
  rootElem.innerHTML = " ";

  episodeList.forEach(element => { 
    let episodeGrouping = document.createElement("div")
    let header = document.createElement("h3");
    let mediumImage = document.createElement("img")
    mediumImage.setAttribute("src", `${element.image.medium}`);
    let summaryText = document.createElement("p")
    let removeHtml = element.summary;
    let htmlRemoved = removeHtml.replace(/<\/?[^>]+(>|$)/g, "");
    let episodeName = document.createTextNode(`${element.name}`);
    let SeasonNumber = document.createTextNode(` - S0${element.season}`);
    let episodeNumber = document.createTextNode(`E0${element.number}`);
    let episodeSummaryText = document.createTextNode(`${htmlRemoved}`);


    header.appendChild(episodeName)
    header.appendChild(SeasonNumber)
    header.appendChild(episodeNumber)
    summaryText.appendChild(episodeSummaryText)

    episodeGrouping.appendChild(header)
    episodeGrouping.appendChild(mediumImage)
    episodeGrouping.appendChild(summaryText)
    

    rootElem.appendChild(episodeGrouping)
  });
  document.getElementById("search-results").textContent = episodeList.length;
}

// make options to select opisodes
function addOptions(listOfAllEpisodes) {
  let select = document.getElementById("select")
  listOfAllEpisodes.forEach(element => {
    let option = document.createElement("option");
    if (element.number < 10) {
      let optionContent = document.createTextNode(`S0${element.season}E0${element.number} - ${element.name}`);
      option.appendChild(optionContent)
      select.appendChild(option)
    }else{
      let optionContent = document.createTextNode(`S0${element.season}E${element.number} - ${element.name}`);
      option.appendChild(optionContent)
      select.appendChild(option)
    }
  })
}

window.onload = setup;
