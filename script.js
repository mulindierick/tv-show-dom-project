//You can edit ALL of the code here
function setup() {

  const allEpisodes = getAllEpisodes();

  document.getElementById("total-episodes").textContent = allEpisodes.length;
   makePageForEpisodes(allEpisodes)

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


window.onload = setup;
