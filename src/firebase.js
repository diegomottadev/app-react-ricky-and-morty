import firebase from 'firebase/app';
import 'firebase/auth';

let  firebaseConfig = {
    apiKey: "AIzaSyDM-mbut7ldNR7AN4LbW9ktK3-6KarxqrI",
    authDomain: "app-react-ricky-and-morty.firebaseapp.com",
    projectId: "app-react-ricky-and-morty",
    storageBucket: "app-react-ricky-and-morty.appspot.com",
    messagingSenderId: "468885505808",
    appId: "1:468885505808:web:1383376d31d3fa93da8795"
  };

  firebase.initializeApp(firebaseConfig);


  export function loginWithGoogle(){
      let provider = new firebase.auth.GoogleAuthProvider()
      return firebase.auth().signInWhitPopup(provider).then(snap => snap.user);
  }