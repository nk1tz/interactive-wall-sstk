import React, { Component } from 'react'
import { subscribeToTimer } from './api'
import styled from 'styled-components'
import ClockIcon from 'react-icons/lib/fa/clock-o'
import LocationIcon from 'react-icons/lib/fa/map-marker'

const FullLayout = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 35vw;
  height: 35vw;
  padding: 2rem;
  border-radius: 50%;
  background: #f54336;
  color: white;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 64px -6px rgba(0, 0, 0, 0.75);
`

const Bar = styled.div`
  width: 20vw;
  border-bottom: 10px solid white;
`

const H1 = styled.h1`
  font-size: 60px;
  margin: 25px;
`
const H2 = styled.h4`
  font-size: 30px;
  margin: 0;
`
const H4 = styled.h4`
  font-size: 20px;
  margin: 50px 0 5px;
`

const InfoBox = styled.span`
  width: 10vw;
`

class App extends Component {
  constructor(props) {
    super(props)
    subscribeToTimer(1000, (err, timestamp) => this.setState({ timestamp }))
    setTimeout(() => window.location.reload(), 10000)
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
          <H2>Hello there,</H2>
          <H1>Jean-Philippe</H1>
          <Bar />
          <H4>Your next meeting:</H4>
          <span>
            <InfoBox>
              {/* <ClockIcon /> */}
              10am
            </InfoBox>
            <InfoBox>
              {/* <LocationIcon /> */}
              Dark Side of the Moon
            </InfoBox>
          </span>
        </OverlayContainer>
      </FullLayout>
    )
  }
}

export default App
