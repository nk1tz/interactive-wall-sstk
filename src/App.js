import React, { Component } from 'react'
import { subscribeToTimer } from './api'
import styled from 'styled-components'
import getGreeting from './greetings'
import ClockIcon from 'react-icons/lib/fa/clock-o'
import LocationIcon from 'react-icons/lib/fa/map-marker'

const FullLayout = styled.div`
  z-index: 1;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
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
  z-index: 3;
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
  text-align: center;
  box-shadow: 0px 0px 64px -6px rgba(0, 0, 0, 0.75);
`

const Bar = styled.div`
  width: 20vw;
  border-bottom: 15px solid white;
  margin: 40px;
`
const H2 = styled.h2`
  font-size: 70px;
  width: 1200px;
  font-weight: 200;
  margin: 0;
`
const H4 = styled.h4`
  font-size: 30px;
  font-weight: 300;
  margin: 0;
`
const H5 = styled.h5`
  font-size: 30px;
  font-weight: 200;
  margin: 0 0 10px 10px;
`
const Container = styled.div`
  display: flex;
  height: 200px;
  width: 600px;
`
const InfoBox = styled.div`
  flex: 1;
  width: 50%;
  margin: 0;
  font-size: 30px;
  font-weight: 300;
`
const InfoBoxLeft = InfoBox.extend`
  text-align: right;
  margin-right: 20px;
`
const InfoBoxRight = InfoBox.extend`
  text-align: left;
  margin-left: 20px;
`
const Span = styled.div`
  display: flex;
`

const PtoContainer = styled.div`
  position: fixed;
  display: flex;
  padding: 10px;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  z-index: 3;
  top: 20px;
  left: 20px;
  width: 15vw;
  background-color: rgba(51, 51, 51, 0.77);
  border: 4px solid #f54336;
  border-radius: 4px;
`

const PtoTitle = styled.h4`
  font-size: 30px;
  font-weight: 300;
  margin: 0;
  color: white;
`
const PtoName = PtoTitle.extend`
  font-weight: 200;
  margin: 5px 0;
  font-size: 25px;
`
const PtoBar = styled.div`
  width: 100px;
  border-bottom: 4px solid white;
  margin: 15px;
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
            src="http://18.233.162.100/video/disco.mp4"
            type="video/mp4"
          />
        </VideoBackgroundElement>
        <OverlayContainer>
          {/* <H2>{getGreeting(new Date())}</H2> */}
          <H2>Good Afternoon</H2>

          <Bar />

          <H4 />
          <Container>
            <InfoBoxLeft>Code rage montreal 2018 demo</InfoBoxLeft>
            <InfoBoxRight>
              <Span>
                <ClockIcon />
                <H5>Friday 11am</H5>
              </Span>
              <Span>
                <LocationIcon />
                <H5>Montreal-1-DJ Booth</H5>
              </Span>
            </InfoBoxRight>
          </Container>

          <PtoContainer>
            <PtoTitle>OUT OF OFFICE</PtoTitle>
            <PtoBar />
            <PtoName>Nathaniel Kitzke</PtoName>
            <PtoName>Ziad Saab</PtoName>
            <PtoName>Matan Kushner</PtoName>
            <PtoName>Tom Esterez</PtoName>
          </PtoContainer>
        </OverlayContainer>
      </FullLayout>
    )
  }
}

export default App
