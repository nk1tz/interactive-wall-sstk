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
      if (this.state.data && this.state.data.time) return
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
    setTimeout(() => this.setState({ data: { time: false } }), 10000)
  }

  state = {
    data: { time: false },
    sources: [
      'http://techslides.com/demos/sample-videos/small.mp4',
      'http://18.233.162.100/video/sstk_wall_dystopia.mp4',
      'http://18.233.162.100/video/sstk_wall_pb.mp4',
      'http://18.233.162.100/video/sstk_wall_sports.mp4',
      'http://18.233.162.100/video/shutterstock_ad.mp4',
      'http://18.233.162.100/video/sstk_wall_fantasy.mp4',
      'http://18.233.162.100/video/sstk_wall_space.mp4',
    ],
    videoIndex: 0,
  }

  setNextVideoSource = () => {
    const { sources, videoIndex } = this.state
    this.setState({
      videoIndex: videoIndex + 1 < sources.length ? videoIndex + 1 : 0,
    })
  }

  render() {
    const { data, sources, videoIndex } = this.state
    console.log(this.state)
    return (
      <FullLayout>
        <VideoBackgroundElement
          autoPlay
          autoBuffer
          muted
          onEnded={() => this.setNextVideoSource()}
          src={sources[videoIndex]}
        />
        {data.time && <Overlay data={data} />}
      </FullLayout>
    )
  }
}

export default App
