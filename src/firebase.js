import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "YourApiKey",
    authDomain: "YourDomain",
    projectId: "YourProjectId",
    storageBucket: "YourStoreBucket",
    messagingSenderId: "YourMessagingSenderId",
    appId: "YourAppId"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth =  firebase.auth();

const storage =  firebase.storage();

const provider =  new firebase.auth.GoogleAuthProvider();



export {db, auth, provider, storage};