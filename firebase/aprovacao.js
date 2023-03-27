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
        image.setAttribute("class", "img-table open-modal")
        image.setAttribute("src","Images/olho.png")
        let imageCount = 1;
        image.setAttribute("id", "openModal" + imageCount)
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
        td.innerHTML = doc.get("periodoDe")
        tbody.append(td)
  
        td = document.createElement("td")
        td.innerHTML = doc.get("periodoAte")
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

        
        async function getDocumentData(docId) {
          const docRef = doc(db, "visitante", docId);
          const docSnap = await getDocs(docRef);
          if (docSnap.exists()) {
            return docSnap.data();
          } else {
            console.log("No such document!");
          }
        }
     
        
        image.addEventListener("click", async () => {
          const data = await getDocumentData(doc.id);
          document.getElementById("nomeVisitante").innerHTML = data.nome;
          document.getElementById("empresaVisitante").innerHTML = data.empresa;
          document.getElementById("responsavelVisita").innerHTML = data.responsavelVisita;
          document.getElementById("periodoDeVisitante").innerHTML = data.periodoDe;
          document.getElementById("periodoAteVisitante").innerHTML = data.periodoAte;
          modal.style.display = "block";
        });
        
      }catch{}

    })


 
  //Contadores de Aprovações
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
  
  

    //Abrir/Fechar Modal
    var closeBtn = document.getElementsByClassName('close')[0];
    const openModalButtons = document.querySelectorAll(".open-modal");
    openModalButtons.forEach((button) => {
      button.addEventListener("click", () => {
        modal.style.display = "block";
      });

    modal.addEventListener("click", (event) => {
    if (event.target == modal) {
    modal.style.display = "none";
    }
    });

    
});

closeBtn.addEventListener('click', function() {
	modal.style.display = 'none';
});

  
