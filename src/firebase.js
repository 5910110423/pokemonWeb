import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC-Wzz1fc2NT3_UDMYbNzBFKiHrJyM0k3c",
  authDomain: "pokemonwebtech.firebaseapp.com",
  databaseURL: "https://pokemonwebtech.firebaseio.com",
  projectId: "pokemonwebtech",
  storageBucket: "pokemonwebtech.appspot.com",
  messagingSenderId: "201909924511"
};
firebase.initializeApp(config);

  export default firebase;