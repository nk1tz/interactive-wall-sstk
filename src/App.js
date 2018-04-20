import React, { Component } from 'react'
import { subscribeToTimer } from './api'
import styled from 'styled-components'

const FullLayout = styled.div`
  height: 100vh;
  width: 100vw;
`

const VideoBackgroundElement = styled.video`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
`

const OverlayContainer = styled.div`
  z-index: 1;
  position: absolute;
  right: 10%;
  top: 20%;
  padding: 2rem;
  border-radius: 0.25rem;
  background: linear-gradient(
    135deg,
    rgba(76, 76, 76, 0.7) 0%,
    rgba(89, 89, 89, 0.7) 12%,
    rgba(102, 102, 102, 0.7) 25%,
    rgba(71, 71, 71, 0.7) 39%,
    rgba(44, 44, 44, 0.7) 50%,
    rgba(0, 0, 0, 0.7) 51%,
    rgba(17, 17, 17, 0.7) 60%,
    rgba(43, 43, 43, 0.7) 76%,
    rgba(28, 28, 28, 0.7) 91%,
    rgba(19, 19, 19, 0.7) 100%
  );
  color: #f8f4ff;
`

class App extends Component {
  constructor(props) {
    super(props)
    subscribeToTimer(1000, (err, timestamp) => this.setState({ timestamp }))
    setTimeout(() => window.location.reload(), 6000)
  }

  state = {
    timestamp: 'no timestamp yet',
  }

  render() {
    return (
      <FullLayout>
        <VideoBackgroundElement autoPlay muted loop>
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/ogg"
          />
        </VideoBackgroundElement>
        <OverlayContainer>
          <p style={{ fontSize: 'large', margin: 0 }}>
            This is the timer value: {this.state.timestamp}
          </p>
        </OverlayContainer>
      </FullLayout>
    )
  }
}

export default App
