import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, getDocs,doc, query, where } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyCT1mvPmNZ6MAUxVnga4vFqk5-oUxSrACc",
    authDomain: "projeto-tcc-bca68.firebaseapp.com",
    databaseURL: "https://projeto-tcc-bca68-default-rtdb.firebaseio.com",
    projectId: "projeto-tcc-bca68",
    storageBucket: "projeto-tcc-bca68.appspot.com",
    messagingSenderId: "334672042370",
    appId: "1:334672042370:web:ce02de20192a1a3d37d79b"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


getData.addEventListener('click',() => {
getDocs(doc(db,'visitante','lGbWdIzToelg1Qezhcrr')).then(docSnap => {
    if(docSnap.exists()){
        console.log('Document data: ', docSnap.data())
    }else{
        console.log('no such data!')
    }
})
})
