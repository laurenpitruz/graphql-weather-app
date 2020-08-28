import React, { useState, FormEvent, ChangeEvent, Fragment } from 'react'
import { gql, useQuery } from '@apollo/client';
import Loading from './loading'
import Error from './error'
import { FormControl, Input, InputLabel, Button } from '@material-ui/core'

//weather gql call
const GET_WEATHER = gql`
  query GetWeather($zip: String!) {
    weather(zip: $zip) {
      cityName
      zip
      sunrise
      sunset
      longitude
      latitude
      currentWeather {
        temp
        status
        tempHigh
        tempLow
      }
  	}
  }
`

interface Zip {
  zip: string;
}

export default function App () {
  const [zip, setZip] = useState('06111')
  const [nextZip, setNextZip] = useState('')
  const { data, loading, error } = useQuery(GET_WEATHER, {
    variables: { zip }
  })

  const handleZipChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNextZip(e.currentTarget.value)
  }

  const resetZip = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setZip(`${nextZip}`)
    setNextZip('')
  }

  return (
    <div className="weather-container">
      <form onSubmit={resetZip} className="form">
        <FormControl>
          <InputLabel>Enter Zip Code</InputLabel>
          <Input value={nextZip} onChange={handleZipChange}/>
        </FormControl>
        <Button type="submit">Submit</Button>
      </form>
      {loading && <Loading />}
      {error && <Error />}
      {data &&
        <Fragment>
          <h3>{data.weather.cityName} </h3>
          <small>lon: {data.weather.longitude} | lat: {data.weather.latitude}</small>
          <p>Currently:{data.weather.currentWeather.temp} F & {data.weather.currentWeather.status}</p>
          <p>H: {data.weather.currentWeather.tempHigh}</p>
          <p>L: {data.weather.currentWeather.tempLow}</p>
          <p>Sunrise: {data.weather.sunrise}</p>
          <p>Sunset:{data.weather.sunset}</p>
        </Fragment>
      }
    </div>
  )
}









