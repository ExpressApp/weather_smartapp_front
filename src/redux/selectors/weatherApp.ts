import { createSelector } from 'reselect'
import { ApplicationState, GetWeatherSelectorResult, Weather } from '../../types'

export const getWeather = createSelector<ApplicationState, Weather, GetWeatherSelectorResult>(
  [(state: ApplicationState) => state.weatherApp.weather],
  weather => {
    return weather
  }
)

export const getCities = createSelector<ApplicationState, [], []>(
  [(state: ApplicationState) => state.weatherApp.cities],
  cities => {
    return cities
  }
)

export const getCity = createSelector<ApplicationState, string | null, string | null>(
  [(state: ApplicationState) => state.weatherApp.city],
  city => {
    return city
  }
)

export const getOpenSearch = createSelector<ApplicationState, boolean, boolean>(
  [(state: ApplicationState) => state.weatherApp.openSearch],
  openSearch => {
    return openSearch
  }
)
