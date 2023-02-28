//Inicializa aplicação e sincroniza com o Firebase.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
//Importa os métodos de autenticação.
import { getAuth, signOut , signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";



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
  

  let btnLogin = document.getElementById('btnLogin').value;
  let inputEmail = document.getElementById('inputEmail').value;
  let inputPassword = document.getElementById('inputPassword').value;
  
  let email = inputEmail;
  let password = inputPassword;

  
  btnLogin.addEventListener('click', function(){
  
      const auth = getAuth();
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
                alert("Usuário não existente, por favor realize o cadastro.")
            }else if (errorCode == "auth/wrong-password") {
                alert("Email ou senha incorreta!")}
            else if(errorCode == "auth/internal-error"){alert("Ops um erro ocorreu, tente novamente mais tarde")}
            else {alert(errorCode, "Ops um erro ocorreu")}

            alert(errorMessage)
        });
  
  });
  