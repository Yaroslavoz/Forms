const https = require('https')
//const url = '';
const getFilms = (url) => {  
  return new Promise(function(resolve, reject) {  
      https  
        .get(url, (res) => {  
          let data =''
          res.on('data', chunk => data += chunk);
          res.on('end', () => {  
          resolve(JSON.parse(data));
          })  
        })  
        .on("error", function(e) {  
          reject(e);  
          console.error(e); 
        })
      })

  //.then(data => console.log(data))   
}
getFilms("https://swapi.co/api/planets/2/")
  .then((planetInfo) => {
    const filmsData = planetInfo.films.map(it => getFilms(it))
    Promise
      .all(filmsData)
      .then(filmsData => ({ ...planetInfo, films: filmsData}))
      .then(data => console.log(data))
});
  