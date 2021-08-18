import { all, fork } from 'redux-saga/effects'
import { rootWeatherAppSaga } from './weatherApp'

function* rootSaga() {
  yield all([
    fork(rootWeatherAppSaga),
  ])
}

export default rootSaga
