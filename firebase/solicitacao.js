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
      let entrada = document.getElementById('entrada').value
      let saida = document.getElementById('saida').value
      let empresa = document.getElementById('empresa').value
      let modelo_carro = document.getElementById('modelo_carro').value
      let placa_carro =  document.getElementById('placa_carro').value
      let acesso_fabrica = document.getElementById('acesso_fabrica').value
      let estacionamento = document.getElementById('mySelect').value
      let observacao = document.getElementById('observacao').value

        alert('Solicitação enviada!')

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
          placa_carro: `${placa_carro}`,
          acesso_fabrica : `${acesso_fabrica}`,
          estacionamento : `${estacionamento}`,
          observacao:   `${observacao}`,
          verificacao: false,
          status: ""
          
    })
      window.location.href = "#";
      
      });
}catch{}
