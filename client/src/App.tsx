import React, { useState, FormEvent, ChangeEvent } from 'react'
import { gql, useQuery } from '@apollo/client';
import Loading from './loading'
import { FormControl, Input, InputLabel, Button, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

//weather gql call
//notice that this query looks very similar to the queries you would do in the Apollo playground
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

export default function App () {
  //we're going to set a default current zip and also have a nextZip field so we can capture what the user types into our form and reset the zip once they submit
  const [zip, setZip] = useState('06111')
  const [nextZip, setNextZip] = useState('')
  const classes = useStyles()

  //one of the best things about the apollo useQuery hook is it can return multiple statuses based on the query result - it can return an error, a loading state and data, making it easy to then create components conditional on one of these states
  const { data, loading, error } = useQuery(GET_WEATHER, {
    variables: { zip }
  })

  //the below event handler will change our nextZip variable as the user is typing
  const handleZipChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNextZip(e.currentTarget.value)
  }

  //this event handler will make zip the value of nextZip and reset nextZip to an empty string
  const resetZip = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setZip(`${nextZip}`)
    setNextZip('')
  }
  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.header}>My amazing weather app!</Typography>
      <form onSubmit={resetZip} className={classes.form}>
        <FormControl>
          <InputLabel>Enter Zip Code</InputLabel>
          <Input value={nextZip} onChange={handleZipChange}/>
        </FormControl>
        <Button type="submit">Submit</Button>
      </form>
      {loading && <Loading />}
      {error && <Typography variant="body1">Oops there is an error! Try entering a new zip code.</Typography>}
      {data &&
        <Grid container justify="center" direction="column" alignItems="center">
          <Typography variant="h3" className={classes.city}>{data.weather.cityName} </Typography>
          <Typography variant="body2">lon: {data.weather.longitude} | lat: {data.weather.latitude}</Typography>
          <br />
          <Typography variant="body1">Currently: {data.weather.currentWeather.temp} ˚F & {data.weather.currentWeather.status}</Typography>
          <br />
          <Typography variant="body1">High: {data.weather.currentWeather.tempHigh} ˚F | Low: {data.weather.currentWeather.tempLow} ˚F </Typography>
          <br />
          <Typography>Sunrise: {data.weather.sunrise}</Typography>
          <br />
          <Typography>Sunset: {data.weather.sunset}</Typography>
        </Grid>
      }
    </div>
  )
}

//styling
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexFlow: 'nowrap',
    margin: 'auto',
    alignItems: 'center',
    padding: '4em'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexFlow: 'nowrap',
    margin: '1em',
    alignItems: 'center'
  },
  header: {
    background: 'linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)',
    WebkitBackgroundClip: 'text',
    color: 'transparent'
  },
  city: {
    color: 'indigo'
  }
})









