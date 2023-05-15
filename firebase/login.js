import { db, auth } from "./modules.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

login.addEventListener('click', async (e) => {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Verificar se o usuário existe no Firestore
    const funcionarioRef = doc(db, "funcionario", user.email);
    const gestaoRef = doc(db, "Gestao", user.email)
    const funcionarioDoc = await getDoc(funcionarioRef);
    const gestaoDoc = await getDoc(gestaoRef);
    if (!funcionarioDoc.exists() & !gestaoDoc.exists() ) {
      throw new Error("Usuário não existe no Firestore");
    }

    alert('Usuário logado!');

    updateDoc(funcionarioRef, {
      ultimo_login: new Date()
    })

    updateDoc(gestaoRef, {
      ultimo_login: new Date()
    })
  
  } catch (error) {
    const errorCode = error.code;

    if (errorCode === "auth/user-not-found") {
      alert("Usuário não existente, por favor realize o cadastro.");
    } else if (errorCode === "auth/invalid-email") {
      alert("Email inválido");
    } else if (errorCode === "auth/wrong-password") {
      alert("Email ou senha incorreta!");
    } else if (errorCode === "auth/internal-error") {
      alert("Ops, um erro ocorreu. Tente novamente mais tarde.");
    } else {
      alert("Ops, um erro ocorreu: " + errorCode);
    }
  }
  


});
