import { db, auth } from "./modules.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Criando novo usuário (funcionário)
signUp.addEventListener('click', () => {

  var funcao = document.getElementById('selectFuncao').value
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var username = document.getElementById('username').value;

  if(funcao == "Funcionário"){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const funcionarioRef = doc(db, "funcionario", userCredential.user.email); // Use o UID do usuário como ID do documento
      setDoc(funcionarioRef, {
        username: username,
        email: email,
        senha: password,
      })
      .then(() => {
        alert('Usuário criado');
      })
      .catch((error) => {
        console.error('Erro ao criar coleção de funcionários:', error);
      });
    })
    .catch((error) => {
      const errorCode = error.code;

      if (errorCode == "auth/email-already-in-use") {
        alert("Email já em uso");
        window.location.href = "#"
      } else if (errorCode == "auth/invalid-email") {
        alert("Email inválido");
      } else if (errorCode == "auth/weak-password") {
        alert("Digite uma senha com mais de 6 caracteres");
      } else if (errorCode == "auth/internal-error") {
        alert("Algo deu errado! Digite email e senha novamente");
      } else {
        alert(errorCode);
      }
    });
}else if(funcao == "Gestor/Diretor"){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const funcionarioRef = doc(db, "Gestao", userCredential.user.email); // Use o UID do usuário como ID do documento
      setDoc(funcionarioRef, {
        username: username,
        email: email,
        senha: password,
      })
      .then(() => {
        alert('Usuário criado');
      })
      .catch((error) => {
        console.error('Erro ao criar coleção de gestores:', error);
      });
    })
    .catch((error) => {
      const errorCode = error.code;

      if (errorCode == "auth/email-already-in-use") {
        alert("Email já em uso");
        window.location.href = "#"
      } else if (errorCode == "auth/invalid-email") {
        alert("Email inválido");
      } else if (errorCode == "auth/weak-password") {
        alert("Digite uma senha com mais de 6 caracteres");
      } else if (errorCode == "auth/internal-error") {
        alert("Algo deu errado! Digite email e senha novamente");
      } else {
        alert(errorCode);
      }
    });
  }
  else if(funcao == "Portária"){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const funcionarioRef = doc(db, "Portaria", userCredential.user.email); // Use o UID do usuário como ID do documento
      setDoc(funcionarioRef, {
        username: username,
        email: email,
        senha: password,
      })
      .then(() => {
        alert('Usuário criado');
      })
      .catch((error) => {
        console.error('Erro ao criar coleção de Portária:', error);
      });
    })
    .catch((error) => {
      const errorCode = error.code;

      if (errorCode == "auth/email-already-in-use") {
        alert("Email já em uso");
        window.location.href = "#"
      } else if (errorCode == "auth/invalid-email") {
        alert("Email inválido");
      } else if (errorCode == "auth/weak-password") {
        alert("Digite uma senha com mais de 6 caracteres");
      } else if (errorCode == "auth/internal-error") {
        alert("Algo deu errado! Digite email e senha novamente");
      } else {
        alert(errorCode);
      }
    });
  }
})

  
