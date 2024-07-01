import { useState, useEffect } from 'react'
import axios from 'axios'

const Details = ({country}) => {
  const flagUrl = country.flags.png
  return(
    <div>
  <h1>{country.name.common}</h1>
  <p>Capital: {country.capital}</p>
  <p>Area: {country.area}</p>
  <p><b>Languages:</b></p>
  <ul> 
  {(Object.values(country.languages)).map((lang, index) => <li key={index}>{lang}</li>)}
  </ul>
  
  <img src={flagUrl}/>
  </div>
  )
}

const Display = ({displayCountries}) => {
  if(displayCountries.length > 10) {
    return (
      'Too many matches, specify another filter'
    )
  } else if(displayCountries.length === 1) {
    const detailsOfCountry = displayCountries[0];
    return (
      <div>
        <Details country={detailsOfCountry}/>
      </div>
    )
  } else {
    return (
      displayCountries.map(country => <p key={country.name.common}>{country.name.common}</p>)
    )
  }
}

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([]) //these are the countries that will be displayed on the screen

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
  .then(response => {
    setCountries(response.data)
  })
})

/* const displayTen = countriesToShow => {
  if (countriesToShow.length >= 10){
    return(countriesToShow.map(country => country.name.common))
  } else {
      'Too many matches, specify another filter'
    
  }
} */

const countriesToShow = value === '' 
? countries 
: countries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()))

  const handleChange = (event) => {
    setValue(event.target.value)
  }
 
  return (
    <div>
       find countries<input value={value} onChange={handleChange} />
       <div> <Display displayCountries={countriesToShow}/>
       </div>
    </div>
  ) 
}
export default App
