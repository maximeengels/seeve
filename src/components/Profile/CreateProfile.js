
import React, { useRef, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Link as NavLink } from 'react-router-dom'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import BgImage from '../../components/assets/image/thomyorke.jpg'
import ImgUpload from './ImgUpload'
import SongUpload from './SongUpload'

import { auth } from "../../firebase/config"
import { projectFirestore } from '../../firebase/config';
import useFirestoreUsers from '../../hooks/useFirestoreUsers'

//ChakraUI
import {
Text, Button, Input, Link, Box, InputGroup, FormControl, FormLabel, VStack, HStack,
Alert, AlertIcon, Textarea, Image
} from "@chakra-ui/react"

function CreateProfile(props) {

  //Authentication References and Functions
  const nameRef = useRef()
  const genreTags = useRef()
  const descRef = useRef()
  const [loading, setLoading] = useState(false)
  const [succes, setSucces] = useState("")
  const history = useHistory()

  //Profile Preview States
  const [uid, setUid] = useState("uid")
  const [artistName, setArtistName] = useState()
  const [imgUrl, setImgUrl] = useState()

  const [songUrl, setSongUrl] = useState()

  const [nameValue, setNameValue] = useState("")
  const [tagValue, setTagValue] = useState("")
  const [descValue, setDescValue] = useState("")
  
  const handleNameChange = (e) => setNameValue(e.target.value)
  const handleTagChange = (e) => setTagValue(e.target.value)
  const handleDescChange = (e) => setDescValue(e.target.value)

  // Auth Check for user name
  const usersCollection = projectFirestore.collection('users')
  useEffect(() => {
    usersCollection.doc(props.match.params.id).get().then(doc => {
      setArtistName(doc.data().artistName)
      setImgUrl(doc.data().imgUrl)
    })
  })

  auth.onAuthStateChanged(user => {
    if (!user) return
    setUid(user.uid)
    
    usersCollection.doc(user.uid).get().then(doc => {
      setArtistName(doc.data().artistName)
      setImgUrl(doc.data().imgUrl)
    })
  })

  const { docs } = useFirestoreUsers(uid)

  //Submit Function
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setLoading(true)

      await usersCollection.doc(uid).set({ genreTag: tagValue, description: descValue }, {merge: true})
      await usersCollection.doc(uid).update({ artistName: nameValue })
      setTimeout(() => {
        history.push("/profile/" + uid)
      }, 2000)
      setSucces("Profile succesfully created!")
    } catch {
    }

    setLoading(false)
  }

  return (
    <Box className="signup" minH="100vh" minW="100vw" display="flex" alignItems="center" position="fixed" zIndex="2">
      <Box w="30%" h="100vh" display="flex" justifyContent="center" flexDir="column" p="4vw" bgColor="gray.500" boxShadow="xl">
        <Text textStyle="h2" color="white" mb="25px" fontSize="1.5em" fontWeight="bold">Create your profile</Text>

        <Box pb="3rem">
          {succes && <Alert status="error" mb={4} color="white" bgColor="green.300"><AlertIcon color="white" /> {succes} </Alert>}
          <FormControl>
            <FormLabel color="gray.50">Artist Name</FormLabel>
            <Input ref={nameRef} color="white" variant="flushed" p="1rem" placeholder={ artistName }
              _placeholder={{color:"gray.200"}} bgColor="gray.400" border="0px" type="text"
              value={nameValue} onChange={handleNameChange} />
          </FormControl>
          <FormControl mt={6}>
            <FormLabel color="gray.50">Add Genre</FormLabel>
            <InputGroup>
              <Input ref={genreTags} color="white" variant="flushed" p="1rem" pr="4.5rem" type="text"
                placeholder="Rock - Alternative Rock" _placeholder={{color:"gray.200"}} bgColor="gray.400" border="0px" 
                value={tagValue} onChange={handleTagChange} />
            </InputGroup>
          </FormControl>
          <FormControl mt={6}>
            <FormLabel color="gray.50">Description</FormLabel>
            <Textarea ref={descRef} resize="none" color="white" variant="flushed" p="1rem" h="100px" type="text" placeholder="I'm an English musician and the main vocalist and songwriter of the rock band Radiohead."
              _placeholder={{color:"gray.200"}} bgColor="gray.400" border="0px" 
              value={descValue} onChange={handleDescChange} />
          </FormControl>
          <HStack mt={10} justifyContent="space-between">
            <ImgUpload uid={uid} imgUrl={imgUrl} artistName={artistName}></ImgUpload>
            <SongUpload uid={uid} songUrl={songUrl} artistName={artistName}></SongUpload>
          </HStack>
        </Box>

        <Box>
          <VStack spacing={5}>
            <Button onClick={handleSubmit} disabled={loading} p="1rem" type="submit" w="100%" bgColor="gray.50" color="gray.500" lineHeight="1"
              _hover={{bgColor:"gray.200", color:"gray.500"}}>
              Save Profile
            </Button>
            <Text textAlign="center" color="white"><Link textStyle="h4" color="blue.100" as={NavLink} to="/">Cancel</Link> </Text>
          </VStack>
        </Box>
      </Box>
      
      <Box w="65%" h="65vh" m="4%" display="flex" pos="relative" overflowX="hidden" flexDir="column" border="1px" transition="all .5s" color={ nameValue === "" && tagValue === "" && descValue === "" ? "gray.300" : "white" }>
        <Box h="100%" w="100%" p="5vw" pos="absolute" overflowY="auto" zIndex="3" bgColor={imgUrl === undefined ? "rgba(10, 10, 10, .6)" : "rgba(10, 10, 10, .4)"}>

          <Text textStyle="h1" color={ nameValue === "" ? "gray.300" : "white" }>{ nameValue === "" ? artistName : nameValue }</Text>
          <Text textStyle="h2" color={ tagValue === "" ? "gray.300" : "white" }>{ tagValue === "" ? "Rock - Alternative Rock" : tagValue }</Text>
          <Text textStyle="p" color={ descValue === "" ? "gray.300" : "white" } fontWeight="regular" mt="3.5vh" w="35% !important" noOfLines={3}>{ descValue === "" ? "I'm an English musician and the main vocalist and songwriter of the rock band Radiohead." : descValue }</Text>

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