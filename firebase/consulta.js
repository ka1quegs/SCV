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
    tbody.setAttribute("class", "tabela-func")


    //tbody
    try{
    let td = document.createElement("td");
    td = document.createElement("td")
    td.innerHTML = doc.get("periodoDe")
    tbody.append(td)
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
    td.innerHTML = doc.get("visita")
    td.setAttribute("id","visita")
    tbody.append(td)

    td = document.createElement("td")
    td.innerHTML = doc.get("#")
    tbody.append(td)

    //Botão Visualizar
    let img = document.createElement("img")
    img.setAttribute("src", "Images/olho.png")
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
  console.log("consulta atualizado")
  location.reload()
})
img.addEventListener("click", async () => {
  await updateDoc(doc.ref, { status: "" })
  console.log("verificação atualizado")
  location.reload()
})
tbody.appendChild(img)


    //Botão negar
    table.append(tbody)
    registro.append(table)
    sectionRegistro.append(registro)
  }catch{}
})

//if(document.getElementById('visita'== "")){
 // set
//}