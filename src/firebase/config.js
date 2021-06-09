import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAOZh4_WS5LnRVfYtXgmRDiYbDJK2Fkifk",
  authDomain: "seeve-music.firebaseapp.com",
  projectId: "seeve-music",
  storageBucket: "seeve-music.appspot.com",
  messagingSenderId: "577442700594",
  appId: "1:577442700594:web:ba13f439d0d462e99ccb2b"
};

//initialize firebase
const app = firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export const auth = app.auth();
export { projectStorage, projectFirestore, timestamp };