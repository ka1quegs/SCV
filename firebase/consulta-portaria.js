import { db, storage } from "./modules.js"
import { collection, getDocs, query, where, updateDoc, doc, getDoc, setDoc, getCountFromServer }
from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";


const colecao = query(collection(db, "visitante"), where("consulta", "==", true))
const arrayDocumentos = await getDocs(colecao)

arrayDocumentos.forEach(doc => {
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
  try {
    let valueVisita = ""
    let td = document.createElement("td");
    td = document.createElement("td")
    td.innerHTML = doc.get("periodoDe")
    td.setAttribute("data-label", "Data")
    tbody.append(td)

    td = document.createElement("td")
    td.innerHTML = doc.get("nome")
    td.setAttribute("data-label", "Nome")
    tbody.append(td)

    td = document.createElement("td")
    td.innerHTML = doc.get("empresa")
    td.setAttribute("data-label", "Empresa")
    tbody.append(td)

    td = document.createElement("td")
    td.innerHTML = doc.get("responsavelVisita")
    td.setAttribute("data-label", "Solicitante")
    tbody.append(td)

    td = document.createElement("td")
    td.innerHTML = doc.get("status")
    td.setAttribute("data-label", "Status")
    tbody.append(td)

    td = document.createElement("td");
    if (doc.get("entrada") === "") {
      valueVisita = "Em aberto"
      td.innerHTML = valueVisita;
    } else {
      valueVisita = "Em andamento"
      td.innerHTML = valueVisita;
    }
    if (doc.get("saida") !== "") {
      valueVisita = "Finalizada"
      td.innerHTML = valueVisita
    }
    td.setAttribute("data-label", "Visita");
    td.setAttribute("id", "andamentoVisita");
    tbody.append(td);

    td = document.createElement("td")
    td.innerHTML = doc.get("#")
    td.setAttribute("data-label", "Aprovado/Rejeitado por")
    tbody.append(td)

    //Botão Visualizar
    td = document.createElement("td")
    let button = document.createElement("button")
    button.setAttribute("class", "visualizar")
    td.setAttribute("data-label", "Ações")
    button.setAttribute("id", "visualizar")
    button.innerHTML = "Visualizar/Editar"
    td.append(button)
    tbody.appendChild(td)

    //Botão REVISAR
    button = document.createElement("button")
    button.setAttribute("id", "revisao")
    button.setAttribute("class", "revisar")
    if (doc.get("status") == "Pendente") {
      button.style.display = "none"
    }

    button.addEventListener("click", async () => {
      await updateDoc(doc.ref, { verificacao: false })
      await updateDoc(doc.ref, { pendente: true })
      await updateDoc(doc.ref, { tipo_cadastro: "Pré-Cadastro" })
      await updateDoc(doc.ref, { status: "Pendente" })
      await updateDoc(doc.ref, { entrada: "" })
      await updateDoc(doc.ref, { saida: "" })
      console.log("Atualizado")
      location.reload()
    })

    button.innerHTML = "Revisar"
    td.setAttribute("data-label", "Ações")
    td.append(button)
    tbody.appendChild(td)
    table.append(tbody)
    registro.append(table, valueCpf)
    sectionRegistro.append(registro)
  } catch { }
})

let modal = document.getElementById("modal")
//Puxando informações de visitante para o Modal
let arrayRegistro = document.getElementsByClassName("visualizar")

