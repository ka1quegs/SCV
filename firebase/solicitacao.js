import { db } from "./modules.js"
import { collection, getDoc,setDoc, doc}
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
        let dataRegistro = new Date();    //Data de registro do modal
        let dataFormatada = ((dataRegistro.getDate() )) + "/" + ((dataRegistro.getMonth() + 1)) + "/" + dataRegistro.getFullYear(); //Data de registro do modal FORMATADA

        //Adiciona os dados para o Firestore

    const visitorRef = doc(db, "visitante", cpf);
    
    setDoc(visitorRef, {   
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
      consulta: true,
      pendente: true,
      status: "Pendente",
      entrada: "",
      saida: "",
      date: `${dataFormatada}`,
      estadoVisita: "",
      tipo_cadastro: "Pré-Cadastro"
    });

    
    }
    )
  }catch{}

  //Toastify de Solicitação enviada
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

//Validação dos campos
  
  const name = document.getElementById("nome");
  const cpf = document.getElementById("cpf");
  const empresa = document.getElementById("empresa");
  const visita = document.getElementById("responsavelVisita");
  const periodoDe = document.getElementById("periodoDe");
  const periodoAte = document.getElementById("periodoAte");
  const submitBtn = document.getElementById("enviarSolici");

  function checkValidity() {
    if (name.validity.valid && empresa.validity.valid && visita.validity.valid && periodoDe.validity.valid && periodoAte.validity.valid && cpf.validity.valid) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }

name.addEventListener("input", checkValidity);
empresa.addEventListener("input", checkValidity);
visita.addEventListener("input", checkValidity);
periodoDe.addEventListener("input", checkValidity);
periodoAte.addEventListener("input", checkValidity);
cpf.addEventListener("input", checkValidity);

const buscarBtn = document.getElementById("buscarVisitante");
const cpfBuscar = document.getElementById("cpf");

buscarBtn.addEventListener("click", async () => {
  const visitorRef = doc(db, "visitante", cpf.value);
  try {
    const docSnap = await getDoc(visitorRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      // Preenche os respectivos inputs com os dados do Firestore
      document.getElementById("nome").value = data.nome;
      document.getElementById("rg").value = data.rg;
      document.getElementById("cpf").value = data.cpf;
      document.getElementById("emailVisitante").value = data.emailVisitante;
      document.getElementById("responsavelVisita").value = data.responsavelVisita;
      document.getElementById("setor").value = data.setor;
      document.getElementById("telefone").value = data.telefone;
      document.getElementById("celular").value = data.celular;
      document.getElementById("periodoDe").value = data.periodoDe;
      document.getElementById("periodoAte").value = data.periodoAte;
      document.getElementById("empresa").value = data.empresa;
      document.getElementById("modelo_carro").value = data.modelo_carro;
      document.getElementById("placa_carro").value = data.placa_carro;
      document.getElementById("acesso_fabrica").value = data.acesso_fabrica;
      document.getElementById("mySelect").value = data.estacionamento;
      document.getElementById("observacao").value = data.observacao;
    } else {
      console.log("Visitante não encontrado");
    }
  } catch (error) {
    console.log("Erro ao buscar visitante:", error);
  }
});
