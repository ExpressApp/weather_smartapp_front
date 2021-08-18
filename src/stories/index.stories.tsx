import React from 'react'
import '../styles/main.scss'
import { storiesOf } from '@storybook/react'
import RoundedButton from '../components/RoundedButton'

storiesOf('RoundedButton', module)
  .add(
    'with text',
    () => (
      <RoundedButton>
        Hello Button
      </RoundedButton>
    ),
    { info: { inline: true } }
  )
  .add(
    'with some emoji',
    () => (
      <RoundedButton>
        Hello Button
        😀 😎 👍 💯
      </RoundedButton>
    ),
    { info: { inline: true } }
  )
