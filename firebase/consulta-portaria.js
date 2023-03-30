import { db } from "./modules.js"
import {collection,getDocs, query, where, updateDoc}
from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

const colecao = query(collection(db,"visitante"),where("verificacao", "==", true))

const arrayDocumentos = await getDocs(colecao)

  arrayDocumentos.forEach(doc =>{
    let sectionRegistro = document.getElementById('sectionRegistro')
    
    let registro = document.createElement('div')
    registro.setAttribute("class", "registro")

    let table = document.createElement("table")
    table.setAttribute("class", "table2")
    
    let tbody = document.createElement("tbody")
    let valueCpf = document.createElement("input")
    valueCpf.setAttribute("class", "valueCpf")
    valueCpf.value = doc.get("cpf")
    valueCpf.setAttribute("type", "hidden")

    //tbody
    try{
      let td = document.createElement("td");
      td = document.createElement("td")
      td.innerHTML = doc.get("periodoDe")
      tbody.append(td)
      
      td = document.createElement("td")
      td.innerHTML = doc.get("nome")
      tbody.append(td)

      td = document.createElement("td")
      td.innerHTML = doc.get("empresa")
      tbody.append(td)

      td = document.createElement("td")
      td.innerHTML = doc.get("responsavelVisita")
      tbody.append(td)

      td = document.createElement("td")
      td.innerHTML = doc.get("status")
      tbody.append(td)

      td = document.createElement("td")
      td.innerHTML = doc.get("estadoVisita")
    
      tbody.append(td)

      td = document.createElement("td")
      td.innerHTML = doc.get("#")
      tbody.append(td)

      //Botão Visualizar
      let img = document.createElement("img")
      img.setAttribute("src", "Images/olho.png")
      img.setAttribute("class", "visualizar")
      img.setAttribute("alt", "Visualizar")
      img.setAttribute("id", "visualizar")
      tbody.appendChild(img)

      //Botão rever
    
      img = document.createElement("img")
      img.setAttribute("src", "Images/revisar.png")
      img.setAttribute("alt", "Revisar")
      img.setAttribute("id", "revisao")

      img.addEventListener("click", async () => {
        await updateDoc(doc.ref, { verificacao: false })
        await updateDoc(doc.ref, { tipo_cadastro: "Pré-Cadastro" })
        await updateDoc(doc.ref, { status: "" })
        console.log("Atualizado")
        location.reload()
      })

      tbody.appendChild(img)

      //Botão negar
      table.append(tbody)
      registro.append(table, valueCpf)
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
      })

      modal.style.display = "flex"
  
    
   // updateBtn.addEventListener("click", async()=>{
   //   let entrada = document.getElementById('entrada').value
   //   let saida = document.getElementById('nomeVisitante').value
  //    let nome = document.getElementById('nomeVisitante').value
   //   let rg = document.getElementById('rg').value
   //   let cpf = document.getElementById('cpf').value
   //   let emailVisitante = document.getElementById('emailVisitante').value
   //   let responsavelVisita = document.getElementById('responsavelVisita').value
   //   let setor = document.getElementById('setor').value
  //    let celular = document.getElementById('celular').value
    //  let periodoDe = document.getElementById('periodoDe').value
   //   let periodoAte = document.getElementById('periodoAte').value
   //   let empresa = document.getElementById('empresa').value
  //    let modelo_carro = document.getElementById('modelo_carro').value
   //   let placa_carro =  document.getElementById('placa_carro').value
   //   let observacao = document.getElementById('observacao').value
    })


    }



    modal.addEventListener("click", (event) => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });  