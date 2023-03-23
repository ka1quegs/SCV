import { db } from "./modules.js"
import { collection, getDocs, query, where, updateDoc, getCountFromServer}
from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";


    const colecao = query(collection(db,"visitante"),where("verificacao", "==", false))
  
    const arrayDocumentos = await getDocs(colecao)
  
      arrayDocumentos.forEach(doc =>{
        let sectionRegistro = document.getElementById('sectionRegistro')
        
        let registro = document.createElement('div')
        registro.setAttribute("class", "registro")
  
        let table = document.createElement("table")
        table.setAttribute("class", "table2")
        
        let tbody = document.createElement("tbody")
  
   
        //tbody
        try{
        let td = document.createElement("td");
        let image = document.createElement("img");
        image.setAttribute("class", "img-table")
        image.setAttribute("src","Images/olho.png")
        image.setAttribute("onclick", "window.location.href='/visualizar.html';");
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
        button.addEventListener("click", async () => {
          await updateDoc(doc.ref, { verificacao: true } )
          console.log("verificação atualizado")
          location.reload()
        })
        button.addEventListener("click", async () => {
          await updateDoc(doc.ref, { status: "Aprovado" })
          console.log("verificação atualizado")
          location.reload()
        })
        button.innerHTML = "Aprovar"
        tbody.appendChild(button)
  
        //Botão negar
  
        button = document.createElement("button")
        button.setAttribute("class", "btn2")
        button.setAttribute("id", "rejeitar")
        button.addEventListener("click", async () => {
          await updateDoc(doc.ref, { verificacao: true })
          console.log("verificação atualizado")
          location.reload()
        })
        button.addEventListener("click", async () => {
          await updateDoc(doc.ref, { status: "Reprovado" })
          console.log("verificação atualizado")
          location.reload()
        })
        button.innerHTML = "Rejeitar"
  
        tbody.appendChild(button)
        table.append(tbody)
        registro.append(table)
        sectionRegistro.append(registro)
      }catch{}
    })
  
  
    const coll = query(collection(db, "visitante"));
    const firstCounter = await getCountFromServer(coll);
    document.getElementById("count-total").innerHTML = firstCounter.data().count;
  
    const coll2 = query(collection(db, "visitante"), where("verificacao", "==", false))
    const secondCounter = await getCountFromServer(coll2);
    document.getElementById("count-pendente").innerHTML = secondCounter.data().count;
  
    const coll3 = query(collection(db, "visitante"), where("status", "==", "Aprovado"))
    const thirdCounter = await getCountFromServer(coll3);
    document.getElementById("count-aprovada").innerHTML = thirdCounter.data().count;
  
    const coll4 = query(collection(db, "visitante"), where("status", "==", "Reprovado"))
    const fourthCounter = await getCountFromServer(coll4);
    document.getElementById("count-negada").innerHTML = fourthCounter.data().count;
  
  