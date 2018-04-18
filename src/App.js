import React, { Component } from 'react'
import { subscribeToTimer } from './api'
import { styled } from 'styled-components'

class App extends Component {
  constructor(props) {
    super(props)
    subscribeToTimer(1000, (err, timestamp) => this.setState({ timestamp }))
  }

  state = {
    timestamp: 'no timestamp yet',
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 'large' }}>
          This is the timer value: {this.state.timestamp}
        </p>
      </div>
    )
  }
}

export default App
