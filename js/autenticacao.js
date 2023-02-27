var btnLogin = document.getElementById('btnLogin');
var inputEmail = document.getElementById('inputEmail');
var inputPassword = document.getElementById('inputPassword');


btnLogin.addEventListener('click', function(){

    firebaseConfig.auth().signInWithEmailAndPassword(inputEmail.value,inputPassword.value).then(function(result){
        alert('Usuário conectado!');

    }).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;

        alert(errorMessage);
    });


});
