import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

injectGlobal`
  @font-face {
    font-family: DIN-bold;
    src: url('./fonts/DINNextW1G-Bold') format('ttf');
  }
  @font-face {
    font-family: DIN-regular;
    src: url('./fonts/DINNextW1G-Regular') format('ttf');
  }
  html, body {
    box-sizing:border-box;
    margin: 0;
    padding: 0;

    font-family: sans-serif;
  }

`

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
