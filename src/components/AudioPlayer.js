import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import WaveSurfer from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';


import { PlayButton, Timer } from 'react-soundplayer/components';

class AudioPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: false,
      currentTime: 0,
      speedup: false,
      loadErr: false
  };
  }

  componentDidMount() {
    /**
     * Initialize wavesurfer plugin immediately the component is mounted
     */
    this.$el = ReactDOM.findDOMNode(this)
    this.$waveform = this.$el.querySelector('.audio')
    this.wavesurfer = WaveSurfer.create({
      container: this.$waveform,
      barWidth: 1,
      cursorColor: "rgba(0,0,0,0)",
      cursorWidth: 1,
      normalize: true,
      responsive: true,
      hideScrollbar: true,
      waveColor: 'violet',
      progressColor: 'white'
    }) 

    this.wavesurfer.load(this.props.src);
    this.getSeek();
   
  }
  componentWillUnmount() {
    // clear wavesurfer timeout to prevent memory link warning
    if (this.wavesurfer) clearTimeout(this.wavesurfer);
  }

  getState() {
    let { playing, currentTime } = this.state;
    return { playing, currentTime };
  }

 
 getSeek() {
  
   this.playerInterval = setInterval(() => {
    if (this.wavesurfer) {
      
        const
        // get current audio time
          currentTime = this.wavesurfer.getCurrentTime(),
          { playing } = this.state,
        //get duration of current audio file
          duration = this.wavesurfer.getDuration(),
          toSet = { currentTime };

        if (!this.state.duration && duration != null) {
            toSet.duration = duration;
        }

      // Pause or play audio depending on play status
       if (playing) {
         this.wavesurfer.play();
       }
       else {
         this.wavesurfer.pause();
       }
     
       this.setState(toSet);
    }
   }, 250);
 }

 // increase Playback Rate
 
  render() {
    let { playing, currentTime, duration, speedup } = this.state;
    /**
     * Render Component
     */
    return (
      <div>
        <div className="row ff-audio">
          
           <div className='col-md-2'>
              <div className="row container">
              <div className="col-md-6">
               <PlayButton
                      playing={playing}
                      onTogglePlay={() => this.setState({ playing: !playing })}
                      className="flex-none h2 mr2 button button-transparent button-grow rounded"
                  />
               </div>
               <div className="col-md-6">
                <div className="sb-soundplayer-volume mr2 flex flex-center">
                    <button onClick={() => this.toggleRate()} className="sb-soundplayer-btn sb-soundplayer-volume-btn flex-none h2 button button-transparent button-grow rounded">
                        <img className={speedup ? 'audio-speedup' : ""} src="/pane/speedup.svg" height={35} />
                    </button>
                  </div>
               </div>
              </div>
           </div>
           <div className='col-md-8 '>
              <div className='audio flex-auto'>
              </div>
           </div>
           <div className='col-md-2'>
           <Timer
              className={"timer"}
              duration={duration} // in seconds
              currentTime={currentTime != null ? currentTime : 0}
           />
           </div>
        </div>
        </div>
    )
  }
}

AudioPlayer.defaultProps = {
  src: ""
}
export default  AudioPlayer