  import firebase from 'firebase/app';
  import 'firebase/firestore';
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB3LVRrTJToE7Yoj91k7gGdftQpClCvUw4",
    authDomain: "fb-crud-react-82d63.firebaseapp.com",
    projectId: "fb-crud-react-82d63",
    storageBucket: "fb-crud-react-82d63.appspot.com",
    messagingSenderId: "285618674049",
    appId: "1:285618674049:web:d90d492570d30f0c063080"
  };
  // Initialize Firebase

  const fb = firebase.initializeApp(firebaseConfig);

  export const db = fb.firestore();