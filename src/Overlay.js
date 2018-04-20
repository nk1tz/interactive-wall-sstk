import React, { Component } from 'react'
import styled from 'styled-components'
import getGreeting from './greetings'
import ClockIcon from 'react-icons/lib/fa/clock-o'
import LocationIcon from 'react-icons/lib/fa/map-marker'
import moment from 'moment'
import './overlay.css'

const OverlayContainer = styled.div`
  z-index: 10;
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
  animation: fadein 2s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
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
  font-weight: 500;
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
  padding: 40px 10px;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  z-index: 3;
  top: 20px;
  left: 20px;
  background-color: rgba(51, 51, 51, 0.77);
  border-radius: 4px;
`

const PtoTitle = styled.h4`
  text-align: center;
  font-size: 30px;
  font-weight: 500;
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

class Overlay extends Component {
  state = {}

  render() {
    const { data } = this.props
    return (
      <React.Fragment>
        <OverlayContainer key={data.time}>
          <H2>{getGreeting(new Date(data.time))}</H2>
          <Bar />
          <Container>
            <InfoBoxLeft>{data.meetings[0].name}</InfoBoxLeft>
            <InfoBoxRight>
              <Span>
                <ClockIcon size={40} />
                <H5>{moment(data.meetings[0].time).calendar()}</H5>
              </Span>
              <Span>
                <LocationIcon size={60} />
                <H5>{data.meetings[0].location}</H5>
              </Span>
            </InfoBoxRight>
          </Container>
        </OverlayContainer>
        {data.ptos &&
          data.ptos.length && (
            <PtoContainer>
              <PtoTitle>Out of office</PtoTitle>
              <PtoBar />
              {data.ptos.map(p => <PtoName>{p.person}</PtoName>)}
            </PtoContainer>
          )}
      </React.Fragment>
    )
  }
}

export default Overlay
