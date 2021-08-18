import { createAction } from 'redux-actions'
import { Weather } from '../../types'

export const SET_OPEN_SEARCH = 'SET_OPEN_SEARCH'
export const LOAD_WEATHER = 'LOAD_WEATHER'
export const LOAD_WEATHER_SUCCESS = 'LOAD_WEATHER_SUCCESS'
export const LOAD_CITIES = 'LOAD_CITIES'
export const LOAD_CITIES_SUCCESS = 'LOAD_CITIES_SUCCESS'
export const LOAD_CITY_SUCCESS = 'LOAD_CITY_SUCCESS'
export const LOAD_INITIAL_STATE = 'LOAD_INITIAL_STATE'

export const setOpenSearch = createAction(SET_OPEN_SEARCH, (openSearch: boolean) => openSearch)
export const loadWeather = createAction(LOAD_WEATHER, (name: string) => name)
export const loadWeatherSuccess = createAction(LOAD_WEATHER_SUCCESS, (weather: Weather) => weather)
export const loadCities = createAction(LOAD_CITIES, (city: string) => city)
export const loadCitySuccess = createAction(LOAD_CITY_SUCCESS, (city: string) => city)
export const loadCitiesSuccess = createAction(LOAD_CITIES_SUCCESS, (cities: []) => cities)
export const loadInitialState = createAction(LOAD_INITIAL_STATE)

export type setOpenSearchActionType = ReturnType<typeof setOpenSearch>
export type loadWeatherActionType = ReturnType<typeof loadWeather>
export type loadWeatherSuccessActionType = ReturnType<typeof loadWeatherSuccess>
export type loadCitiesActionType = ReturnType<typeof loadCities>
export type loadCitiesSuccessActionType = ReturnType<typeof loadCitiesSuccess>
export type loadCitySuccessActionType = ReturnType<typeof loadCitySuccess>
export type loadInitialStateActionType = ReturnType<typeof loadInitialState>
