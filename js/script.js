const input = document.querySelector('.search__input')
const searchBtn = document.querySelector('.search__btn')
const err = document.querySelector('.search__err')
const cityName = document.querySelector('.weather__city')
const weatherIcon = document.querySelector('.weather__icon')
const weatherStatus = document.querySelector('.weather__text')
const temp = document.querySelector('.weather__temp-number--number')
const humidity = document.querySelector('.weather__humidity-number--number')
const date = document.querySelector('.weather__date')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=c73f36d6638f95471f15e449eeb84d38'
const API_UNITS = '&units=metric'
const ICON_URL = 'http://openweathermap.org/img/wn/'
const ICON_SIZE = '@4x.png'

const getWeather = () => {
	const city = input.value || 'londyn'
	const URL = API_LINK + city + API_KEY + API_UNITS
	axios
		.get(URL)
		.then(res => {
			console.log(res.data)
			err.textContent = ''
			input.value = ''

			cityName.textContent = res.data.name
			temp.textContent = Math.round(res.data.main.temp)
			humidity.textContent = res.data.main.humidity
			weatherStatus.textContent = res.data.weather[0].description

			const iconID = res.data.weather[0].icon
			weatherIcon.src = ICON_URL + iconID + ICON_SIZE
			weatherIcon.alt = res.data.weather[0].description
		})
		.catch(() => (err.textContent = 'Please add correct city name!'))
}

const currentDate = () => {
	const dateContainer = new Date()
	const weekday = dateContainer.toLocaleDateString(undefined, { weekday: 'long' })
	const day = dateContainer.toLocaleDateString(undefined, { day: 'numeric' })
	const month = dateContainer.toLocaleDateString(undefined, { month: 'long' })
	date.textContent = `${weekday}, ${day} ${month}`
}

getWeather()
currentDate()

const enterClickCheck = e => {
	if (e.key === 'Enter') {
		getWeather()
	}
}

input.addEventListener('keyup', enterClickCheck)
searchBtn.addEventListener('click', getWeather)
