const searchBtn = document.querySelector('#search-btn')
const searchBox = document.querySelector('#search')

searchBtn.addEventListener('click', (e) => {
  fetch(`http://www.omdbapi.com/?apikey=4127127c&s=${searchBox.value}`)
  .then(res => res.json())
  .then(data => console.log(data))
})




