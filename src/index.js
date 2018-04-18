import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

injectGlobal`
  html, body {
    box-sizing:border-box;
    margin: 0;
    padding: 0;

    font-family: sans-serif;
  }
`

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
