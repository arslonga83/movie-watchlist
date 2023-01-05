const searchBtn = document.querySelector('#search-btn')
const searchBox = document.querySelector('#search')

searchBtn.addEventListener('click', (e) => {
  fetch(`http://www.omdbapi.com/?apikey=4127127c&s=${searchBox.value}`)
  .then(res => res.json())
  .then(data => {
    console.log(data.Search)
    //get movie ids from results
    const searchIds = data.Search.map((movie => {
        return movie.imdbID
    }))
    console.log(searchIds)
    
  searchIds.map((id) => {
    fetch(`http://www.omdbapi.com/?apikey=4127127c&i=${id}&plot=short`)
      .then(res => res.json())
      .then(data => console.log(data))
  })
})
  
})




