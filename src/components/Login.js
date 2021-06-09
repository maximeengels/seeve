import React, { useRef, useState } from "react"
import { Link as NavLink } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'
import '../App.css'

//ChakraUI
import {
Text, Button, Input, Link, Box, InputGroup, InputRightElement, FormControl, FormLabel, useDisclosure, VStack,
Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
Alert, AlertIcon
} from "@chakra-ui/react"

function Login() {

  //Authentication References and Functions
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()
  // const history = useHistory()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const nameRef = useRef()

  //Password Show/Hide
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  //Login Function
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      // history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <Box className="login">

      <Button onClick={onOpen} className="loginBtn" bgColor="white" borderRadius="0px" lineHeight="1" fontWeight="500" fontSize="md">Login</Button>

      <Modal initialFocusRef={nameRef} isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom" size="lg">
        <ModalOverlay />
        <ModalContent borderRadius="0px" p="1.5rem" bgColor="gray.500" color="white">
          <ModalHeader textStyle="h2 !important" fontWeight="bold" pt="30px" pb="15px">Login to Account</ModalHeader>
          <ModalCloseButton _hover={{bgColor:"gray.400"}}/>
          <ModalBody pb={5}>
            {/* {currentUser.email} */}
            {error && <Alert status="error" mb={4} color="white" bgColor="red.300"><AlertIcon color="white" /> {error} </Alert>}
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input ref={emailRef} variant="flushed" p="1rem" placeholder="thom.yorke@music.com"
                _placeholder={{color:"gray.200"}} bgColor="gray.400" border="0px" type="email" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input ref={passwordRef} variant="flushed" p="1rem" pr="4.5rem" type={show ? "text" : "password" }
                  placeholder="************" _placeholder={{color:"gray.200"}} bgColor="gray.400" border="0px" />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" color="gray.50" bgColor="gray.300" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <VStack spacing={5} w="100%">
              <Button onClick={handleSubmit} disabled={loading} p="1rem" type="submit" w="100%" bgColor="gray.50" color="gray.500" lineHeight="1"
                _hover={{bgColor:"gray.200", color:"gray.500"}}>
                Login
              </Button>
              <Text textAlign="center">Don't have an account yet? <Link textStyle="h4" color="blue.100" as={NavLink} to="/signup" onClick={onClose}>Sign Up</Link> </Text>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Login;