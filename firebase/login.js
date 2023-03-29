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
        window.location.href = "https://ka1quegs.github.io/SCV/solicitacao"
        
      })
    .catch((error) => {
        const errorCode = error.code;
      
          if (errorCode == "auth/user-not-found"){
            alert("Usuário não existente, por favor realize o cadastro.")
          }else if(errorCode == "auth/invalid-email"){
              alert("Email inválido")
            }else if (errorCode == "auth/wrong-password"){
                alert("Email ou senha incorreta!")
              }else if(errorCode == "auth/internal-error"){
                alert("Ops um erro ocorreu, tente novamente mais tarde")
                }else {
                  alert(errorCode, "Ops um erro ocorreu")}
      });

  })
