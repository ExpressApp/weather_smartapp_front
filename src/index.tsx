import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import './styles/index.scss'
import App from './components/App'
import { configureStore } from './redux/configureStore'
import history from './redux/router'

const store = configureStore()

if (module.hot) module.hot.accept()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
