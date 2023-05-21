import { db } from "./modules.js"
import { collection, getDocs, query,where }
from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";


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
const deslogar = document.getElementById('deslogar')
deslogar.addEventListener('click', () =>{
  signOut(auth).then(() => {
  // Sign-out successful.
  }).catch((error) => {
  // An error happened.
  });
  })




async function mostrarHistorico() {
    const colecao = collection(db, "visitante")
    const registros = []
  
    const arrayDocumentos = await getDocs(colecao)
  
    arrayDocumentos.forEach(async (doc) => {
      const registrosColecao = collection(doc.ref, "registros")
  
      const registrosDocumentos = await getDocs(registrosColecao)
  
      if (!registrosDocumentos.empty) {
        registrosDocumentos.forEach((registroDoc) => {
          registros.push({
            cpf: doc.id,
            dataRegistro: registroDoc.get("dataRegistro"),
            nome: registroDoc.get("nome"),
            entrada: registroDoc.get("entrada"),
            saida: registroDoc.get("saida"),
          })
        })
      }
    })
  
    // Esperar um tempo para aguardar a resolução das Promises
    await new Promise((resolve) => setTimeout(resolve, 500))
  
    // Ordenar os registros pelo campo "dataRegistro"
    registros.sort((a, b) => {
      const dataA = a.dataRegistro
      const dataB = b.dataRegistro
      return dataA > dataB ? -1 : dataA < dataB ? 1 : 0
    })
  
    let sectionHistorico = document.getElementById("sectionHistorico")
    sectionHistorico.innerHTML = ""
  
    registros.forEach((registro) => {
      let registroItem = document.createElement("div")
      registroItem.setAttribute("class", "visitas active")
  
      let table = document.createElement("table")
      table.setAttribute("id", "table2")
      table.setAttribute("class", "table")
      let tbody = document.createElement("tbody")
      let valueCpf = document.createElement("input")
      valueCpf.setAttribute("type", "hidden")
      valueCpf.setAttribute("class", "valueCpf")
      valueCpf.value = registro.cpf
  
      let td = document.createElement("td")
      td.innerHTML = registro.nome
      td.setAttribute("data-label", "Nome")
      td.classList.add("nome"); 
      tbody.append(td)
  
      td = document.createElement("td")
      td.innerHTML = registro.dataRegistro
      td.setAttribute("data-label", "Data")
      tbody.append(td)
  
      td = document.createElement("td")
      td.innerHTML = registro.entrada
      td.setAttribute("data-label", "Entrada")
      tbody.append(td)
  
      td = document.createElement("td")
      td.innerHTML = registro.saida
      td.setAttribute("data-label", "Saída")
      tbody.append(td)
  
      table.append(tbody)
      registroItem.append(table, valueCpf)
      sectionHistorico.append(registroItem)
    })
    const input = document.getElementById('input-busca');
    input.addEventListener('keyup', () => {
      const filter = input.value.toUpperCase();
      const visitas = document.getElementsByClassName('visitas');
      
      for (let i = 0; i < visitas.length; i++) {
        const nome = visitas[i].querySelector('.nome').textContent.toUpperCase();
        
        if (nome.includes(filter)) {
          visitas[i].style.display = '';
        } else {
          visitas[i].style.display = 'none';
        }
      }
    });
    

  }
  
  // Chamar a função para mostrar o histórico na tela
  mostrarHistorico()

