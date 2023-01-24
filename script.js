const apikey = "3265874a2c77ae4a04bb96236a642d2f"

const main = document.getElementById('main')
const form = document.getElementById('form')
const inputSearch  = document.getElementById('search')

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`

async function getWeatherByLocation(city) {
  const resp = await fetch(url(city), {
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

  main.innerHTML = ''

  main.appendChild(weather)
}

const KelvinToCelsius = (K) => (K - 273.15).toFixed(2)

form.addEventListener('submit', (ev) => {
  ev.preventDefault()

  const city = inputSearch.value 

  if(city) {
    getWeatherByLocation(city)
  }

})