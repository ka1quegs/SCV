var firebaseConfig = {
    apiKey: "AIzaSyCKqEXYR_FHaV8w_YSAodWsOIMUhFwChdM",
    authDomain: "projetotcc-20e8a.firebaseapp.com",
    projectId: "projetotcc-20e8a",
    storageBucket: "projetotcc-20e8a.appspot.com",
    messagingSenderId: "952458800818",
    appId: "1:952458800818:web:8f311e49016617b0f7a3ab"
  };

  const openModal = document.getElementById('openRegisterModal')
  const modal = document.getElementById('modal')
  const closeModal = document.getElementById('closeRegisterModal')
  const registerForm = document.getElementById('register-form')

  firebase.initializeApp(firebaseConfig)
  
  const showRegisterModal = () => {
    modal.classList.toggle('is-active')
  }

  openModal.addEventListener('click', showRegisterModal)
  closeModal.addEventListener('click', showRegisterModal)

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const nome = registerForm['nome'].value
    const cpf = registerForm['cpf'].value
    const rg = registerForm['rg'].value
    const empresa = registerForm['empresaVisitante'].value
    const email = registerForm['email'].value
    const celular = registerForm['celular'].value
    const telefone = registerForm['telefone'].value
    const responsavelVisita= registerForm['responsavelVisita'].value
    const areaVisita = registerForm['areaVisita'].value
    const permissaoEstacionamento = registerForm['permissaoEstacionamento'].value
    const placaVeiculo = registerForm['placaVeiculo'].value
    const modeloVeiculo = registerForm['modeloVeiculo'].value
    const observacao = registerForm['observacao'].value
    const inicioVisita = registerForm['inicioVisita'].value
    const fimVisita = registerForm['fimVisita'].value

  })