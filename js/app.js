// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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


function login(){
  firebaseConfig.auth().signInWithEmailAndPassword(form.re().value, form.password().value).then(response =>{
    window.location.href = "https://ka1quegs.github.io/TCC/solic.html"; 
  }).catch(error => {
    alert(error.code)
  })
}