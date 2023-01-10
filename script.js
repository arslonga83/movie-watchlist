const searchBtn = document.querySelector('#search-btn')
const searchBox = document.querySelector('#search')
const main = document.querySelector('#main-section') 
let resultsArray = []
let watchlist = localStorage.getItem('watchlist') ? 
  JSON.parse(localStorage.getItem('watchlist')) : 
  []

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
  resultsArray = []
  ids.map((id) => {
    fetch(`http://www.omdbapi.com/?apikey=4127127c&i=${id}&plot=short`)
      .then(res => res.json())
      .then(data => {
        resultsArray.push(data)
      })
      .then(renderResults)
  })
}

function renderResults() {
  let moviesHtml = ''
  resultsArray.map((movie) => {
  moviesHtml += `
  <div class="movie-container">
      <img src=${movie.Poster}>
      <div class="movie-details">
        <div class="movie-title-container">
          <h2>${movie.Title}</h2>
          <i class="fa-solid fa-star fa-xs"></i>
          <p>${movie.imdbRating}</p>
        </div>
        <div class="movie-time-genre">
        <p>${movie.Runtime}</p>
        <p>${movie.Genre}</p>
        <div class="watchlist-icon" >
          <i class="fa-solid fa-circle-plus fa-sm" data-id="${movie.imdbID}"></i>
          <p>Watchlist</p>
        </div>
        </div>
        <p>${movie.Plot}</p>
      </div>
    </div>
  `
  })
  main.innerHTML = moviesHtml
}

document.addEventListener('click', (e) => {
  if (e.target.dataset.id) {
    watchlist.push(e.target.dataset.id)
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
    console.log(JSON.parse(localStorage.getItem('watchlist')))
  }
})
