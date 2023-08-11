//import {firebase} from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';

let firebaseConfig = {
   apiKey: "AIzaSyAC_JjPiEU6bm8XyCKLDga4-JjZvvO5VhE",
  authDomain: "listed-df752.firebaseapp.com",
  databaseURL: "https://listed-df752-default-rtdb.firebaseio.com",
  projectId: "listed-df752",
  storageBucket: "listed-df752.appspot.com",
  messagingSenderId: "944923824864",
  appId: "1:944923824864:web:967311bfea10cf6d9f3685"
  };

 if(!firebase.apps.length){
     firebase.initializeApp(firebaseConfig);
 }

 export default firebase;