import React from 'react'
import { useSelector } from 'react-redux'
import './MainLoader.scss'
import { getMainLoader } from '../../../redux/selectors/ui'
import { ApplicationState } from '../../../types/reducers'

export default function MainLoader() {
  const mainLoader = useSelector<ApplicationState, boolean>(getMainLoader)

  if (!mainLoader) return null

  return (
    <div className="main-loader">
      <div className="main-loader__spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
