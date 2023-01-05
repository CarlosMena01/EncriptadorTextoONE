/* Escuchamos algunos eventos */

window.addEventListener('load', () => {
    setTimeout(()=>{
        document.getElementsByClassName('focused')[0].style.display = 'none';
        document.querySelector('main').style.display = 'block';
    }, 500);

})

document.getElementById('txt-input').addEventListener('input', () => {
    text = document.getElementById('txt-input').value;
    if(/[^a-z\sñ,.¡!¿?]/.test(text)){
        document.getElementById('rule').style.color = "red";
        document.getElementById('rule').style.fontSize = "1.5vw";
    } else {
        document.getElementById('rule').style.color = "black";
        document.getElementById('rule').style.fontSize = "1vw";
    }
})

function reset(){
    /* Limpiamos el cuadro de input */
    document.getElementById("txt-input").value = "";
    /* Ocultamos los elementos no necesarios*/
    document.getElementById("txt-output").style.display = "none";
    document.getElementById("btn-copiar").style.display = "none";
    /* Mostramos el cuadro de texto y el botón de copiar */
    if ( window.screen.width < 992 ) {
        document.getElementById("image-output").style.display = "none";    
    } else {
        document.getElementById("image-output").style.display = "block";
    }
    document.getElementById("msg-title").style.display = "inline";
    document.getElementById("msg").style.display = "inline"
}

function showOutput(text){
    /* Limpiamos el cuadro de input */
    document.getElementById("txt-input").value = "";
    /* Ocultamos los elementos no necesarios*/
    document.getElementById("image-output").style.display = "none";
    document.getElementById("msg-title").style.display = "none";
    document.getElementById("msg").style.display = "none";
    /* Mostramos el cuadro de texto y el botón de copiar */
    document.getElementById("txt-output").style.display = "inline";
    document.getElementById("btn-copiar").style.display = "inline";
    /* Escribimos el texto encriptado */
    document.getElementById("txt-output").value = text;
}


function encriptar(txtOrigin) {
    let txtCifrado = txtOrigin.replace(/e/gm, "enter");
    txtCifrado = txtCifrado.replace(/o/gm, "ober");
    txtCifrado = txtCifrado.replace(/i/gm, "imes");
    txtCifrado = txtCifrado.replace(/a/gm, "ai");
    txtCifrado = txtCifrado.replace(/u/gm, "ufat");

    return txtCifrado;
}

function desencriptar(txtCifrado) {
    let txtFinal = txtCifrado.replace(/enter/gm,"e");
    txtFinal = txtFinal.replace(/ober/gm, "o");
    txtFinal = txtFinal.replace(/imes/gm, "i");
    txtFinal = txtFinal.replace(/ai/gm, "a");
    txtFinal = txtFinal.replace(/ufat/gm, "u");

    return txtFinal;
}

function validText(text){
    /*  Confimamos letras minusculas y sin acentos */
    if (/[^a-z\sñ,.¡!¿?]/.test(text)) {
        swal({
            icon: 'error',
            iconColor: '#b9ab9c',
            background: '#E3E0DE',
            title: 'Texto inválido',
            confirmButtonColor: '#b9ab9c',
            text: 'Solo se permiten letras minusculas y sin acento',
          });
        reset();
        return false;
    }
    /*  Confimamos que haya texto para encriptar */
    else if (text.length === 0) {
        swal({
            icon: 'error',
            iconColor: '#b9ab9c',
            background: '#E3E0DE',
            title: 'No hay mensaje',
            confirmButtonColor: '#b9ab9c',
            text: 'El campo de texto está vacio, escriba algo en el espacio indicado para continuar',
          });
        reset();
        return false;
    }
    else{
        return true;
    }
}

function btnEncriptar(){
    let txtOrigin = document.getElementById("txt-input").value;
    if (validText(txtOrigin)) {
        txtCifrado = encriptar(txtOrigin);
        showOutput(txtCifrado);
    }   
}

function btnDesencriptar(){
    let txtCifrado = document.getElementById("txt-input").value;
    if (validText(txtCifrado)) {
        txtOrigin = desencriptar(txtCifrado);
        showOutput(txtOrigin);
    }  
}

function btnCopiar(){
    let contenido = document.querySelector("#txt-output");
    contenido.select();
    document.execCommand("copy");
    /******** Animamos el mensaje de copiado *********/
    notify = document.getElementsByClassName("notificacion")[0];
    notify.style.display = "flex";
    notify.style.animation = "notification-in 0.5s cubic-bezier(0.250, 0.250, 0.750, 0.750) both";

    setTimeout(()=>{
        notify.style.animation = "notification-out 0.5s cubic-bezier(0.250, 0.250, 0.750, 0.750) both";
    }, 2000);

    setTimeout(()=>{
        notify.style.display = "none";
    }, 5000);

}


/*************************************/
/*  Ahora creamos las animaciones!!! */
var currentTime = 0;

/* Variables para las burbujas */
var counterArray = [1,1,1,1,1]; //Contador de ciclos
var periodsArray = [2,3,4,3.5,2.7]; //Periodo de cada burbuja
var position_left = [0, 20, 40, 60, 80]; //Posición a la izquierda de cada elemento
var radiusArray = [100,80,30,120, 90]; //Radios de cada burbuja 
var burbujas = document.getElementsByClassName("burbuja");   

function meditationAnimation(time){
    let position_top = 9*Math.sin((time/1000) * 2*Math.PI * 0.25) + 9  // Porcentaje entre 0% y 18% a 0.25 Hz
    
    document.getElementById("image-meditation").style.top = position_top + "%";
}

function burbleAnimation(time){

    for (let i = 0; i < burbujas.length; i++) {
        /*  
        Para cada burbuja calculamos su posición actual usando una recta
        la variable counterArray nos ayuda a saber cuando la burbuja termina un recorrido y a reiniciarlo
        */
        let position_top = -(100/periodsArray[i])* (time/1000) + 100*counterArray[i];

        // Asignamos el radio correspondiente
        burbujas[i].style.width = radiusArray[i] + "px";
        burbujas[i].style.height = radiusArray[i] + "px";

        // Posicionamos la burbuja donde corresponde
        burbujas[i].style.top = "calc(" + position_top + "% - "+ radiusArray[i] +"px)";
        burbujas[i].style.left = position_left[i] + "%";

        //Cada que la burbuja complete un ciclo
        if(position_top < 0){
            counterArray[i]++; //Contamos un ciclo para la burbuja especifica
            radiusArray[i] = Math.floor(Math.random() * (120 - 30) + 30); // Asignamos un radio entre 30 y 120
            position_left[i] = Math.floor(Math.random() * (18) + i*18); // Desplazamos lateralmente

        }
    }

}


function animation(){
    currentTime += 10; //Se anima cada 10ms

    meditationAnimation(currentTime);
    burbleAnimation(currentTime);
}

setInterval(animation, 10);