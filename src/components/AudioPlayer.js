import React, { Component } from 'react';


class AudioPlayer extends Component {
  render () {
    return (
      <div>
        AudioPlayer Component
      </div>
    )
  }
}

AudioPlayer.defaultProps = {
  src: ""
}
export default  AudioPlayer