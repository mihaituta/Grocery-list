// import firebase from 'firebase/app'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  getFirestore,
  setDoc,
  addDoc,
  doc,
  collection,
  getDocs,
  onSnapshot,
  query,
  deleteDoc,
  orderBy,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FB_APP_ID,
}

// Initialize Firebase
const fbApp = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
const fbAuth = getAuth(fbApp)
const fbDB = getFirestore(fbApp)

export {
  fbApp,
  fbAuth,
  fbDB,
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  deleteDoc,
  orderBy,
}
