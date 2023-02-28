import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT1mvPmNZ6MAUxVnga4vFqk5-oUxSrACc",
  authDomain: "projeto-tcc-bca68.firebaseapp.com",
  projectId: "projeto-tcc-bca68",
  storageBucket: "projeto-tcc-bca68.appspot.com",
  messagingSenderId: "334672042370",
  appId: "1:334672042370:web:ce02de20192a1a3d37d79b"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


  
const auth = getAuth();
signInWithEmailAndPassword(auth, inputEmail, inputPassword)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
