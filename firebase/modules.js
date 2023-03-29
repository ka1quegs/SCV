// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
  import { getDatabase } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
  import { getAuth} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  export const firebaseConfig = {
    apiKey: "AIzaSyCT1mvPmNZ6MAUxVnga4vFqk5-oUxSrACc",
    authDomain: "projeto-tcc-bca68.firebaseapp.com",
    databaseURL: "https://projeto-tcc-bca68-default-rtdb.firebaseio.com",
    projectId: "projeto-tcc-bca68",
    storageBucket: "projeto-tcc-bca68.appspot.com",
    messagingSenderId: "334672042370",
    appId: "1:334672042370:web:ce02de20192a1a3d37d79b"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);

  export const database = getDatabase(app);

  export const db = getFirestore(app);
  
  export const auth = getAuth();