for (let i = 0; i < arrayRegistro.length; i++) {
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

    var video = document.querySelector('#video');
    const tirarFoto = document.getElementById('tirarFoto')
    const abrirCamera = document.getElementById("abrirCamera")
    const retirarFoto = document.getElementById('retirarFoto')

    abrirCamera.addEventListener("click", () => {
      modalCamera.style.display = "block"
      abrirCamera.style.display = "none"

    })

    fecharCamera.addEventListener("click", () => {
      modalCamera.style.display = "none"
      abrirCamera.style.display = "block"

    })
     // hide the modal and reload the page
     modalCamera.addEventListener("click", (event) => {
      if (event.target == modalCamera) {
        modalCamera.style.display = "none";
        abrirCamera.style.display = "block"
      }

    });

    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        video.srcObject = stream;
        video.play();
      })
      .catch(error => {
        console.log(error)
      })

    
    tirarFoto.addEventListener('click', () => {
      var canvas = document.querySelector('canvas');
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      var context = canvas.getContext('2d');
      context.drawImage(video, 0, 0);

      var confirmacao = confirm("Deseja salvar a foto?");
      if (confirmacao === true) {
        let nomeArquivo = `${cpf}.jpg`;
        let storageRef = ref(storage, `images/${nomeArquivo}`);
        
        canvas.toBlob((blob) => {
          uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
          });
          tirarFoto.style.display = "none"
          retirarFoto.style.display = "block"
          canvas.style.display = "block"
        });
      }
      

    });


    retirarFoto.addEventListener('click', () =>{
      var canvas = document.querySelector('canvas');
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      var context = canvas.getContext('2d');
      context.drawImage(video, 0, 0);
      
      canvas.style.display = "none";
      retirarFoto.style.display = "none";
      tirarFoto.style.display = "block";
      
    })

    const imgPhoto = document.getElementById('imgPhoto');
    
    //Puxa a imagem para o visitante correspondente com o CPF
    const nomeArquivo = `${cpf}.jpg`;
    const storageRef = ref(storage, `images/${nomeArquivo}`);

    getDownloadURL(storageRef).then(function(url) {
      imgPhoto.src = `${url}`
    
    }).catch(function(error) {
      
    });

    document.getElementById("imgPhoto").addEventListener('click', ()=>{
      modalFoto.style.display = "block"

      getDownloadURL(storageRef).then(function(url) {
        fotoModal.src = `${url}`
      
      }).catch(function(error) {
        
      });
      
    })

    // hide the modal when click out
    modalFoto.addEventListener("click", (event) => {
      if (event.target == modalFoto) {
        modalFoto.style.display = "none";
        
      }

    });

    //Quando clicado no botão updateBtn pega todos os valores dos Inputs do modal e atualiza o firestore para aquele usuario
    const updateBtn = document.getElementById("updateBtn")
    updateBtn.addEventListener("click", async () => {

      const nome = document.getElementById("nomeVisitante").value
      const email = document.getElementById("emailVisitante").value
      const celular = document.getElementById("celular").value
      const rg = document.getElementById("rg").value
      const empresa = document.getElementById("empresaVisitante").value
      const responsavelVisita = document.getElementById("responsavelVisita").value
      const setor = document.getElementById("setor").value
      const acesso_fabrica = document.getElementById("acesso_fabrica").value
      const estacionamento = document.getElementById("estacionamento").value
      const placa_carro = document.getElementById("placa_carro").value
      const modelo_carro = document.getElementById("modelo_carro").value
      const periodoDe = document.getElementById("periodoDe").value
      const periodoAte = document.getElementById("periodoAte").value
      const observacao = document.getElementById("story").value
      const entrada = document.getElementById("entrada").value
      const saida = document.getElementById("saida").value
      const docRef = doc(db, "visitante", cpf)
      await updateDoc(docRef, {
        nome: nome,
        emailVisitante: email,
        celular: celular,
        rg: rg,
        empresa: empresa,
        responsavelVisita: responsavelVisita,
        setor: setor,
        acesso_fabrica: acesso_fabrica,
        estacionamento: estacionamento,
        placa_carro: placa_carro,
        modelo_carro: modelo_carro,
        periodoDe: periodoDe,
        periodoAte: periodoAte,
        observacao: observacao,
        entrada: entrada,
        saida: saida
      })

      const registrosRef = collection(docRef, "registros");

      // Gera o ID do documento na subcoleção REGISTRO com a DATA ATUAL

      const hoje = new Date();

      const dia = new Date().getDate();
      const mes = new Date().getMonth();
      const ano = new Date().getFullYear();

      const documentId = `${hoje.getFullYear()}-${hoje.getMonth() + 1}-${hoje.getDate()}`;

      const documentoRegistro = await getDoc(doc(registrosRef, documentId));
      if (documentoRegistro.exists()) {
        const novoRegistroRef = doc(registrosRef, documentId);
        await setDoc(novoRegistroRef, {
          dataRegistro: `${dia}/${mes + 1}/${ano}`,
          entrada: entrada,
          saida: saida,
          empresa: empresa,
          cpf: cpf
        });
      } else {
        const novoRegistroRef = doc(registrosRef, documentId);
        await setDoc(novoRegistroRef, {
          dataRegistro: `${dia}/${mes + 1}/${ano}`,
          entrada: entrada,
          saida: saida,
          empresa: empresa,
          cpf: cpf
        });
      }
      location.reload()


    })

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


 //Contadores de Aprovações
 const coll = query(collection(db, "visitante"));
 const firstCounter = await getCountFromServer(coll);
   document.getElementById("count-total").innerHTML = firstCounter.data().count;
