import { db } from "./modules.js"
import { collection, getDocs, query, where }
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

          if (cargo == 'Porteiro') {
            const cargoElement = document.getElementById('cargo');
            cargoElement.innerHTML = cargo;
            document.getElementById("aprovacao").style.display = "none"
            document.getElementById("consulta").style.display = "none"
          }

          if(cargo == 'Gestor' || cargo == 'Diretor'){
            window.location.href = "aprovacao.html"
          }

          if(cargo == 'Funcionário'){
            window.location.href = "solicitacao.html"
          }
          if(cargo !== 'Funcionário' && cargo !== 'Gestor' && cargo !== 'Diretor' && cargo !== 'Porteiro'){
            window.location.href = 'errorPage.html'
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
const deslogar = document.getElementById('signout')
deslogar.addEventListener('click', () =>{
  signOut(auth).then(() => {
  // Sign-out successful.
  }).catch((error) => {
  // An error happened.
  });
  })