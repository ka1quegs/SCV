import { db } from "./modules.js"
import { collection, addDoc}
from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

try{
    const enviarSolici = document.getElementById('enviarSolici');

    enviarSolici.addEventListener('click', () => { 
      let nome = document.getElementById('nome').value
      let rg = document.getElementById('rg').value
      let cpf = document.getElementById('cpf').value
      let emailVisitante = document.getElementById('emailVisitante').value
      let responsavelVisita = document.getElementById('responsavelVisita').value
      let setor = document.getElementById('setor').value
      let telefone = document.getElementById('telefone').value
      let celular = document.getElementById('celular').value
      let periodoDe = document.getElementById('periodoDe').value
      let periodoAte = document.getElementById('periodoAte').value
      let empresa = document.getElementById('empresa').value
      let modelo_carro = document.getElementById('modelo_carro').value
      let placa_carro =  document.getElementById('placa_carro').value
      let acesso_fabrica = document.getElementById('acesso_fabrica').value
      let estacionamento = document.getElementById('mySelect').value
      let observacao = document.getElementById('observacao').value
      

    
        addDoc(collection(db, "visitante"), {
          nome: `${nome}`,  
          rg: `${rg}`,
          cpf: `${cpf}`,
          emailVisitante: `${emailVisitante}`,
          responsavelVisita: `${responsavelVisita}`,
          setor:`${setor}`,
          telefone: `${telefone}`,
          celular: `${celular}`,
          periodoDe: `${periodoDe}`,
          periodoAte: `${periodoAte}`,
          empresa:`${empresa}`,
          modelo_carro: `${modelo_carro}`,
          placa_carro: `${placa_carro}`,
          acesso_fabrica : `${acesso_fabrica}`,
          estacionamento : `${estacionamento}`,
          observacao:   `${observacao}`,
          verificacao: false,
          status: "",
          entrada: "",
          saida: ""
          
    })
      window.location.href = "#";
      
      });
      
      
}catch{}

enviarSolici.addEventListener('click', () => { 
Toastify({
  text: "Socilitação enviada",
  duration: 2500,
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "center", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "#265df2",
    top: 40,
  },
  onClick: function(){} // Callback after click
}).showToast();
})