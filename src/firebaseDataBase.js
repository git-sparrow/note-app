import * as firebase from 'firebase'
import firebaseConfig from './config'

firebase.initializeApp(firebaseConfig)

const firebaseDB = firebase.database()

export default firebaseDB
