import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { AuthProvider } from './contexts/AuthContext'
import { ChakraProvider } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({ 
  colors: {
    black: "#0e0e0e",
    white: "#f5f5f5",
    gray: { 
      50: "#E3E3E3",
      100: "#BFBFBF",
      200: "#8C8C8C",
      300: "#595959",
      400: "#2B2B2B",    
      500: "#1e1e1e",    
    },
    blue: {
      100: "#73c7f4",
      300: "#1564BF",
      400: "#11529C",
    },
    green: {
      300: "rgb(102, 167, 50)",
      400: "rgb(72, 117, 36)",
    },
    red: {
      100: "#db5135",
      200: "#d95b29",
      300: "#a32d1b",
      400: "#84281b",
      500: "#C51F01",
    },
  },
  textStyles: {
    h1: {
      // responsive styles
      fontFamily: "Segoe UI",
      fontSize: ["2.4em", "2.6em"],
      fontWeight: "900",
      textTransform: "capitalize"
    },
    h2: {
      fontFamily: "Hind",
      fontSize: ["1.1em", "1.1em"],
      fontWeight: "regular",
      textTransform: "capitalize",
    },
    h3: {
      fontFamily: "Source Sans Pro",
      fontSize: ["18px", "20px"],
      fontWeight: "bold",
      lineHeight: "100%",
      textTransform: "capitalize",
      color: "black",
      mt: "2rem !important"
    },
    h4: {
      fontFamily: "Hind",
      fontSize: ["15px", "16px"],
      fontWeight: "medium",
      lineHeight: "100%",
      textTransform: "capitalize",
      color: "black",
      mt: ".5rem !important",
      mb: ".5rem !important"
    },
    p: {
      fontFamily: "Hind",
      fontSize: ["15px", "16px"],
      fontWeight: "200",
      lineHeight: "160%",
      textTransform: "initial",
      width: ["100%", "50vw" , "48%"],
      color: "white",
      mt: ".5rem !important",
      mb: ".5rem !important"
    },
    button: {
      fontFamily: "Hind",
      fontSize: ["14px", "15px"],
      fontWeight: "light",
      textTransform: "capitalize",
      color: "black",
    },
    menu: {
      userSelect:"none",
      fontFamily: "Hind",
      fontSize: ["24px", "26px", "24px"],
      fontWeight: "bold",
      lineHeight: "100%",
      textTransform: "initial",
      color: "white",
      mt: "1rem !important",
      mb: "1rem !important",
      width: "fit-content !important",
      transition: "all 0.2s",
      textDecoration: "none !important",
      _hover:{ 
        transform: "scale(1.1)",
        cursor: "pointer",
        opacity: "1"
     },
    },
    submenu: {
      userSelect:"none",
      fontFamily: "Hind",
      fontSize: ["22px", "22px", "22px"],
      fontWeight: "light",
      lineHeight: "100%",
      textTransform: "initial",
      color: "white",
      mt: "1rem !important",
      mb: "1rem !important",
      width: "fit-content !important",
      transition: "all 0.2s",
      textDecoration: "none !important",
      _hover:{ 
        transform: "scale(1.05)",
        fontWeight: "medium",
        cursor: "pointer",
        opacity: "1"
     },
    },
  },
 })

ReactDOM.render(
  <AuthProvider>
    <ChakraProvider theme={theme}>
        <App />
    </ChakraProvider>
  </AuthProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
