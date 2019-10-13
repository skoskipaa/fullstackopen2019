import React, { useState, useEffect} from 'react';
import axios from 'axios'

const App = () => {
    const [ countries, setCountries ] = useState([])
    const [ filterCountries, setFilter ] = useState('')
    const [ location, setLocation ] = useState('helsinki')
    const [ weather, setWeather ] = useState({})
   
    const handleFilter = (event) => {
      setFilter(event.target.value)
    }

    useEffect(() => {
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          setCountries(response.data)
          console.log(response)
        })
    }, [])

    // APPID removed from code below (XXX)!!! (-> add a valid APPID for the code to work properly)
    // You can get an id from openweathermap.org
    // Replace 'XXX' with id
    useEffect(() => {
      axios
      .get('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=metric&APPID=XXX')
      .then(response => {
          setWeather(response.data)
          console.log(response)
      })

    }, [location])

const Weather = ({ weather }) => {

  let icon = weather.weather[0].icon
  let url = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
  
  return (
    <div>
      <h3>Current weather in {weather.name}:</h3>
      <img src={url} alt="weather icon" />
      <p>Temperature: {weather.main.temp} Celsius</p>
      <p>Conditions: {weather.weather[0].main}</p>
    </div>
  )
}

const Countries = ({ countries, filter }) => {

  const filteredList = countries.filter(country =>
    country.name.toLowerCase().includes(filter.toLowerCase()))
  
    if (filteredList.length > 10) {
      return (
        <div>Type more letters to search countries</div>
      )

    } else if (filteredList.length === 1) {
      setLocation(filteredList[0].capital)
      return (
        <div>
          <h2>{filteredList[0].name}</h2>
          <p>Capital: {filteredList[0].capital}</p>
          <p>Population: {filteredList[0].population}</p>
          <div>
            <p>Languages:</p>
            {filteredList[0].languages.map(item =>
              <li key={item.name}>
                {item.name}
              </li>)}
          </div>
          <br/>
          <img src={filteredList[0].flag} alt="flag" height="200"/>
          <Weather weather={weather} />
        </div>
          
      )
    }

  return (
    filteredList.map(country =>
      <ul key={country.name}>
        {country.name}
        <button onClick={() => setFilter(country.name)}>Show</button>
      </ul>)
  )
}

  return (
    <div>
      <h1>Hello Countries!</h1>
      <div>
        Find a country: <input
                            value={filterCountries}
                            onChange={handleFilter}/>
      </div>
      <Countries countries={countries} filter={filterCountries} />
    </div>
  )
}

export default App;