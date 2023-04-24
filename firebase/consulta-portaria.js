import { db, storage } from "./modules.js"
import {collection,getDocs, query, where, updateDoc, doc,getDoc, setDoc}
from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";


const colecao = query(collection(db,"visitante"), where("consulta", "==", true ) )

const arrayDocumentos = await getDocs(colecao)

  arrayDocumentos.forEach(doc =>{
    let sectionRegistro = document.getElementById('sectionRegistro')
    
    let registro = document.createElement('div')
    registro.setAttribute("class", "registro")
    registro.setAttribute("data-nome", doc.get("nome").toUpperCase());

    let table = document.createElement("table")
    table.setAttribute("class", "table2")
    
    let tbody = document.createElement("tbody")
    let valueCpf = document.createElement("input")
    valueCpf.setAttribute("class", "valueCpf")
    valueCpf.value = doc.get("cpf")
    valueCpf.setAttribute("type", "hidden")

    
    //tbody
    try{
      let valueVisita = ""
      let td = document.createElement("td");
      td = document.createElement("td")
      td.innerHTML = doc.get("periodoDe")
      td.setAttribute("data-label","Data")
      tbody.append(td)
      
      td = document.createElement("td")
      td.innerHTML = doc.get("nome")
      td.setAttribute("data-label","Nome")
      tbody.append(td)

      td = document.createElement("td")
      td.innerHTML = doc.get("empresa")
      td.setAttribute("data-label","Empresa")
      tbody.append(td)

      td = document.createElement("td")
      td.innerHTML = doc.get("responsavelVisita")
      td.setAttribute("data-label","Solicitante")
      tbody.append(td)

      td = document.createElement("td")
      td.innerHTML = doc.get("status")
      td.setAttribute("data-label","Status")
      tbody.append(td)

      td = document.createElement("td");
      if (doc.get("entrada") === "") {
        valueVisita = "Em aberto"
        td.innerHTML = valueVisita;
      } else{
        valueVisita = "Em andamento"
        td.innerHTML = valueVisita;
      }
      if(doc.get("saida") !== ""){
        valueVisita = "Finalizada"
        td.innerHTML = valueVisita
      }
      td.setAttribute("data-label", "Visita");
      td.setAttribute("id", "andamentoVisita");
      tbody.append(td);

      td = document.createElement("td")
      td.innerHTML = doc.get("#")
      td.setAttribute("data-label","Aprovado/Rejeitado por")
      tbody.append(td)

      //Botão Visualizar
        td = document.createElement("td")
        let button = document.createElement("button")
        button.setAttribute("class", "visualizar")
        td.setAttribute("data-label","Ações")
        button.setAttribute("id", "visualizar")
        button.innerHTML = "Visualizar/Editar"
        td.append(button)
        tbody.appendChild(td)

        //Botão REVISAR
        button = document.createElement("button")
        button.setAttribute("id", "revisao")
        button.setAttribute("class","revisar")
        button.setAttribute("disable","true")
        button.addEventListener("click", async () => {
          await updateDoc(doc.ref, { verificacao: false })
          await updateDoc(doc.ref, { pendente: true })
          await updateDoc(doc.ref, { tipo_cadastro: "Pré-Cadastro" })
          await updateDoc(doc.ref, { status: "Pendente" })
          await updateDoc(doc.ref, { entrada: "" })
          await updateDoc(doc.ref, { saida: "" })
          console.log("Atualizado")
          location.reload()
        })
       
        button.innerHTML = "Revisar"
        let image = document.createElement("img");
          td.setAttribute("data-label","Visualizar")
        td.append(button,image)
        tbody.appendChild(td)

        //Botão negar
        table.append(tbody)
        registro.append(table,valueCpf)
        sectionRegistro.append(registro)
  }catch{}
})

//Puxando informações de visitante para o Modal
let arrayRegistro = document.getElementsByClassName("visualizar")

