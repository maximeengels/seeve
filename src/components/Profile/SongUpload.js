
import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAudio } from '@fortawesome/free-solid-svg-icons'

//ChakraUI
import {
  Text, Box, FormControl
  } from "@chakra-ui/react"

const SongUpload = (props) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = 'audio/mpeg';

  const changeHandler = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
      // setTimeout(() => {
      //   window.location.reload();
      // }, 5000)
    } else {
      setFile(null);
      setError('Please select an mp3 audio file');
    }
  }

  return (
    <FormControl className="audioInputForm">
      <label htmlFor="song-input" className={props.songUrl === "" ? "customUploadBtn" : "fileIsUploadedBtn" } style={{backgroundColor:"#2B2B2B"}}>
        <Text textStyle="h2" fontWeight="medium" mt="80px" fontSize="md" pos="absolute">Upload song</Text>
        <FontAwesomeIcon icon={faFileAudio} style={{transform:"scale(2.5)", marginTop:"-10px"}}></FontAwesomeIcon>
        <input id="song-input" type="file" onChange={changeHandler}/>
      </label>
      <Box className="output">
        { error && <Box className="error">{error}</Box> }
        { file && <Box textStyle="p" fontSize=".8em" pos="absolute" bottom="0">{file.name}</Box> }
        { file && <ProgressBar uid={props.uid} artistName={props.artistName} file={file} setFile={setFile} /> }
      </Box>
    </FormControl>
  )
}

export default SongUpload;