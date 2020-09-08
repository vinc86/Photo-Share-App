import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCoV69hxDAbK1x8xLBqggvSVz5B8lu2ONw",
    authDomain: "photo-share-33618.firebaseapp.com",
    databaseURL: "https://photo-share-33618.firebaseio.com",
    projectId: "photo-share-33618",
    storageBucket: "photo-share-33618.appspot.com",
    messagingSenderId: "458505945426",
    appId: "1:458505945426:web:96c7cdf9b609b20fbc7a8b",
    measurementId: "G-YD55S209G7"
  });

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };