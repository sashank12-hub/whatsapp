// eslint-disable-next-line no-unused-vars
import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyD2jjB0L91-tatoH7Zz9FMipvBJ5eJuNsI",
    authDomain: "whatsapp-ae920.firebaseapp.com",
    projectId: "whatsapp-ae920",
    storageBucket: "whatsapp-ae920.appspot.com",
    messagingSenderId: "1026202602199",
    appId: "1:1026202602199:web:b46b643a29e2a59de5be92",
    measurementId: "G-CP4LPM5M53"
  };
  const firebaseApp=firebase.initializeApp(firebaseConfig)
  const db=firebaseApp.firestore()
  const auth=firebase.auth()
  const provider =new firebase.auth.GoogleAuthProvider()
export {auth,provider};
export default db;