import { db, storage } from "./modules.js"
import {collection,getDocs, query, where, doc }
from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { ref,  getDownloadURL  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";


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
        button.innerHTML = "Visualizar"
        td.append(button)
        tbody.appendChild(td)

        
        table.append(tbody)
        registro.append(table,valueCpf)
        sectionRegistro.append(registro)
  }catch{}
})


let modal = document.getElementById("modal")
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
    
  // modal de HISTÓRICO

  var mod = document.getElementById("mod");
  var abre = document.getElementById("abre");
  var span = document.getElementsByClassName("close")[0];

  let sectionInfos = document.getElementById("registros-${cpf}")

  const mainDiv = document.createElement("div");
  mainDiv.setAttribute("id", "main");
  document.body.appendChild(mainDiv);

  const visitanteDiv = document.createElement("div");
  visitanteDiv.setAttribute("id", `visitante-${cpf}`);
  mainDiv.appendChild(visitanteDiv);

  abre.addEventListener("click", async () => {
    
    const cpf = document.getElementById("cpf").value;

    mod.style.display = "block";

    const docRef = doc(db, "visitante", cpf);
    const subcollectionRef = collection(docRef, "registros");

    const arrayDocumentosRegistros = await getDocs(subcollectionRef);

    // Limpa o conteúdo antigo do elemento "visitanteDiv"
    while (visitanteDiv.firstChild) {
      visitanteDiv.removeChild(visitanteDiv.firstChild);
    }

    arrayDocumentosRegistros.forEach((doc) => {
      let div = document.createElement("div");

      let table = document.createElement("table");

      let tbody = document.createElement("tbody");

      let tr = document.createElement("tr");

      let td = document.createElement("td");
      td.innerHTML = doc.get("dataRegistro");
      tr.appendChild(td);

      td = document.createElement("td");
      td.innerHTML = doc.get("entrada");
      tr.appendChild(td);

      td = document.createElement("td");
      td.innerHTML = doc.get("saida");
      tr.appendChild(td);

      td = document.createElement("td");
      td.innerHTML = doc.get("empresa");
      tr.appendChild(td);

      tbody.appendChild(tr);

      table.appendChild(tbody);

      div.appendChild(table);

      visitanteDiv.appendChild(div);
    });

    sectionInfos.appendChild(mainDiv);
  });


  span.addEventListener("click", async () => {
    mod.style.display = "none";
  });

  window.onclick = function (event) {
    if (event.target == mod) {
      mod.style.display = "none";
    }
  };


   // hide the modal and reload the page
      modal.addEventListener("click", (event) => {
        if (event.target == modal) {
          modal.style.display = "none";
          location.reload()
        }
        
      }); 
      //Puxa a imagem para o visitante correspondente com o CPF
  const nomeArquivo = `${cpf}.jpg`;
  const storageRef = ref(storage, `images/${nomeArquivo}`);

  getDownloadURL(storageRef).then(function(url) {
    imgPhoto.src = `${url}`
  
  }).catch(function(error) {
    
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


