import { db } from "./modules.js"
import {collection,getDocs, query, where, updateDoc}
from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

const colecao = query(collection(db,"visitante"),where("verificacao", "==", true))

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
    valueCpf.setAttribute("type", "hidden")
    valueCpf.setAttribute("class", "valueCpf")
    valueCpf.value = doc.get("cpf")
   
    //tbody
    try{
        let td = document.createElement("td"); 
        td = document.createElement("td")
        td.innerHTML = doc.get("periodoDe")
        td.setAttribute("data-label","Data")
        tbody.append(td)
        
        td = document.createElement("td")
        td.setAttribute("id","nome")
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
          td.innerHTML = "Em aberto";
        } else{
          td.innerHTML = "Em andamento";
        }
        if(doc.get("saida") !== ""){
          td.innerHTML = "Finalizada"
        }
        td.setAttribute("data-label", "Visita");
        
        tbody.append(td)

        td = document.createElement("td")
        td.setAttribute("data-label","Aprovado/Rejeitado por")
        td.innerHTML = doc.get("#")
        tbody.append(td)

        //Botão VISUALIZAR
        td = document.createElement("td")
        let button = document.createElement("button")
        button.setAttribute("class", "visualizar")
        td.setAttribute("data-label","Ações")
        button.setAttribute("id", "visualizar")
        button.innerHTML = "Visualizar"
        td.append(button)
        tbody.appendChild(td)

        //Botão REVER
        button = document.createElement("button")
        button.setAttribute("id", "revisao")
        button.setAttribute("class","revisar")
        button.addEventListener("click", async () => {
          await updateDoc(doc.ref, { verificacao: false })
          await updateDoc(doc.ref, { tipo_cadastro: "Pré-Cadastro" })
          await updateDoc(doc.ref, { status: "" })
          console.log("Atualizado")
          location.reload()
        })
        button.innerHTML = "Revisar"

        td.append(button)
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
      })

      modal.style.display = "block"

      // hide the modal and reload the page
      modal.addEventListener("click", (event) => {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      });  
    })

  }

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
