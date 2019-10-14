import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Text = ({name}) => (
  <p> {name} </p>
)

const Input = ({value, onChange}) => (
  <input value={value} onChange={onChange}/>
)

const Button = ({name, onClick}) => (
  <button onClick={onClick}>{name}</button>
)

const ListElement = ({element}) => (
  <li>{element}</li>
)

const List = ({array}) => (
  <ul>{array.map (element => <ListElement key={element} element={element}/>) }</ul>
)

const Option = ({data, setCurrentCountry}) => (
  <tbody>
    <tr> 
      <td> {data.name} </td> 
      <td> <Button name='Show' onClick={() => setCurrentCountry(data)}/> </td> 
    </tr>
  </tbody>
)

const ListOptions = ({filteredCountriesData, setCurrentCountry}) => (
  <table>{filteredCountriesData.map (data => <Option key={data.name} data={data} setCurrentCountry={setCurrentCountry}/>) }</table>
)

const Country = ({countryData}) => (
  <>
    <h2>{countryData.name}</h2>
    <p>{'Capital: ' + countryData.capital}</p>
    <p>{'Population: ' + countryData.population}</p>
    <h3>{'Languages'}</h3>
    <List array={countryData.languages.map (language => language.name)}/>
    <img src={countryData.flag} alt={'Country flag'} height="100" width="150"/>
  </>
)

const CountryList = ({countriesData, search, setCurrentCountry}) => {
  const filteredCountriesData = countriesData.filter(data => data.name.toLowerCase().includes(search))
  if (filteredCountriesData.length === 0) return <Text name = 'No matches found'/>
  else if (filteredCountriesData.length > 10) return <Text name = 'Too many matches, specify another filter'/>
  else if (filteredCountriesData.length > 1) return <ListOptions filteredCountriesData={filteredCountriesData} setCurrentCountry={setCurrentCountry}/>
  else 
  {
    setCurrentCountry(filteredCountriesData[0])
    return (<> </>)
  }
}

const SearchBar = ({search, setSearch, setCurrentCountry, setWeatherData}) => {
  const handleSearchChange = ({target}) => 
  {
    setCurrentCountry(null)
    setWeatherData(null)
    setSearch(target.value.toLowerCase())
  }
  return (
    <>
      <Text name={'Find countries'}/>
      <Input value={search} onChange={handleSearchChange}/>
    </>
  )
}

const Weather = ({weatherData}) => {
  if (weatherData === null) return(<> </>)
  else return(
    <>
      <p> {'Weather: ' + weatherData.weather} </p>
      <p> {'Minimum: ' + weatherData.temp2m.min} </p>
      <p> {'Maximum: ' + weatherData.temp2m.max} </p>
    </>
  )
}

const CountryData = ({countryData, weatherData}) => (
  <>
    <Country countryData={countryData}/>
    <Weather weatherData={weatherData}/>
  </>
)

const App = () => {
  const [ countriesData, setCountriesData ] = useState([]) 
  const [ weatherData, setWeatherData ] = useState(null) 
  const [ search, setSearch ] = useState('') 
  const [ currentCountry, setCurrentCountry ] = useState(null) 

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => setCountriesData(response.data))
  }, [])

  useEffect(() => {
    if (currentCountry)
    {
      let link = 'http://www.7timer.info/bin/api.pl?lon=' + currentCountry.latlng[0] + '&lat=' + currentCountry.latlng[1] + '&product=civillight&output=json' 
      axios.get(link).then(response => {
        if (response.data !== 'ERR: invalid coordinate') setWeatherData(response.data.dataseries[0])
      })
    }
  }, [currentCountry])

  return (
    <>
      <SearchBar search={search} setSearch={setSearch} setCurrentCountry={setCurrentCountry} setWeatherData={setWeatherData}/>
      {
        (currentCountry === null) ?
          (<CountryList countriesData={countriesData} search={search} setCurrentCountry={setCurrentCountry}/>) :
          (<CountryData countryData={currentCountry} weatherData={weatherData}/>)
      }
    </>
  )
}

export default App