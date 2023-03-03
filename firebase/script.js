import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";


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


enviarSolici.addEventListener('click',(e) => {
  try {
    const docRef = await addDoc(collection(db, "visitante"), {
      nome: document.getElementById('nome').value,
      rg: document.getElementById('rg').value,
      cpf: document.getElementById('cpf').value,
      emailVisitante: document.getElementById('emailVisitante').value,
      responsavelVisita: document.getElementById('responsavelVisita').value,
      setor: document.getElementById('setor').value,
      telefone: document.getElementById('telefone').value,
      celular: document.getElementById('celular').value,
      entrada: document.getElementById('entrada').value,
      saida: document.getElementById('saida').value,
      empresa: document.getElementById('empresa').value,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }}


