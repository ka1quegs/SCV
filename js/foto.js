
/*
var video = document.querySelector('video');

navigator.mediaDevices.getUserMedia({video:true})
.then(stream =>{
    video.srcObject = stream;
    video.play()
})
.catch(error =>{
    console.log(error)
})

document.querySelector('button').addEventListener('click', () =>{
    var canvas = document .querySelector('canvas')
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    var context = canvas.getContext('2d')
})

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <video autoplay></video>
    <canvas></canvas>
    <button>Tirar foto</button>
    <script src="foto.js"></script>
</body>
</html>

*/