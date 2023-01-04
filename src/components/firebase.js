// import firebase from 'firebase/app'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FB_APP_ID,
  /* apiKey: 'AIzaSyCPkW0ZniWt3RaFA406gUtBpOy4P36Lpic',
  authDomain: 'grocery-list-20493.firebaseapp.com',
  projectId: 'grocery-list-20493',
  storageBucket: 'grocery-list-20493.appspot.com',
  messagingSenderId: '877405337194',
  appId: '1:877405337194:web:0e2c60694da88b182e7c13',*/
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
export default app
