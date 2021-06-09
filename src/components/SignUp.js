import React, { useRef, useState, useEffect } from "react"
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from "react-router-dom"
import { Link as NavLink } from 'react-router-dom'

//ChakraUI
import {
Text, Button, Input, Link, Box, InputGroup, InputRightElement, FormControl, FormLabel, useDisclosure, VStack,
Alert, AlertIcon,
} from "@chakra-ui/react"

function SignUp() {

//Authentication References and Functions
const [uid, setUid] = useState("")
const nameRef = useRef()
const emailRef = useRef()
const passwordRef = useRef()
const passwordConfirmRef = useRef()
const { signup, currentUser } = useAuth()
const [error, setError] = useState("")
const [succes, setSucces] = useState("")
const [loading, setLoading] = useState(false)
const history = useHistory()

//Password Show/Hide
const [show, setShow] = React.useState(false)
const handleClick = () => setShow(!show)

//Submit Function
async function handleSubmit(e) {
  e.preventDefault()
  console.log(emailRef.current.value)
  if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    return setError("Passwords do not match")
  }
  try {
    setError("")
    setSucces("")
    setLoading(true)
    
    await signup(emailRef.current.value, passwordRef.current.value)
    setUid(currentUser.uid)
    history.push("/createprofile/" + uid)
  } catch {
    // setError("Failed to create an account")
    // setSucces("Signup was succesful!")
  }

  setLoading(false)
}

useEffect(() => {
  if(!currentUser) return
  setUid(currentUser.uid)
  setTimeout(() => {
    history.push("/createprofile/" + uid)
  }, 1000)
})

  return (
    <Box className="signup" minH="100vh" display="flex" alignItems="center" position="fixed" zIndex="2">
      {/* <Box w="30vw" h="100vh" display="flex" justifyContent="center" flexDir="column" p="4vw" bgColor="rgba(25, 25, 25, .3)" boxShadow="xl" backdropFilter="blur(7px)"> */}
      <Box w="30vw" h="100vh" display="flex" justifyContent="center" flexDir="column" p="4vw" bgColor="gray.500" boxShadow="xl">
        <Text textStyle="h2" color="white" mb="25px" fontSize="1.5em" fontWeight="bold">Signup for artists</Text>

        <Box pb="3rem">
          {error && <Alert status="error" mb={4} color="white" bgColor="red.300"><AlertIcon color="white" /> {error} </Alert>}
          {succes && <Alert status="error" mb={4} color="white" bgColor="green.300"><AlertIcon color="white" /> {error} </Alert>}
          <FormControl>
            <FormLabel color="gray.50">Artist Name</FormLabel>
            <Input ref={nameRef} className="artistName" color="white" variant="flushed" p="1rem" placeholder="Thom Yorke"
              _placeholder={{color:"gray.200"}} bgColor="gray.400" border="0px" type="text" />
          </FormControl>
          <FormControl mt={6}>
            <FormLabel color="gray.50">Email</FormLabel>
            <Input ref={emailRef} className="email" color="white" variant="flushed" p="1rem" placeholder="thom.yorke@music.com"
              _placeholder={{color:"gray.200"}} bgColor="gray.400" border="0px" type="email" />
          </FormControl>
          <FormControl mt={6}>
            <FormLabel color="gray.50">Password</FormLabel>
            <InputGroup>
              <Input ref={passwordRef} className="password" color="white" variant="flushed" p="1rem" pr="4.5rem" type={show ? "text" : "password" }
                placeholder="************" _placeholder={{color:"gray.200"}} bgColor="gray.400" border="0px" />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" color="gray.50" bgColor="gray.300" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl mt={6}>
            <FormLabel color="gray.50">Password Confirmation</FormLabel>
            <InputGroup>
              <Input ref={passwordConfirmRef} color="white" variant="flushed" p="1rem" pr="4.5rem" type={show ? "text" : "password" }
                placeholder="************" _placeholder={{color:"gray.200"}} bgColor="gray.400" border="0px" />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" color="gray.50" bgColor="gray.300" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>

        <Box>
          <VStack spacing={5}>
            <Button onClick={handleSubmit} disabled={loading} p="1rem" type="submit" w="100%" bgColor="gray.50" color="gray.500" lineHeight="1"
              _hover={{bgColor:"gray.200", color:"gray.500"}}>
              Sign up
            </Button>
            <Text textAlign="center" color="white">Already have an account? <Link textStyle="h4" color="blue.100" as={NavLink} to="/">Login</Link> </Text>
          </VStack>
        </Box>
      </Box>
      
      <Box className="background"></Box>
    </Box>
  );
}

export default SignUp;