import { createSelector } from 'reselect'
import { ApplicationState } from '../../types'

export const getTopLoader = createSelector<ApplicationState, boolean, boolean>(
  [(state: ApplicationState) => state.ui.topLoader],
  topLoader => topLoader
)

export const getMainLoader = createSelector<ApplicationState, boolean, boolean>(
  [(state: ApplicationState) => state.ui.mainLoader],
  mainLoader => mainLoader
)
