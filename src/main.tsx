import { StrictMode } from 'react'
import { isDesktop } from 'react-device-detect'
import ReactDOM from 'react-dom/client'

import 'normalize.css'

import '@styles/reset.css'

import '@styles/variables.scss'

import '@styles/utilities.scss'

import '@styles/index.scss'

import { App } from './App.tsx'

const rootElement: HTMLElement = document.getElementById('root')!

if (isDesktop) {
  rootElement?.classList.add('desktop')
}

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
