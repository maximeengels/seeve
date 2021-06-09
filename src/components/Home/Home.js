
import React from 'react'
import Title from './Title'
// import UploadForm from './../Profile/UploadForm'
import AudioGrid from './AudioGrid'

function Home() {
  return (
    <div className="homeWrapper">
      <Title />
      <AudioGrid />
      <div className="bottomShadow"></div>
    </div>
  )
}

export default Home;