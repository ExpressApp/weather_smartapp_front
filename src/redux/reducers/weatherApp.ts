import { handleActions } from 'redux-actions'
import { WeatherAppState } from '../../types'
import {
  LOAD_WEATHER,
  LOAD_WEATHER_SUCCESS,
  loadWeatherSuccessActionType,
  loadWeatherActionType,
  loadCitiesSuccessActionType,
  LOAD_CITIES_SUCCESS,
  SET_OPEN_SEARCH,
  setOpenSearchActionType,
  LOAD_CITY_SUCCESS,
  loadCitySuccessActionType,
} from '../actions/weatherApp'

const initialState: WeatherAppState = {
  cities: [],
  weather: {
    temp: null,
    wind: null,
    text: '',
  },
  city: null,
  openSearch: false,
}

const reducers = {
  [LOAD_WEATHER]: (state: WeatherAppState, { payload: name }: loadWeatherActionType): WeatherAppState => {
    return {
      ...state,
      city: name,
      weather: {
        temp: null,
        wind: null,
        text: '',
      },
    }
  },
  [LOAD_WEATHER_SUCCESS]: (
    state: WeatherAppState,
    { payload: weather }: loadWeatherSuccessActionType
  ): WeatherAppState => {
    return { ...state, weather: { ...weather } }
  },
  [LOAD_CITIES_SUCCESS]: (state: WeatherAppState, { payload }: loadCitiesSuccessActionType): WeatherAppState => {
    return { ...state, cities: payload }
  },
  [LOAD_CITY_SUCCESS]: (state: WeatherAppState, { payload }: loadCitySuccessActionType): WeatherAppState => {
    return { ...state, city: payload }
  },
  [SET_OPEN_SEARCH]: (state: WeatherAppState, { payload }: setOpenSearchActionType): WeatherAppState => {
    return { ...state, openSearch: payload }
  },
}

export const weatherApp = handleActions<WeatherAppState, any>(reducers, initialState)
