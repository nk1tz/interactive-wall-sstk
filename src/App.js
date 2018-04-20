import React, { Component } from 'react'
import styled from 'styled-components'
import Overlay from './Overlay'

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

const transformData = data => ({
  time: new Date(),
  meetings: data.events.map(e => ({
    name: e.summary,
    time: new Date(e.start.dateTime),
    location: cleanLocationString(e.location),
  })),
  ptos: data.ptos.map(p => ({
    person: p.summary,
  })),
})

const cleanLocationString = input => input.substring(0, input.indexOf('['))

class App extends Component {
  constructor(props) {
    super(props)
    const socket = new WebSocket('ws://18.233.162.100:8080')
    socket.onopen = function(event) {
      console.log('Hello Server!')
    }
    socket.onmessage = event => {
      if (this.state.data) return
      try {
        const data = JSON.parse(event.data)
        const transformedData = transformData(data)
        this.setState({ data: transformedData })

        console.log('Server just said hi!', data, transformedData)
      } catch (e) {
        console.log(e)
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const emptyState = {}
    setTimeout(() => this.setState(emptyState), 4000)
  }

  state = {}

  render() {
    const { data } = this.state
    const emptyState = {}
    setTimeout(() => this.setState(emptyState), 4000)
    return (
      <FullLayout>
        <VideoBackgroundElement autoPlay muted loop>
          <source
            src="http://18.233.162.100/video/disco.mp4"
            type="video/ogg"
          />
        </VideoBackgroundElement>
        {data && <Overlay data={data} />}
      </FullLayout>
    )
  }
}

export default App
