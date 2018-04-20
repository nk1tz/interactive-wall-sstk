import React from 'react'
import Slider from 'react-slick'

class SimpleSlider extends React.Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return <Slider {...settings}>{this.props.children}</Slider>
  }
}

export default SimpleSlider
