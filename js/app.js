import { initializeApp,  getAuth, signOut , signInWithEmailAndPassword}
from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.0/firebase-app.js";


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
const auth = getAuth(app);



var btnLogin = document.getElementById('btnLogin');
var inputEmail = document.getElementById('inputEmail');
var inputPassword = document.getElementById('inputPassword');


btnLogin.addEventListener('click', function(){

    firebaseConfig.auth().signInWithEmailAndPassword(inputEmail.value,inputPassword.value)
    
    .then(function(result){
        alert('Usuário conectado!');
        console.log("sucess")
    }).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;

        alert(errorMessage);

        console.log("error")
    });


});
