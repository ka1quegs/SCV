import { database, auth} from "./modules.js"
import { ref, update } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import {signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";


  //Login do usuário com email e senha criado

  login.addEventListener('click',(e) =>{

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
        const user = userCredential.user;

        const dt = new Date();
        update(ref(database, 'users/' + user.uid ),{
          ultimo_login: dt,
        })
        alert('Usuário logado!');
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
      });

  })