for (let i = 0; i < arrayRegistro.length; i++){
  arrayRegistro[i].addEventListener("click", async () => {
    const cpf = document.getElementsByClassName("valueCpf")[i].value;
    
    const busca = query(collection(db, "visitante"), where("cpf", "==", cpf))

    const resultadoBusca = await getDocs(busca)
    resultadoBusca.forEach((doc) => {
      document.getElementById("dataRegistro").value = doc.get("date")
      document.getElementById("cpf").value = doc.get("cpf")
      document.getElementById("nomeVisitante").value = doc.get("nome")
      document.getElementById("emailVisitante").value = doc.get("emailVisitante")
      document.getElementById("celular").value = doc.get("celular")
      document.getElementById("rg").value = doc.get("rg")
      document.getElementById("tipo_cadastro").value = doc.get("tipo_cadastro")
      document.getElementById("empresaVisitante").value = doc.get("empresa")
      document.getElementById("responsavelVisita").value = doc.get("responsavelVisita")
      document.getElementById("setor").value = doc.get("setor")
      document.getElementById("acesso_fabrica").value = doc.get("acesso_fabrica")
      document.getElementById("estacionamento").value = doc.get("estacionamento")
      document.getElementById("placa_carro").value = doc.get("placa_carro")
      document.getElementById("modelo_carro").value = doc.get("modelo_carro")
      document.getElementById("periodoDe").value = doc.get("periodoDe")
      document.getElementById("periodoAte").value = doc.get("periodoAte")
      document.getElementById("story").value = doc.get("observacao")
      document.getElementById("entrada").value = doc.get("entrada")
      document.getElementById("saida").value = doc.get("saida")
      document.getElementById("status").value = doc.get("status")
      document.getElementById("aprov_rej").value = doc.get("#")
      })

    
    modal.style.display = "block"

    //Quando clicado no botão updateBtn pega todos os valores dos Inputs do modal e atualiza o firestore para aquele usuario
    const updateBtn = document.getElementById("updateBtn")
    updateBtn.addEventListener("click", async () => {
    
      const nome = document.getElementById("nomeVisitante").value
      const email = document.getElementById("emailVisitante").value
      const celular = document.getElementById("celular").value
      const rg = document.getElementById("rg").value
      const empresa = document.getElementById("empresaVisitante").value
      const responsavelVisita = document.getElementById("responsavelVisita").value
      const setor = document.getElementById("setor").value
      const acesso_fabrica = document.getElementById("acesso_fabrica").value
      const estacionamento = document.getElementById("estacionamento").value
      const placa_carro = document.getElementById("placa_carro").value
      const modelo_carro = document.getElementById("modelo_carro").value
      const periodoDe = document.getElementById("periodoDe").value
      const periodoAte = document.getElementById("periodoAte").value
      const observacao = document.getElementById("story").value
      const entrada = document.getElementById("entrada").value
      const saida = document.getElementById("saida").value

      const docRef = doc(db, "visitante", cpf)
      await updateDoc(docRef, {
        nome: nome,
        emailVisitante: email,
        celular: celular,
        rg: rg,
        empresa: empresa,
        responsavelVisita: responsavelVisita,
        setor: setor,
        acesso_fabrica: acesso_fabrica,
        estacionamento: estacionamento,
        placa_carro: placa_carro,
        modelo_carro: modelo_carro,
        periodoDe: periodoDe,
        periodoAte: periodoAte,
        observacao: observacao,
        entrada: entrada,
        saida: saida
      })
  
    const registrosRef = collection(docRef, "registros");
    // Gera o ID do documento na subcoleção REGISTRO com  a DATA ATUAL
    const hoje = new Date();
    const documentId = `${hoje.getFullYear()}-${hoje.getMonth() + 1}-${hoje.getDate()}`;

    const existingDoc = await getDoc(doc(registrosRef, documentId));
    if (existingDoc.exists()) {
      const novoRegistroRef = doc(registrosRef, documentId);
      await setDoc(novoRegistroRef, {
        dataRegistro: hoje,
        entrada: entrada,
        saida: saida
      });
    
    } else {
      const novoRegistroRef = doc(registrosRef, documentId);
      await setDoc(novoRegistroRef, {
        dataRegistro: hoje,
        entrada: entrada,
        saida: saida
      });
    }
    reload.location()     
})

/*
const docRef = doc(db, "visitante", cpf);
const subcollectionRef = collection(docRef, "registros");

const arrayDocumentosRegistros = await getDocs(subcollectionRef)

arrayDocumentosRegistros.forEach(doc =>{

  let sectionHistorico = document.getElementById('sectionHistorico')
  let table = createElement ("table")
  table.setAttribute("class","table-dentro")

  let tbody = document.createElement("tbody")

  let td = createElement("td")
  
  table.append(tbody)
})
*/

   // hide the modal and reload the page
      modal.addEventListener("click", (event) => {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }); 
      
      
  })
  var mod = document.getElementById("mod");
  var abre = document.getElementById("abre");
  var span = document.getElementsByClassName("close")[0];
  
  abre.onclick = function() {
    mod.style.display = "block";
  }
  
  span.onclick = function() {
    mod.style.display = "none";
  }
  
  window.onclick = function(event) {
    if (event.target == mod) {
      mod.style.display = "none";
    }
  }
}

  // modal de HISTÓRICO

const input = document.getElementById('input-busca');
  input.addEventListener('keyup', () => {
    const filter = input.value.toUpperCase();
    arrayDocumentos.forEach(doc => {
      const nome = doc.get('nome').toUpperCase();
      const registro = document.querySelector(`.registro[data-nome="${nome}"]`);
      if (registro) {
        registro.style.display = nome.includes(filter) ? '' : 'none';
      }
    });
  });


