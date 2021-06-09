
import React, { useState, useEffect, useRef, createRef } from "react"
import { Link as NavLink } from 'react-router-dom'
import useFirestore from '../../hooks/useFirestore'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import AudioBg from '../AudioBg'
// import audioFile from '../../components/assets/audio/mp3/file1.mp3'

import { auth } from "../../firebase/config"
import { projectFirestore } from '../../firebase/config';

import { Text, Box, Link, Button } from "@chakra-ui/react"

function AudioGrid() {
  
  const { docs } = useFirestore('songs')
  // let audioFile;
  const [uid, setUid] = useState("")
  const [artistName, setArtistName] = useState()
  const [audioFile, setAudioFile] = useState()
  const [onPause, setOnPause] = useState(false)
  // const player = createRef()

  // Auth Check for user name
  const usersCollection = projectFirestore.collection('users')
  auth.onAuthStateChanged(user => {
    if (!user) return
    usersCollection.doc(user.uid).get().then(doc => {
      setArtistName(doc.data().artistName)
      setUid(user.uid)
    })
  })

  return (
    <div className="uploadGrid">
      {docs && docs.map(doc => (
      <div key={doc.id} className="tile">
        <Box mb="20px">
        <Link _hover={{textDecor:"none"}} w="fit-content" as={NavLink} to={"/profile/" + doc.artistUid}><Text _hover={{ color:"red.200", cursor:"pointer" }} className="challengeTitle" isTruncated>{doc.songName}</Text></Link>
          <Text>{doc.artistName}</Text>
        </Box>
        {/* <audio className="audio" id={doc.id} controls controlsList="nodownload ">
          <source src={doc.songUrl} type="audio/mpeg"/>
        </audio> */}
        <AudioPlayer
          src={doc.songUrl}
          // onPlay={e => {console.log(player.current.audio.current); setOnPause(false)}}
          // onPlay={e => console.log(e.target.src)}
          onPlay={e => {setAudioFile(e.target.src)} }
          onPause={() => setOnPause(true) }
          showJumpControls={false}
          customAdditionalControls={[]}
          layout="horizontal-reverse"
          muted={true}
          className={doc.id}
          // ref={player}
        />
        {/* <Text>This is an advanced description to help the user understand more about the artist.</Text> */}
      </div>
      ))}
      <Box className="background"></Box>
      {audioFile &&
        <AudioBg audio={audioFile} paused={onPause}></AudioBg>
      }
    </div>
  )
}

export default AudioGrid;