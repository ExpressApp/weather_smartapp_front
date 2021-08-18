import { takeEvery, all, put } from 'redux-saga/effects'
import bridge from '../../lib/smartapp-bridge/build/main/index'
import { Weather } from '../../types'
import { HANDLER, TYPES } from '../../constants'
import {
  loadWeatherActionType,
  loadWeatherSuccess,
  LOAD_WEATHER,
  loadCitiesSuccess,
  loadCitiesActionType,
  LOAD_CITIES,
  setOpenSearch,
  LOAD_INITIAL_STATE,
  loadCitySuccess,
} from '../actions/weatherApp'
import { setTopLoader, setMainLoader } from '../actions/ui'

export function* loadWeatherSaga({ payload }: loadWeatherActionType) {
  try {
    yield put(setMainLoader(true))

    const response = yield bridge.send({
      type: TYPES.CURRENT_WEATHER,
      handler: HANDLER.BOTX,
      payload: {
        query: payload,
      },
    })

    const weather: Weather = {
      temp: response?.payload?.weather?.temp_c || response?.payload?.weather?.tempC || null,
      wind: response?.payload?.weather?.wind_kph || response?.payload?.weather?.windKph || null,
      text: response?.payload?.weather?.condition?.text || '',
    }

    yield put(loadWeatherSuccess(weather))
    yield put(loadCitiesSuccess([]))
    yield put(setOpenSearch(false))
  } catch (e) {
    console.error(`loadWeatherSaga error: ${e.message}`)
  } finally {
    yield put(setMainLoader(false))
  }
}

export function* loadCitiesSaga({ payload }: loadCitiesActionType) {
  try {
    yield put(setTopLoader(true))

    const response = yield bridge.send({
      type: TYPES.CITIES_AUTOCOMPLETE,
      handler: HANDLER.BOTX,
      payload: {
        query: payload,
      },
    })

    yield put(loadCitiesSuccess(response.payload.cities))
  } catch (e) {
    console.error(`loadCitiesSaga error: ${e.message}`)
  } finally {
    yield put(setTopLoader(false))
  }
}

export function* loadInitialStateSaga() {
  try {
    yield put(setMainLoader(true))

    bridge.send({
      type: TYPES.READY,
      handler: HANDLER.EXPRESS,
    })

    const response = yield bridge.send({
      type: TYPES.INITIAL_STATE,
      handler: HANDLER.BOTX,
      timeout: 3000,
    })

    if (!response.payload.city) {
      yield put(setOpenSearch(true))
      return
    }

    const weather: Weather = {
      temp: response?.payload?.weather?.temp_c || response?.payload?.weather?.tempC || null,
      wind: response?.payload?.weather?.wind_kph || response?.payload?.weather?.windKph || null,
      text: response.payload.weather.condition.text || '',
    }

    yield put(loadCitySuccess(response.payload.city))
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
