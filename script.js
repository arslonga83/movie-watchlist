const searchBtn = document.querySelector('#search-btn')
const searchBox = document.querySelector('#search')
const main = document.querySelector('#main-section') 
let resultsArray = []


searchBtn.addEventListener('click', (e) => {
  fetch(`http://www.omdbapi.com/?apikey=4127127c&s=${searchBox.value}`)
  .then(res => res.json())
  .then(data => {
    const searchIds = data.Search.map((movie => {
        return movie.imdbID
    }))
    getResultsArray(searchIds)
  })
})

function getResultsArray(ids) {
  ids.map((id) => {
    fetch(`http://www.omdbapi.com/?apikey=4127127c&i=${id}&plot=short`)
      .then(res => res.json())
      .then(data => {
        resultsArray.push(data)
      })
  })
  renderResults()
}

function renderResults() {
  let moviesHtml = ''
  resultsArray.map((movie) => {
  moviesHtml += `
  <div class="movie-container">
    <img src=${movie.Poster}>
    <div>
      <div>
        <h2>${movie.Title}</h2>
        <p>${movie.imdbRating}</p>
      </div>
      <div>
      <p>${movie.Runtime}</p>
      <p>${movie.Genre}</p>
      </div>
      <p>${movie.Plot}</p>
    </div>
  </div>
  `
  })
  main.innerHTML = moviesHtml
}




