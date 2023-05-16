import { db, storage} from "./modules.js"
import { collection, getDocs, query, where, updateDoc, getCountFromServer}
from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { ref, getDownloadURL  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";


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
          image.setAttribute("class", "img-table")
          image.setAttribute("src","Images/olho.png")
          td.setAttribute("data-label","Visualizar")

        
          td.innerHTML = ""
          td.append(image)
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
          td.setAttribute("data-label","Responsável")
          tbody.append(td)
    
          td = document.createElement("td")
          td.innerHTML = doc.get("periodoDe")
          td.setAttribute("data-label","Período De:")
          tbody.append(td)

          td = document.createElement("td")
          td.innerHTML = doc.get("periodoAte")
          td.setAttribute("data-label","Período Até")
          tbody.append(td)
    
          //Botão aprovar
          td = document.createElement("td")
          td.setAttribute("data-label","Ações")
          let button = document.createElement("button")
          button.setAttribute("class", "aprovar")
          button.setAttribute("id", "aprovar")
          button.addEventListener("click", async () => {
            await updateDoc(doc.ref, { verificacao: true } )
            await updateDoc(doc.ref, { status: "Aprovado" })
            await updateDoc(doc.ref, { pendente: false })
            await updateDoc(doc.ref, { tipo_cadastro: "Efetivo" })
            location.reload()
          })
          button.innerHTML = "Aprovar"
          td.appendChild(button)
           
          //Botão negar
          button = document.createElement("button")
          button.setAttribute("class", "rejeitar")
          button.setAttribute("id", "rejeitar")
          button.addEventListener("click", async () => {
            await updateDoc(doc.ref, { verificacao: true })
            await updateDoc(doc.ref, { pendente: false })
            await updateDoc(doc.ref, { status: "Rejeitado" })
            await updateDoc(doc.ref, { tipo_cadastro: "Efetivo" })
            location.reload()
          })
          button.innerHTML = "Rejeitar"
          td.appendChild(button)
          tbody.appendChild(td)
          table.append(tbody)
          registro.append(table,valueCpf)
          sectionRegistro.append(registro)
   
      }catch{}

    })

  //Contadores de Aprovações
    const coll = query(collection(db, "visitante"));
    const firstCounter = await getCountFromServer(coll);
      document.getElementById("count-total").innerHTML = firstCounter.data().count;
  
    const coll2 = query(collection(db, "visitante"), where("pendente", "==", true))
    const secondCounter = await getCountFromServer(coll2);
      document.getElementById("count-pendente").innerHTML = secondCounter.data().count;
  
    const coll3 = query(collection(db, "visitante"), where("status", "==", "Aprovado"))
    const thirdCounter = await getCountFromServer(coll3);
      document.getElementById("count-aprovada").innerHTML = thirdCounter.data().count;
  
    const coll4 = query(collection(db, "visitante"), where("status", "==", "Rejeitado"))
    const fourthCounter = await getCountFromServer(coll4);
      document.getElementById("count-negada").innerHTML = fourthCounter.data().count;

      
//Puxando informações de visitante para o Modal
let arrayRegistro = document.getElementsByClassName("img-table") //Abre modal quando é clicado no olho

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

      modal.style.display = "block"

      const imgPhoto = document.getElementById('imgPhoto');
  
        //Puxa a imagem para o visitante correspondente com o CPF
      const nomeArquivo = `${cpf}.jpg`;
      const storageRef = ref(storage, `images/${nomeArquivo}`);

      getDownloadURL(storageRef).then(function(url) {
        imgPhoto.src = `${url}`
      
      }).catch(function(error) {
        imgPhoto.src = "https://www.petz.com.br/blog/wp-content/uploads/2019/03/papagaio-que-fala-1280x720.jpg"
      });

      imgPhoto.addEventListener('click', ()=>{
        modalFoto.style.display = "block"
  
        getDownloadURL(storageRef).then(function(url) {
          fotoModal.src = `${url}`
        
        }).catch(function(error) {
          fotoModal.src = "https://www.petz.com.br/blog/wp-content/uploads/2019/03/papagaio-que-fala-1280x720.jpg"
        });
        
      })

    })}

    modal.addEventListener("click", (event) => {
      if (event.target == modal) {
        modal.style.display = "none";
        location.reload()
      }
    });  
    // hide the modal when click out
    modalFoto.addEventListener("click", (event) => {
      if (event.target == modalFoto) {
        modalFoto.style.display = "none";
        
      }

    });