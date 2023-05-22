import { db, storage } from "./modules.js"
import {collection,getDocs, query, where, doc,getCountFromServer }
from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { ref,  getDownloadURL  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
import { getAuth, onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.email;

    // Consulta para obter o documento do funcionário pelo email
    const funcionariosRef = collection(db, 'funcionarios');
    const queryFuncionario = query(funcionariosRef, where('email', '==', uid));

    getDocs(queryFuncionario)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0]; 
          const nomeFuncionario = doc.get('username');

          const nomeUsuario = document.getElementById('nomeUsuario');
          nomeUsuario.innerHTML = nomeFuncionario;
          const cargo = doc.get('funcao')
          document.getElementById('cargo').innerHTML = cargo
          if (cargo == 'Funcionário' ) {
            // Permite acesso total ao gerente
            const cargoElement = document.getElementById('cargo');
            cargoElement.innerHTML = cargo;
            document.getElementById("aprovacao").style.display = "none"
            document.getElementById("consultaPortaria").style.display = "none"
            document.getElementById("historico").style.display = "none"
          }
          if (cargo == 'Gestor' || cargo == 'Diretor') {
            // Permite acesso total ao gerente
            const cargoElement = document.getElementById('cargo');
            cargoElement.innerHTML = cargo;
            document.getElementById("consultaPortaria").style.display = "none"
            
          } 
          if (cargo == 'Porteiro'){
            // Permite acesso total ao gerente
            const cargoElement = document.getElementById('cargo');
            cargoElement.innerHTML = cargo;
            document.getElementById("consulta").style.display = "none"
            document.getElementById("aprovacao").style.display = "none"
            window.location.href = "consulta-portaria.html"
          }
          if(cargo !== 'Funcionário' && cargo !== 'Gestor' && cargo !== 'Diretor' && cargo !== 'Porteiro'){
            window.location.href = 'errorpage.html'
          }
        }
      })
      .catch((error) => {
        console.log('Erro ao buscar o documento do funcionário:', error);
      });
  } else {
    window.location.href = 'login.html';
  }
});
const deslogar = document.getElementById('icone')
deslogar.addEventListener('click', () =>{
  signOut(auth).then(() => {
  // Sign-out successful.
  }).catch((error) => {
  // An error happened.
  });
  })



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
      let valueData = document.createElement("input")
      valueData.setAttribute("class", "valueData")
      valueData.value = doc.get("periodoDe")
      valueData.setAttribute("type", "hidden")
      td.append(valueData)
      tbody.append(td)
      
      td = document.createElement("td")
      td.innerHTML = doc.get("nome")
      td.setAttribute("data-label","Nome")
      let valueNome = document.createElement("input")
      valueNome.setAttribute("class", "valueNome")
      valueNome.value = doc.get("nome")
      valueNome.setAttribute("type", "hidden")
      td.append(valueNome)
      tbody.append(td)

      td = document.createElement("td")
      td.innerHTML = doc.get("empresa")
      td.setAttribute("data-label","Empresa")
      let valueEmpresa = document.createElement("input")
      valueEmpresa.setAttribute("class", "valueEmpresa")
      valueEmpresa.value = doc.get("empresa")
      valueEmpresa.setAttribute("type", "hidden")
      td.append(valueEmpresa)
      tbody.append(td)

      td = document.createElement("td")
      td.innerHTML = doc.get("responsavelVisita")
      td.setAttribute("data-label","Solicitante")
      let valueResponsavelVisita = document.createElement("input")
      valueResponsavelVisita.setAttribute("class", "valueResponsavelVisita")
      valueResponsavelVisita.value = doc.get("responsavelVisita")
      valueResponsavelVisita.setAttribute("type", "hidden")
      td.append(valueResponsavelVisita)
      tbody.append(td)

      td = document.createElement("td")
      td.innerHTML = doc.get("status")
      td.setAttribute("data-label","Status")
      let valueStatus = document.createElement("input")
      valueStatus.setAttribute("class", "valueStatus")
      valueStatus.value = doc.get("status")
      valueStatus.setAttribute("type", "hidden")
      td.append(valueStatus)
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
      td.innerHTML = doc.get("aprov_rejPor")
      if(doc.get('aprov_rejPor') == ""){
        td.innerHTML = "Em análise"
      }
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
      document.getElementById("aprov_rej").value = doc.get("aprov_rejPor")
      
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
    imgPhoto.src = "https://cdn-icons-png.flaticon.com/512/1361/1361728.png"
  });
  
  document.getElementById("imgPhoto").addEventListener('click', ()=>{
    
    modalFoto.style.display = "block"

    getDownloadURL(storageRef).then(function(url) {
      fotoModal.src = `${url}`
    
    }).catch(function(error) {
      fotoModal.src = "../images/user.png"
    });
    
  })

   // hide the modal when click out
    modalFoto.addEventListener("click", (event) => {
      if (event.target == modalFoto) {
        modalFoto.style.display = "none";
        
      }

    });
  
})
}
/*Input SEARCH*/

let registroItem = document.getElementsByClassName("registro")
let barraDePesquisa = document.getElementById("input-busca")
let filtro = document.getElementById("selectFiltro")

barraDePesquisa.addEventListener("input", function busca(){
    let paramBusca;

    switch (filtro.value){
        case "Procurar Por: Nome":
            paramBusca = document.getElementsByClassName("valueNome")
        break;

        case "Procurar Por: Data":
            paramBusca = document.getElementsByClassName("valueData")
        break;

        case "Procurar Por: Solicitante":
            paramBusca = document.getElementsByClassName("valueResponsavelVisita")
        break;

        case "Procurar Por: Status":
            paramBusca = document.getElementsByClassName("valueStatus")
        break;

        case "Procurar Por: Empresa":
            paramBusca = document.getElementsByClassName("valueEmpresa")
        break;
  
    }

    for (let i = 0; i < registroItem.length; i++){
        if (String(paramBusca[i].value).toLowerCase().includes(String(barraDePesquisa.value).toLowerCase())){
            registroItem[i].style.display = "flex"
        } else {
            registroItem[i].style.display = "none"
        }
    }
})



 //Contadores de Aprovações
 const coll = query(collection(db, "visitante"));
 const firstCounter = await getCountFromServer(coll);
   document.getElementById("count-total").innerHTML = firstCounter.data().count;
