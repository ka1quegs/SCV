import { db } from "./modules.js";
import { collection, getDocs, query, where, updateDoc, doc, getCountFromServer}
from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";



const docRef = collection(db, "visitante")
const subColecaoRef = collection(docRef, "registros");
const arrayDocumentosRegistros = await getDocs(subColecaoRef);

const arrayDocumentos = await getDocs(arrayDocumentosRegistros)

  arrayDocumentos.forEach((doc) =>{
    let sectionRegistro = document.getElementById('sectionRegistro')
    
   
   
      sectionRegistro.append(registro)

  }

)
