// fetch(`http://api.tvmaze.com/people/1/castcredits`) // fetch credits
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data.length);
//     console.log(data);
//     for (let i = 0; i < data.length; i++) {
//       let tvShow = data[i]._links.show.href;
//       let cast = data[i]._links.character.href;
//       Promise.all([
//         fetch(`${tvShow}`), // fetch name of tv show
//         fetch(`${cast}`), // fetch image and name of cast
//       ])
//         .then((responses) =>
//           Promise.all(responses.map((response) => response.json()))
//         )
//         .then((castData) => {
//           console.log(`${castData[1].name}: ${castData[0].name}`);
//         })
//         .catch((error) => console.log(error));
//     }
//   })
//   .catch((error) => console.log(error));
