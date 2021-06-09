
import React, { useRef, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Link as NavLink } from 'react-router-dom'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import BgImage from '../../components/assets/image/thomyorke.jpg'

import { projectFirestore } from '../../firebase/config';
import useFirestoreUsers from '../../hooks/useFirestoreUsers'

//ChakraUI
import {
  Text, Box, HStack,
} from "@chakra-ui/react"

function CreateProfile(props) {

  //Authentication References and Functions
  const history = useHistory()

  //Profile Preview States
  const [artistName, setArtistName] = useState()
  const [genreTag, setGenreTag] = useState()
  const [description, setDescription] = useState()
  const [imgUrl, setImgUrl] = useState()

  // Auth Check for user name
  const usersCollection = projectFirestore.collection('users')
  useEffect(() => {
    usersCollection.doc(props.match.params.id).get().then(doc => {
      setArtistName(doc.data().artistName)
      setGenreTag(doc.data().genreTag)
      setDescription(doc.data().description)
      setImgUrl(doc.data().imgUrl)
    })
  })

  const { docs } = useFirestoreUsers(props.match.params.id)
  
  return (
    <Box className="signup" minH="100vh" minW="100vw" display="flex" alignItems="center" position="fixed" zIndex="2">
      
      <Box w="100%" h="80vh" m="4%" mt="11vh" display="flex" pos="relative" overflowX="hidden" flexDir="column" border="1px" transition="all .5s" color="white">
        <Box h="100%" w="100%" p="5vw" pos="absolute" overflowY="auto" zIndex="3" bgColor={imgUrl === undefined ? "rgba(10, 10, 10, .6)" : "rgba(10, 10, 10, .4)"}>

          <Text textStyle="h1" color="white">{ artistName }</Text>
          <Text textStyle="h2" color="white">{ genreTag }</Text>
          <Text textStyle="p" color="white" fontWeight="regular" mt="3.5vh" w="22% !important" noOfLines={3}>{ description }</Text>

          <HStack mt="10vh" flexWrap="wrap" justifyContent="space-between" maxH="30vh">
            {docs && docs.map(doc => (
                <Box key={doc.id} className="tile" p="0px" pr="2vw" pb="5.5vh" h="fit-content" m="0 !important">
                  <Box mb="20px" color="white">
                    <Text className="challengeTitle" isTruncated>{doc.songName}</Text>
                    <Text>{doc.artistName}</Text>
                  </Box>
                  <AudioPlayer
                      src={doc.songUrl}
                      showJumpControls={false}
                      customAdditionalControls={[]}
                      layout="horizontal-reverse"
                      muted={false}
                      autoPlay={false}
                      autoPlayAfterSrcChange={false}
                      // ref={player}
                    />
                </Box>
            ))}
          </HStack>
        </Box>
        <Box h="100%" w="100%" pos="absolute" zIndex="2" bg="linear-gradient(to top left, transparent, #000000fa)"></Box>
        <Box pos="absolute" zIndex="1" h="100%" w="100%" opacity=".7" bgImage={imgUrl === undefined ? BgImage : imgUrl} bgRepeat="no-repeat" bgSize="cover" bgPosition="center" filter="grayscale(100%)"></Box>
      </Box>
      
      <Box className="background"></Box>
    </Box>
  );
}

export default CreateProfile;