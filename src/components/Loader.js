
import React from 'react';
import LoadingVid from './assets/video/loadingVideo.mp4'

const Loader = () => {
  return (
    <video autoPlay className="loadingVideo">
      <source src={LoadingVid} type="video/mp4"/>
    </video>
  )
}

export default Loader;