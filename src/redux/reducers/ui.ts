import { handleActions } from 'redux-actions'
import { UiState } from '../../types'
import { setMainLoaderActionType, setTopLoaderActionType, SET_MAIN_LOADER, SET_TOP_LOADER } from '../actions/ui'

const initialState: UiState = {
  topLoader: false,
  mainLoader: false,
}

const reducers = {
  [SET_TOP_LOADER]: (state: UiState, { payload: topLoader }: setTopLoaderActionType): UiState => {
    return {
      ...state,
      topLoader,
    }
  },
  [SET_MAIN_LOADER]: (state: UiState, { payload: mainLoader }: setMainLoaderActionType): UiState => {
    return {
      ...state,
      mainLoader,
    }
  },
}

export const ui = handleActions<UiState, any>(reducers, initialState)
