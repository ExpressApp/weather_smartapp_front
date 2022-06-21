import { createSelector } from 'reselect'
import { ApplicationState } from '../../types'

export const getWeather = createSelector(
  [(state: ApplicationState) => state.weatherApp.weather],
  weather => {
    return weather
  }
)

export const getCities = createSelector(
  [(state: ApplicationState) => state.weatherApp.cities],
  cities => {
    return cities
  }
)

export const getCity = createSelector(
  [(state: ApplicationState) => state.weatherApp.city],
  city => {
    return city
  }
)

export const getOpenSearch = createSelector(
  [(state: ApplicationState) => state.weatherApp.openSearch],
  openSearch => {
    return openSearch
  }
)
