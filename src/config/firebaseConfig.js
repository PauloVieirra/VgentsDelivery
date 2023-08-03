//import {firebase} from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';

let firebaseConfig = {
    apiKey: "AIzaSyCRRZVDHhox5OoXkox1yOgoz-3WkgxItzw",
  authDomain: "west-bfcd4.firebaseapp.com",
  databaseURL: "https://west-bfcd4-default-rtdb.firebaseio.com",
  projectId: "west-bfcd4",
  storageBucket: "west-bfcd4.appspot.com",
  messagingSenderId: "321747926649",
  appId: "1:321747926649:web:806260240e4c218cfd5ea8"
  };

 if(!firebase.apps.length){
     firebase.initializeApp(firebaseConfig);
 }

 export default firebase;


