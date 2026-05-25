import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'

const Search = ({ searchTerm, handleSearchChange, tooMany }) => {
  return (
    <div>
      find countries <input value={searchTerm} onChange={handleSearchChange} /><br />
      {tooMany && <p>Too many matches, specify another filter</p>}
    </div>
  )
}

const CountryList = ({ countries, searchTerm, selectedCountry, setSelectedCountry, weather, setWeather }) => {
  // fetch weather when a country is selected (hooks must be called unconditionally)
  useEffect(() => {
    // Decide which country to fetch weather for: explicit selection or single search result
    const targetCountry = selectedCountry ?? (countries.length === 1 ? countries[0] : null)

    if (!targetCountry) {
      setWeather(null)
      return
    }

    console.log('fetching weather for', targetCountry.name.common)
    const capital = targetCountry.capital?.[0] || ''
    const countryCode = targetCountry.cca2?.toLowerCase() || ''

    weatherService
      .getWeather(capital, countryCode)
      .then(weatherData => {
        console.log('weather promise fulfilled')
        setWeather(weatherData)
      })
      .catch(err => {
        console.error('weather fetch error', err)
        setWeather(null)
      })
  }, [selectedCountry, countries, setWeather])

  // 'Show' button was clicked for a country
  // This is where we show the details of that selected country
  if (selectedCountry) {
    console.log('rendering details for', selectedCountry.name.common)

    const capital = selectedCountry.capital?.[0] || ''

    return (
      <div>
        <h1>{selectedCountry.name.common}</h1>
        <span>Capital {selectedCountry.capital}</span><br />
        <span>Area {selectedCountry.area}</span>

        <h2>Languages:</h2>
        <ul>
          {Object.values(selectedCountry.languages).map(language => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        
        <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} />

        <h2>Weather in {capital}</h2>
        {weather ? (
          <>
            <span>Temperature {weather.main.temp} Celsius</span><br />
            <img 
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
              alt={`Weather icon for ${weather.weather[0].description}`} 
            />
            <br />
            <span>Wind {weather.wind.speed} m/s</span>
          </>
        ) : (
          <p>Loading weather...</p>
        )}

      </div>
    )
  }

  if (searchTerm === '') {
    return <p>Type something to search for countries</p>
  }
  
  if (countries.length <= 10 && countries.length > 1) {
    return (
      <div>
        <ul>
          {countries.map(country => (
            <li key={country.name.common}>{country.name.common}
              <button onClick={() => setSelectedCountry(country)}>Show</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  if (countries.length === 1) {
    const country = countries[0]
    console.log('rendering details for', country.name.common)
    const capital = country.capital?.[0] || ''
    return (
      <div>
        <h1>{country.name.common}</h1>
        <span>Capital {country.capital}</span><br />
        <span>Area {country.area}</span>

        <h2>Languages:</h2>
        <ul>
          {Object.values(country.languages).map(language => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />

        <h2>Weather in {capital}</h2>
        {weather ? (
          <>
            <span>Temperature {weather.main.temp} Celsius</span><br />
            <img 
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
              alt={`Weather icon for ${weather.weather[0].description}`} 
            />
            <br />
            <span>Wind {weather.wind.speed} m/s</span>
          </>
        ) : (
          <p>Loading weather...</p>
        )}

      </div>
    )
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const tooMany = countries.length > 10 && searchTerm !== ''
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    console.log('effect')
    countryService
      .getAll()
      .then(initialCountries => {
        console.log('promise fulfilled')
        setCountries(initialCountries)
    })    
  }, [])

  console.log('rendering', countries.length, 'countries')

  const handleSearchChange = (event) => {
    console.log('search term is', event.target.value)
    setSearchTerm(event.target.value)
    const filteredCountries = countries.filter(country =>
      country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
    )
    if (filteredCountries.length > 10) {
      console.log('too many matches, not updating the list')
    } else {
      setCountries(filteredCountries)
    }
  }

  return (
    <div>
      <h2>Countries</h2>
      <Search 
        searchTerm={searchTerm} 
        handleSearchChange={handleSearchChange} 
        tooMany={tooMany} 
      />

      <CountryList 
        countries={countries} 
        searchTerm={searchTerm} 
        selectedCountry={selectedCountry} 
        setSelectedCountry={setSelectedCountry} 
        weather={weather} 
        setWeather={setWeather}
      />

    </div>
  )
}

export default App