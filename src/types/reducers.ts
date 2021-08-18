import { RouterState } from 'connected-react-router'

export interface Weather {
  temp: number | null
  wind: number | null
  text: string | ''
}

export interface WeatherAppState {
  cities: []
  weather: Weather
  city: string | null
  openSearch: boolean
}
export interface ApplicationState {
  weatherApp: WeatherAppState
  ui: UiState
  router: RouterState
}

export interface City {
  id: string
  name: string
}

export interface UiState {
  topLoader: boolean
  mainLoader: boolean
}
