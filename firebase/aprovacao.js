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
        let valueCpf = document.createElement("input")
        valueCpf.setAttribute("type", "hidden")
        valueCpf.setAttribute("class", "valueCpf")
        valueCpf.value = doc.get("cpf")
   
        //tbody
        try{
        let td = document.createElement("td");
        let image = document.createElement("img");
        image.setAttribute("class", "img-table open-modal")
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
          location.reload()
        })
        button.addEventListener("click", async () => {
          await updateDoc(doc.ref, { status: "Aprovado" })
          location.reload()
        })
        button.addEventListener("click", async () => {
          await updateDoc(doc.ref, { tipo_cadastro: "Efetivo" })
        })
        button.innerHTML = "Aprovar"
        tbody.appendChild(button)
  
        //Botão negar
  
        button = document.createElement("button")
        button.setAttribute("class", "btn2")
        button.setAttribute("id", "rejeitar")
        button.addEventListener("click", async () => {
          await updateDoc(doc.ref, { verificacao: true })
          location.reload()
        })
        button.addEventListener("click", async () => {
          await updateDoc(doc.ref, { status: "Reprovado" })
          location.reload()
        })
        button.innerHTML = "Rejeitar"
  
        tbody.appendChild(button)
        table.append(tbody)
        registro.append(table,valueCpf)
        sectionRegistro.append(registro)

        
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

//Puxando informações de visitante para o Modal
let arrayRegistro = document.getElementsByClassName("table2")

for (let i = 0; i < arrayRegistro.length; i++){
  arrayRegistro[i].addEventListener("click", async () => {

      const cpf = document.getElementsByClassName("valueCpf")[i].value

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
  
    })}