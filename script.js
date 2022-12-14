const apikey = "3265874a2c77ae4a04bb96236a642d2f"

const main = document.getElementById('main')
const form = document.getElementById('form')
const inputSearch  = document.getElementById('search')

const url = (location) => `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`

async function getWeatherByLocation(location) {
  const resp = await fetch(url(location), {
    origin: "cors"
  })

  const respData = await resp.json()

  addWeather(respData)
}

function addWeather(data) {
  const temp = KelvinToCelsius(data.main.temp)

  const weather = document.createElement('div')
  weather.classList.add('weather')

  weather.innerHTML = `
    <small>Está</small> 
    <h2> ${temp}°C </h2>
    <p> em ${inputSearch.value} </p>
  `

  main.appendChild(weather)
}

const KelvinToCelsius = (K) => (K - 273.15).toFixed(2)

form.addEventListener('submit', (ev) => {
  ev.preventDefault()

  const location = inputSearch.value 

  if(location) {
    getWeatherByLocation(location)
  }

})