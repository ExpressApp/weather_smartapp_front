import { applyMiddleware, createStore, Store, AnyAction } from 'redux'
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'
import history from './router'
import { ApplicationState } from '../types'

export function configureStore(initialState?: ApplicationState): Store<ApplicationState> {
  const sagaMiddleware = createSagaMiddleware()
  const routerMiddleware = createRouterMiddleware(history)

  // create store
  const store: Store<ApplicationState> = createStore<ApplicationState, AnyAction, any, any>(
    rootReducer,
    initialState, // TODO: assign default value
    composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware))
  )

  sagaMiddleware
    .run(rootSaga)
    .toPromise()
    .catch(e => console.error('Saga error', e))

  return store
}
