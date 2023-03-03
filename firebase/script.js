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



enviarSolici.addEventListener('submit',e => {
  e.preventDefault(e.target.nome.value, e.target.rg.value, e.target.cpf.value, e.target.emailVisitante.value, e.target.responsavelVisita.value, e.target.setor.value, e.target.telefone.value, e.target.celular.value, e.target.entrada.value, e.target.saida.value, e.target.empresa.value, e.target.modelo_carro.value , e.target.placa_carro.value)
  console
  try {
    
    addDoc(collection(db, "visitante"), {
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
      modelo_carro: document.getElementById('modelo_carro').value,
      placa_carro: document.getElementById('placa_carro').value,

    });
    
  } catch (error) {
    const errorCode = error.code;
    alert(errorCode)
  }

});


