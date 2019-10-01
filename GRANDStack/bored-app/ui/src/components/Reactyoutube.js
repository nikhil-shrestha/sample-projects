//https://youtu.be/_nBlN9yp9R8
//https://www.youtube.com/watch?v=_nBlN9yp9R8

import React, { Component } from 'react';
import YouTube from 'react-youtube';
 
class Reactyoutube extends Component {

  videoonReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
    console.log(event.target)
  }

  render() {
    const opts = {
      height: '140',
      width: '290',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
 	const {videoid} = this.props
    return (
      <YouTube
        videoid={videoid}
        opts={opts}
        onReady={this.videoonReady}
      />
    );
  }
 

}

export default Reactyoutube