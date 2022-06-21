import { createSelector } from 'reselect'
import { ApplicationState } from '../../types'

export const getTopLoader = createSelector(
  [(state: ApplicationState) => state.ui.topLoader],
  topLoader => topLoader
)

export const getMainLoader = createSelector(
  [(state: ApplicationState) => state.ui.mainLoader],
  mainLoader => mainLoader
)
