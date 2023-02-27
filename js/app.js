import { getAuth, signOut, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.17.0/firebase-auth.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT1mvPmNZ6MAUxVnga4vFqk5-oUxSrACc",
  authDomain: "projeto-tcc-bca68.firebaseapp.com",
  projectId: "projeto-tcc-bca68",
  storageBucket: "projeto-tcc-bca68.appspot.com",
  messagingSenderId: "334672042370",
  appId: "1:334672042370:web:ce02de20192a1a3d37d79b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
