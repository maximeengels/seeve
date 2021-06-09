
import React, { useState, useEffect } from "react"
import Home from './components/Home/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import CreateProfile from './components/Profile/CreateProfile'
import Profile from './components/Profile/Profile'
import BgVideo from './components/assets/video/bgVideo2.mp4'
import Loader from './components/Loader'
// import AudioBg from './components/AudioBg'

import { Link, Box, Button, HStack, VStack, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react"
import { useHistory, BrowserRouter as Router, Route } from "react-router-dom"
import { Link as NavLink } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

import { auth } from "./firebase/config"
import { projectFirestore } from './firebase/config';
import './App.css'

function App() {
  // console.clear()
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  const [uid, setUid] = useState("")
  const [artistName, setArtistName] = useState()
  const [isArtist, setIsArtist] = useState(true)
  const yesArtist = () => setIsArtist(true)
  const noArtist = () => setIsArtist(false)
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false)
      }, 4000)
    }
  }, [loading])

  const helloHandeler = () => {
    setLoading(!loading)
    setTimeout(() => {
      setLoading(!loading)
      setShow(!show)
    }, 4000)
  }

  if (loading) return <Loader />

  // Auth Check for user name
  const usersCollection = projectFirestore.collection('users')
  auth.onAuthStateChanged(user => {
    // console.log(user.uid)
    if (!user) return
    usersCollection.doc(user.uid).get().then(doc => {
      setArtistName(doc.data().artistName)
      setUid(user.uid)
    })
  })
  
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/")
      setTimeout(() => {
        window.location.reload();
      }, 2000)
    } catch {
      setError("Failed to log out")
    }
  }
  
  const authButtons = isArtist && currentUser
  ? <HStack w="fit-content">
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton _hover={{ color:"gray.100"}} fontWeight="500" border="1px" color="white" bgColor="transparent !important" borderRadius="0px" isActive={isOpen} as={Button}>
              { artistName }
            </MenuButton>
            <MenuList w="fit-content" bgColor="gray.500" color="white" p="5px" borderRadius="0px" border="0px">
              <Link _hover={{textDecor:"none"}} w="fit-content" as={NavLink} to={"/profile/" + uid}><MenuItem _focus={{bgColor:"gray.400", color:"gray.100"}} _hover={{bgColor:"gray.400", color:"gray.100"}}>Profile</MenuItem></Link>
              <MenuDivider m="0" color="gray.300" />
              <Link onClick={ handleLogout } _hover={{textDecor:"none"}} w="fit-content" as={NavLink} to="/"><MenuItem _hover={{bgColor:"gray.400", color:"gray.100"}}>Log Out</MenuItem></Link>
            </MenuList>
          </>
        )}
      </Menu>
    </HStack>
  : isArtist && currentUser === null ? <Login></Login> : "";

  return (
    <Router>
      <Box className="app">
        {!show &&  
          <VStack h="100vh" w="100vw" className="headers" textAlign="center" alignItems="center" justifyContent="center" m="0">
            <h1 style={{fontSize:"2rem", paddingBottom:"50px"}}>Enter Seeve</h1>
            <HStack justifyContent="space-evenly" p="0 30%" w="100%">
              <Button onClick={() => { helloHandeler(); noArtist();}} bgColor="transparent" border="1px" color="white" _hover={{bgColor:"white", color:"gray.500"}} w="200px" h="200px" zIndex="999">Listener</Button>
              <Button onClick={() => { helloHandeler(); yesArtist();}} bgColor="transparent" border="1px" color="white" _hover={{bgColor:"white", color:"gray.500"}} w="200px" h="200px" zIndex="999">Artist</Button>
            </HStack>
          </VStack>
        }
        {show && 
          <Box className="appWrap">
            <Box className="header">
              <Link as={NavLink} to="/" w="fit-content">
                <svg className="logoSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 346.71 109.47">
                    <path
                      d="M166.12,65a4.59,4.59,0,0,0-2.23-4.13,23.43,23.43,0,0,0-7.4-2.5,37.8,37.8,0,0,1-8.63-2.76Q140.27,52,140.27,45a12,12,0,0,1,4.92-9.76q4.92-3.91,12.51-3.92,8.09,0,13.08,4a12.71,12.71,0,0,1,5,10.39H165.62a6.25,6.25,0,0,0-2.16-4.86,8.35,8.35,0,0,0-5.76-1.94,8.94,8.94,0,0,0-5.44,1.54,4.86,4.86,0,0,0-2.11,4.13,4.1,4.1,0,0,0,2,3.63q2,1.29,7.93,2.61A37.36,37.36,0,0,1,169.4,54a13.37,13.37,0,0,1,5,4.35,11.21,11.21,0,0,1,1.64,6.18,11.76,11.76,0,0,1-5,9.86q-5.06,3.78-13.23,3.77a23.25,23.25,0,0,1-9.88-2,16.33,16.33,0,0,1-6.76-5.5,13.06,13.06,0,0,1-2.42-7.55h9.85a7.12,7.12,0,0,0,2.71,5.52A10.5,10.5,0,0,0,158,70.54,10.21,10.21,0,0,0,164,69,4.7,4.7,0,0,0,166.12,65Z"
                      fill="#fff" />
                    <path
                      d="M202.4,78.13q-9.63,0-15.62-6.06t-6-16.17V54.65a27,27,0,0,1,2.61-12.07,19.88,19.88,0,0,1,7.32-8.28,19.39,19.39,0,0,1,10.51-3q9.22,0,14.24,5.88t5,16.64V58H191a13.59,13.59,0,0,0,3.73,8.84A11.22,11.22,0,0,0,203,70a13.71,13.71,0,0,0,11.35-5.63l5.46,5.22a18.23,18.23,0,0,1-7.24,6.27A22.59,22.59,0,0,1,202.4,78.13Zm-1.21-38.66a8.56,8.56,0,0,0-6.74,2.92,15.13,15.13,0,0,0-3.27,8.13h19.31v-.75c-.22-3.39-1.13-6-2.71-7.69A8.47,8.47,0,0,0,201.19,39.47Z"
                      fill="#fff" />
                    <path
                      d="M245.85,78.13q-9.65,0-15.62-6.06t-6-16.17V54.65a27,27,0,0,1,2.61-12.07,19.74,19.74,0,0,1,7.32-8.28,19.37,19.37,0,0,1,10.51-3q9.21,0,14.24,5.88t5,16.64V58H234.46a13.54,13.54,0,0,0,3.73,8.84A11.2,11.2,0,0,0,246.43,70a13.7,13.7,0,0,0,11.34-5.63l5.47,5.22A18.23,18.23,0,0,1,256,75.9,22.62,22.62,0,0,1,245.85,78.13Zm-1.21-38.66a8.56,8.56,0,0,0-6.74,2.92,15.13,15.13,0,0,0-3.27,8.13h19.31v-.75q-.34-5.09-2.71-7.69A8.48,8.48,0,0,0,244.64,39.47Z"
                      fill="#fff" />
                    <path d="M284.79,64.45l9.55-32.28h10.47L289.17,77.3h-8.8L264.6,32.17h10.51Z" fill="#fff" />
                    <path
                      d="M328.61,78.13q-9.63,0-15.62-6.06T307,55.9V54.65a27,27,0,0,1,2.6-12.07,19.88,19.88,0,0,1,7.32-8.28,19.39,19.39,0,0,1,10.51-3q9.22,0,14.25,5.88t5,16.64V58H317.22A13.55,13.55,0,0,0,321,66.79,11.19,11.19,0,0,0,329.19,70a13.71,13.71,0,0,0,11.35-5.63L346,69.63a18.27,18.27,0,0,1-7.23,6.27A22.66,22.66,0,0,1,328.61,78.13ZM327.4,39.47a8.54,8.54,0,0,0-6.73,2.92,15.14,15.14,0,0,0-3.28,8.13H336.7v-.75q-.33-5.09-2.71-7.69A8.46,8.46,0,0,0,327.4,39.47Z"
                      fill="#fff" />
                    <path
                      d="M0,0V109.47H109.47V0ZM84,79.25H74.4V37.67a7.44,7.44,0,0,0-14.88,0V71.81a17,17,0,0,1-34,0V30.23h9.56V71.81a7.44,7.44,0,1,0,14.88,0V37.67a17,17,0,1,1,34,0Z"
                      fill="#fff" />
                  </svg>
              </Link>
              { authButtons }
            </Box>

            {/* HOME */}
            <Route exact path="/">
              <Home></Home>
              <footer className="pageFooter"><p>A bachelor's thesis made by 
                <a className="footerLink" target="_blank" rel="noopener noreferrer" href="https://maximeengels.be/#/"> Maxime Engels</a></p>
              </footer>
            </Route>
              
            <Route path="/signup" component={SignUp}></Route>
            <Route path="/createprofile/:id" component={CreateProfile}></Route>
            <Route path="/profile/:id" component={Profile}></Route>

            <video autoPlay muted loop className="bgVideo">
              <source src={BgVideo} type="video/mp4"/>
            </video>
            <Box className="background"></Box>
          </Box>
        }
      </Box>
    </Router>
  );
}

export default App;
