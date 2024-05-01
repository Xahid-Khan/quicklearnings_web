import { initializeApp } from 'firebase/app'
import { getFirestore, initializeFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: `${process.env['FIREBASE_KEY']}`,
  authDomain: `${process.env['FB_AUTHDOMAIN']}`,
  projectId: `${process.env['FB_PROJECT_ID']}`,
  storageBucket: `${process.env['FB_STORAGE_BUCKET']}`,
  messagingSenderId: `${process.env['FB_MESSAGE_SENDING_ID']}`,
  appId: `${process.env['FB_APP_ID']}`,
  measurementId: `${process.env['FB_MEASUREMENT_ID']}`
}

const firebase = initializeApp(firebaseConfig)
const db = initializeFirestore(firebase, {
  experimentalForceLongPolling: true // this line
})
// const db = getFirestore(firebase)

export { db }
