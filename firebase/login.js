import { db, auth } from "./modules.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

login.addEventListener('click', async (e) => {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Verificar se o usuário existe no Firestore
    const funcionarioRef = doc(db, "funcionario", user.email);
    const funcionarioDoc = await getDoc(funcionarioRef);
    if (!funcionarioDoc.exists()) {
      throw new Error("Usuário não existe no Firestore");
    }

    alert('Usuário logado!');
    window.location.href = "https://ka1quegs.github.io/SCV/solicitacao";
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

  let ultimo_login = new Date()

  setDoc(funcionarioDoc, {
    ultimo_login: ultimo_login
  })
});
