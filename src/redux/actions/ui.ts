import { createAction } from 'redux-actions'

export const SET_TOP_LOADER = 'SET_TOP_LOADER'
export const SET_MAIN_LOADER = 'SET_MAIN_LOADER'

export const setTopLoader = createAction(SET_TOP_LOADER, (topLoader: boolean) => topLoader)
export const setMainLoader = createAction(SET_MAIN_LOADER, (mainLoader: boolean) => mainLoader)

export type setTopLoaderActionType = ReturnType<typeof setTopLoader>
export type setMainLoaderActionType = ReturnType<typeof setMainLoader>
