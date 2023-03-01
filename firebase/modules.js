// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
  import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";


  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCT1mvPmNZ6MAUxVnga4vFqk5-oUxSrACc",
    authDomain: "projeto-tcc-bca68.firebaseapp.com",
    databaseURL: "https://projeto-tcc-bca68-default-rtdb.firebaseio.com",
    projectId: "projeto-tcc-bca68",
    storageBucket: "projeto-tcc-bca68.appspot.com",
    messagingSenderId: "334672042370",
    appId: "1:334672042370:web:ce02de20192a1a3d37d79b"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth();

// Criando novo usuário (funcionário)
  signUp.addEventListener('click',(e) => {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var username = document.getElementById('username').value;
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
       
        const user = userCredential.user;
  
        set(ref(database, 'users/' + user.uid ),{
          username: username,
          email: email
        })
  
        alert('Usuário criado');
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
  
        alert(errorMessage);
      
      });
  
  });

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


