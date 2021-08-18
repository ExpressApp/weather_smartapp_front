import React, { FunctionComponent, ReactNode } from 'react'

const RoundedButton:FunctionComponent<{children: ReactNode }> = ({ children }) => {
  return <button className="App-button">{children}</button>
}

export default RoundedButton
