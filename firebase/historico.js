import { db } from "./modules.js"
import { collection, getDocs, getDoc, doc }
from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

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
  }
  
  // Chamar a função para mostrar o histórico na tela
  mostrarHistorico()


