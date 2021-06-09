
import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImage } from '@fortawesome/free-solid-svg-icons'

//ChakraUI
import {
  Text, Box, FormControl
  } from "@chakra-ui/react"

const ImgUpload = (props) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = 'image/png, image/jpeg';

  const changeHandler = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Please select a jpeg/png image file');
    }
  }

  return (
    <FormControl className="audioInputForm" bgImage={ props.imgUrl } bgRepeat="no-repeat" bgSize="cover" bgPosition="center">
      <label htmlFor="image-input" className={props.songUrl === "" ? "customUploadBtn" : "fileIsUploadedBtn"}>
        <Text textStyle="h2" fontWeight="medium" mt="80px" fontSize="md" pos="absolute">{props.imgUrl == "" ? "Upload Image" : "Change Image" }</Text>
        <FontAwesomeIcon icon={faFileImage} style={{transform:"scale(2.5)", marginTop:"-10px"}}></FontAwesomeIcon>
        <input id="image-input" type="file" onChange={changeHandler}/>
      </label>
      <Box className="output">
        { error && <Box className="error">{error}</Box> }
        { file && <Box w="80%" textStyle="p" fontSize=".7em" pos="absolute" bottom="0">{file.name}</Box> }
        { file && <ProgressBar uid={props.uid} file={file} setFile={setFile} /> }
      </Box>
    </FormControl>
  )
}

export default ImgUpload;