import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

var btnLogin = document.getElementById('btnLogin');
var inputEmail = document.getElementById('inputEmail');
var inputPassword = document.getElementById('inputPassword');

btnLogin.addEventListener('click', function(){

    const auth = getAuth();
    signInWithEmailAndPassword(auth, inputEmail.value, inputPassword.value)
      .then(function(result){
        // Signed in
        alert("Usuário conectado");
        // ...
      })
      .catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      })


});
