import React, { useState, useEffect} from 'react';
import axios from 'axios'

const App = () => {
    const [ countries, setCountries ] = useState([])
    const [ filterCountries, setFilter ] = useState('')

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

const Countries = ({ countries, filter }) => {

  const filteredList = countries.filter(country =>
    country.name.toLowerCase().includes(filter.toLowerCase()))
  
    if (filteredList.length > 10) {
      return (
        <div>Type more letters to search countries</div>
      )

    } else if (filteredList.length === 1) {

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
        </div>
      )
    }

  return (
    filteredList.map(country =>
      <ul key={country.name}>
        {country.name}
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
