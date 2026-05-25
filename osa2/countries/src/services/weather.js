import axios from 'axios'

// weather api key from environment variable
const api_key = import.meta.env.VITE_WEATHER_API_KEY

const getWeather = (capital, countryCode) => {
    const cca2 = countryCode.toLowerCase()
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital},${cca2}&APPID=${api_key}&units=metric`)
    return request.then(response => response.data)
}

export default { getWeather }