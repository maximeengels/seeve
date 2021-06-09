
// import { firestore } from "firebase"
import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase/config"
import { projectFirestore } from '../firebase/config';

const AuthContext = React.createContext()
let usersCollection = null;

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  usersCollection = projectFirestore.collection('users');

  function signup(email, password) {
    const name = document.querySelector('.artistName');
    const emailVal = document.querySelector('.email');
    const pwVal = document.querySelector('.password');
    
    setTimeout(() => {
      console.log(auth.createUserWithEmailAndPassword(emailVal.value.trim(), pwVal.value))
      auth.createUserWithEmailAndPassword(emailVal.value.trim(), pwVal.value).then(resp => {
        // console.log(resp.user.uid)
        return usersCollection.doc(resp.user.uid).set({
          artistName: name.value
        })
      })
      //   .catch(error => {   
      //     alert(error.code);
      //  })
    }, 1000)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}