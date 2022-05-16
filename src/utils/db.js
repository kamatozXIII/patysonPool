import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/app-check'

export const firebaseConfig = {
  apiKey: 'AIzaSyAy_XejtDlFBdhOrzWXWUhWNPdooCKslAU',
  authDomain: 'pool-patyson.firebaseapp.com',
  projectId: 'pool-patyson',
  storageBucket: 'pool-patyson.appspot.com',
  messagingSenderId: '231418322402',
  appId: '1:231418322402:web:d7415a2b9e003c6afcadbb',
  measurementId: 'G-236HFVQ2ME',
}

// Initialize Firebase
// eslint-disable-next-line import/prefer-default-export
const app = firebase.initializeApp(firebaseConfig)
export const db = app.firestore()
export const auth = app.auth()
export const appCheck = app.appCheck()
window.FIREBASE_APPCHECK_DEBUG_TOKEN = true
