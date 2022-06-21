import { all, put, takeEvery } from 'redux-saga/effects'
import { Bridge as bridge, ready } from '@unlimited/smartapp-sdk'
import { GeneratorFunction, Weather } from '../../types'
import { METHODS } from '../../constants'
import {
  LOAD_CITIES,
  LOAD_INITIAL_STATE,
  LOAD_WEATHER,
  loadCitiesActionType,
  loadCitiesSuccess,
  loadCitySuccess,
  loadWeatherActionType,
  loadWeatherSuccess,
  setOpenSearch,
} from '../actions/weatherApp'
import { setMainLoader, setTopLoader } from '../actions/ui'

export function* loadWeatherSaga({ payload }: loadWeatherActionType): GeneratorFunction {
  try {
    yield put(setMainLoader(true))

    const response = yield bridge?.sendBotEvent({
      method: METHODS.CURRENT_WEATHER,
      params: {
        city: payload,
      },
    })

    const weather: Weather = {
      temp: response?.payload?.result?.weather?.temp_c || response?.payload?.result?.weather?.tempC || null,
      wind: response?.payload?.result?.weather?.wind_kph || response?.payload?.result?.weather?.windKph || null,
      text: response?.payload?.result?.weather?.condition?.text || '',
    }

    yield put(loadWeatherSuccess(weather))
    yield put(loadCitiesSuccess([]))
    yield put(setOpenSearch(false))
  } catch (e) {
    console.error(`loadWeatherSaga error: ${e}`)
  } finally {
    yield put(setMainLoader(false))
  }
}

export function* loadCitiesSaga({ payload }: loadCitiesActionType): GeneratorFunction {
  try {
    yield put(setTopLoader(true))

    const response = yield bridge?.sendBotEvent({
      method: METHODS.CITIES_AUTOCOMPLETE,
      params: {
        city: payload,
      },
    })

    yield put(loadCitiesSuccess(response.payload?.result?.cities || []))
  } catch (e) {
    console.error(`loadCitiesSaga error: ${e}`)
  } finally {
    yield put(setTopLoader(false))
  }
}

export function* loadInitialStateSaga(): GeneratorFunction {
  try {
    yield put(setMainLoader(true))
    yield ready()

    const response = yield bridge?.sendBotEvent({
      method: METHODS.INITIAL_STATE,
      params: {},
      timeout: 3000,
    })

    if (!response.payload?.result?.city) {
      yield put(setOpenSearch(true))
      return
    }

    const weather: Weather = {
      temp: response?.payload?.result?.weather?.temp_c || response?.payload?.result?.weather?.tempC || null,
      wind: response?.payload?.result?.weather?.wind_kph || response?.payload?.result?.weather?.windKph || null,
      text: response.payload?.result?.weather.condition.text || '',
    }

    yield put(loadCitySuccess(response.payload?.result?.city))
    yield put(loadWeatherSuccess(weather))
  } catch (e) {
    console.error('loadInitialStateSaga error: ', e)
    yield put(setOpenSearch(true))
  } finally {
    yield put(setMainLoader(false))
  }
}

export function* rootWeatherAppSaga() {
  yield all([
    takeEvery(LOAD_WEATHER, loadWeatherSaga),
    takeEvery(LOAD_CITIES, loadCitiesSaga),
    takeEvery(LOAD_INITIAL_STATE, loadInitialStateSaga),
  ])
}
