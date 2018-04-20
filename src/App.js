import React, { Component } from 'react'
import styled from 'styled-components'
import getGreeting from './greetings'
import ClockIcon from 'react-icons/lib/fa/clock-o'
import LocationIcon from 'react-icons/lib/fa/map-marker'
// import SimpleSlider from './SimpleSlider'
import moment from 'moment'

const socket = new WebSocket('ws://18.233.162.100:8080')
socket.onopen = function(event) {
  console.log('Hello Server!')
}

socket.onmessage = function(event) {
  console.log('Server just said hi!', event)
}

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
  height: 150px;
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
  min-width: 300px;
  max-width: 400px;
  display: flex;
  padding: 10px;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  z-index: 3;
  top: 20px;
  left: 20px;
  background-color: rgba(51, 51, 51, 0.77);
  border: 4px solid #f54336;
  border-radius: 4px;
`

const PtoTitle = styled.h4`
  text-align: center;
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
    const socket = new WebSocket('ws://18.233.162.100:8080')
    socket.onopen = function(event) {
      console.log('Hello Server!')
    }
    socket.onmessage = function(event) {
      try {
        const data = JSON.parse(event.data)
        console.log('Server just said hi!', data)
      } catch (e) {
        console.log(e)
      }
    }
  }

  state = {
    data: {
      time: new Date(),
      meetings: [
        {
          name: 'Code rage montreal 2018 demo',
          time: '2018-04-20T13:00:00-04:00',
          location: 'Montreal-1-DJ Booth',
        },
        {
          name: 'Montreal 5 a 7',
          time: '2018-04-20T17:00:00-04:00',
          location: 'Montreal-1-DJ Booth',
        },
        {
          name: 'Restructure entire business unit',
          time: '2018-07-20T11:00:00-04:00',
          location: 'Dark Side of the Moon',
        },
      ],
      ptos: [
        'Sylvain Grande - PTO',
        'Ziad Saab - WFH',
        'Alix - PTO',
        'Anthony - WFH',
        'Alex Roberts - PTO',
        'Tom Esterez - Hawaii',
        'Matan Kushner (WFH)',
        'Fred Charette - WFH',
        'Nic Hillier - Alberta',
      ],
    },
  }

  render() {
    const { data } = this.state
    const meeting = data.meetings[0]
    return (
      <FullLayout>
        <VideoBackgroundElement autoPlay muted loop>
          <source
            src="http://18.233.162.100/video/disco.mp4"
            type="video/ogg"
          />
        </VideoBackgroundElement>
        <OverlayContainer>
          <H2>{getGreeting(new Date(data.time))}</H2>
          <Bar />
          <Container>
            <InfoBoxLeft>{meeting.name}</InfoBoxLeft>
            <InfoBoxRight>
              <Span>
                <ClockIcon />
                <H5>{meeting.time}</H5>
              </Span>
              <Span>
                <LocationIcon />
                <H5>{meeting.location}</H5>
              </Span>
            </InfoBoxRight>
          </Container>
        </OverlayContainer>
        <PtoContainer>
          <PtoTitle>OUT OF OFFICE</PtoTitle>
          <PtoBar />
          {this.state.data.ptos.map(p => <PtoName>{p}</PtoName>)}
        </PtoContainer>
      </FullLayout>
    )
  }
}

export default App
