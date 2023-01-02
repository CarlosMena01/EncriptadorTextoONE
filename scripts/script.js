function reset(){
    /* Limpiamos el cuadro de input */
    document.getElementById("txt-input").value = "";
    /* Ocultamos los elementos no necesarios*/
    document.getElementById("txt-output").style.display = "none";
    document.getElementById("btn-copiar").style.display = "none";
    /* Mostramos el cuadro de texto y el botón de copiar */
    document.getElementById("image-output").style.display = "block";
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
    if (/[^a-zñ ]/.test(text)) {
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