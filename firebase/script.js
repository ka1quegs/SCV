import { app } from "./modules.js"
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

const db = getFirestore(app)

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
}

