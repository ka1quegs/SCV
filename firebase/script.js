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

let nome = document.getElementById('nome').value
let rg = document.getElementById('rg').value
let cpf = document.getElementById('cpf').value
let emailVisitante = document.getElementById('emailVisitante').value
let responsavelVisita = document.getElementById('responsavelVisita').value
let setor = document.getElementById('setor').value
let telefone = document.getElementById('telefone').value
let celular = document.getElementById('celular').value
let entrada = document.getElementById('entrada').value
let saida = document.getElementById('saida').value
let empresa = document.getElementById('empresa').value
let modelo_carro = document.getElementById('modelo_carro').value
let placa_carro =  document.getElementById('placa_carro').value


enviarSolici.addEventListener('submit', function() {
  enviarSolici.pr
  try {
    
    addDoc(collection(db, "visitante"), {
      nome: `${nome}`,
      rg: `${rg}`,
      cpf: `${cpf}`,
      emailVisitante: `${emailVisitante}`,
      responsavelVisita: `${responsavelVisita}`,
      setor:`${setor}`,
      telefone: `${telefone}`,
      celular: `${celular}`,
      entrada: `${entrada}`,
      saida: `${saida}`,
      empresa:`${empresa}`,
      modelo_carro: `${modelo_carro}`,
      placa_carro: `${placa_carro}`

    });
    console.log('teste');
  } catch (e) {
    
})

