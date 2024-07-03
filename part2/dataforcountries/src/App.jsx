import { useState, useEffect } from 'react';
import axios from 'axios';

const Details = ({ countryToDisplay, showBoolean, buttonClick }) => {
  const flagUrl = countryToDisplay.flags.png
  if (showBoolean) {
    return (
      <div>
        <h1>{countryToDisplay.name.common}</h1>
        <p>Capital: {countryToDisplay.capital}</p>
        <p>Area: {countryToDisplay.area}</p>
        <p><b>Languages:</b></p>
        <ul>
          {(Object.values(countryToDisplay.languages)).map((lang, index) => <li key={index}>{lang}</li>)}
        </ul>
        <img src={flagUrl} alt={`Flag of ${countryToDisplay.name.common}`} />
      </div>
    )
  } else {
    return (
      <div>
        <p>{countryToDisplay.name.common}</p>
        <button onClick={() => buttonClick(countryToDisplay.name.common)}>show</button>
      </div>
    )
  }
}

const Display = ({ displayCountries, buttonClick, showCountry }) => {
  if (displayCountries.length > 10) {
    return 'Too many matches, specify another filter';
  } else if (displayCountries.length === 1) {
    const country = displayCountries[0];
    return (
      <div>
        <Details key={country.name.common} countryToDisplay={country} showBoolean={true} buttonClick={buttonClick} />
      </div>
    );
  } else {
    return (
      displayCountries.map(country =>
        <Details
          key={country.name.common}
          countryToDisplay={country}
          showBoolean={showCountry === country.name.common}
          buttonClick={buttonClick}
        />
      )
    );
  }
};

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountry, setShowCountry] = useState(null)

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = value === ''
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()))

  const handleChange = (event) => {
    setValue(event.target.value)
    setShowCountry(null) // Reset the shown country when the input changes
  }

  const handleButtonClick = (countryName) => {
    setShowCountry(showCountry === countryName ? null : countryName)
  }

  return (
    <div>
      find countries <input value={value} onChange={handleChange} />
      <div>
        <Display displayCountries={countriesToShow} buttonClick={handleButtonClick} showCountry={showCountry} />
      </div>
    </div>
  )
}

export default App;
