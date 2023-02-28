let htmlAtual = document.location.pathname
//Inicializa aplicação e sincroniza com o Firebase.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
//Importa os métodos de autenticação.
import { getAuth, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";



// Configurações do Firebase
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
  
  let inputEmail = document.getElementById('inputEmail').value;
  let inputPassword = document.getElementById('inputPassword').value;
  let btnLogin = document.getElementById('btnLogin').value;
  
  

  if (htmlAtual == "https://ka1quegs.github.io/TCC/login"){

  let email = inputEmail;
  let password = inputPassword;
  let login = btnLogin;
  
    login.addEventListener('click', function(){
      signInWithEmailAndPassword(auth, email, password )
        .then(async (userCredential) => {
            const user = userCredential.user
          // Signed in
          alert("Usuário conectado");
          // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode == "auth/user-not-found"){
                alert("Usuário não existente!")
            }else if (errorCode == "auth/wrong-password") {
                alert("Email ou senha incorreta!")}
            else if(errorCode == "auth/internal-error"){alert("Ops um erro ocorreu, tente novamente mais tarde")}
            else {alert(errorCode, "Ops um erro ocorreu")}

            alert(errorMessage)
        });
  
  });
}
