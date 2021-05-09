// fetch("http://api.tvmaze.com/people/2/castcredits") // fetch credits
//   .then((response) => response.json())
//   .then((data) => getApiToFetch(data))
//   .catch((error) => console.log(error));
// function getApiToFetch(data) {
//   let tvShow = data[0]._links.show.href;
//   let cast = data[0]._links.character.href;
//   Promise.all([
//     fetch(`${tvShow}`), // fetch name of tv show
//     fetch(`${cast}`), // fetch image and name of cast
//   ])
//     .then((responses) =>
//       Promise.all(responses.map((response) => response.json()))
//     )
//     .then((castData) => castData(castData))
//     .catch((error) => console.log(error));
// }
// function castData(castData) {
//   console.log(castData);
// }
