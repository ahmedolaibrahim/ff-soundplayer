import React, { Component } from 'react';
import AudioPlayer from './components/AudioPlayer';
import demo from './demo.mp3';

class App extends Component {
  render() {
    return (
      
      <div className="audio-section">
         <AudioPlayer src={demo}/>
      </div>
    );
  }
}

export default App;
