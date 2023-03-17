import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where, setDoc }
from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyCT1mvPmNZ6MAUxVnga4vFqk5-oUxSrACc",
    authDomain: "projeto-tcc-bca68.firebaseapp.com",
    databaseURL: "https://projeto-tcc-bca68-default-rtdb.firebaseio.com",
    projectId: "projeto-tcc-bca68",
    storageBucket: "projeto-tcc-bca68.appspot.com",
    messagingSenderId: "334672042370",
    appId: "1:334672042370:web:ce02de20192a1a3d37d79b"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


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
      consulta: false
      
})
  window.location.href = "#";   
  });
}catch{}

if(document.location.pathname.includes("/aprov-novo.html")){
  const colecao = query(collection(db,"visitante"),where("consulta", "==", false))

  const arrayDocumentos = await getDocs(colecao)

    arrayDocumentos.forEach(doc =>{
      let sectionRegistro = document.getElementById('sectionRegistro')
      
      let registro = document.createElement('div')
      registro.setAttribute("class", "registro")

      let table = document.createElement("table")
      table.setAttribute("class", "table2")
      
      let tbody = document.createElement("tbody")

 
      //tbody

      let td = document.createElement("td");
      let image = document.createElement("img");
      image.setAttribute("class", "img-table")
      image.setAttribute("src","Images/olho.png")
      td.innerHTML = ""
      td.append(image)
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
      td.innerHTML = doc.get("entrada")
      tbody.append(td)

      td = document.createElement("td")
      td.innerHTML = doc.get("saida")
      tbody.append(td)

      //Botão aprovar
      let button = document.createElement("button")
      button.setAttribute("class", "btn")
      button.setAttribute("id", "aprovar")
     
      button.addEventListener("click", ()=>{
      alert('Funcionando')  
      setDoc(collection(db, "visitante"),{consulta: true})
          
      })
      
      button.innerHTML = "Aprovar"
      tbody.appendChild(button)

      //Botão negar

      button = document.createElement("button")
      button.setAttribute("class", "btn2")
      button.setAttribute("id", "negar")

 
      
      button.innerHTML = "Rejeitar"
      tbody.appendChild(button)


      table.append(tbody)
      registro.append(table)
      sectionRegistro.append(registro)
    })
  }


