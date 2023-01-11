
const main = document.querySelector('#main-section') 
let resultsArray = []

let watchlistIds = JSON.parse(localStorage.getItem('watchlist'))

if (watchlistIds) {
  getResultsArray(watchlistIds)
}

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
  main.innerHTML = getWatchlistHtml()
}

function getWatchlistHtml() {
  let watchlistHtml = ''
  resultsArray.map((movie) => {
  watchlistHtml += `
  <div class="movie-container" id=${movie.imdbID}>
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
          <i class="fa-solid fa-circle-minus fa-sm" data-id="${movie.imdbID}"></i>
          <p>Remove</p>
        </div>
        </div>
        <p>${movie.Plot}</p>
      </div>
    </div>
  `
  })
  return watchlistHtml
}

document.addEventListener('click', (e) => {
  if (e.target.dataset.id) {
    watchlistIds = watchlistIds.filter(id => id != e.target.dataset.id)
    console.log(watchlistIds)
    localStorage.setItem('watchlist', JSON.stringify(watchlistIds))
    document.getElementById(e.target.dataset.id).remove()
  }
})
