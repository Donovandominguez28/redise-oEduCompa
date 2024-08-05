//Arreglo que contiene las palabras para jugar
let arrayPalabras = [
    "GUITARRA", "ELEFANTE", "TURQUESA", "MARIELA", "TECLADO", "INGLATERRA",
    "COMPUTADORA", "PROGRAMACION", "JAVASCRIPT", "MATEMATICAS", "BIOLOGIA",
    "FISICA", "QUIMICA", "LITERATURA", "HISTORIA", "GEOGRAFIA", "FILOSOFIA",
    "ARTE", "MUSICA", "DEPORTES", "FUTBOL", "TENIS", "BALONCESTO", "NATACION",
    "CINE", "TEATRO", "TELEVISOR", "INTERNET", "RELOJ", "AVION"
];

//Arreglo que contiene las ayudas de cada palabra
let ayudas = [
    "Instrumento Musical", "Animal de la selva", "Es un color", "Nombre de mujer",
    "Hardware de computadora", "Es un Pais", "Dispositivo Electrónico", "Actividad Técnica",
    "Lenguaje de Programación", "Ciencia Exacta", "Ciencia de la Vida", "Ciencia Natural",
    "Ciencia de Sustancias", "Estudio de Libros", "Estudio del Pasado", "Estudio de la Tierra",
    "Estudio del Pensamiento", "Expresión Creativa", "Arte Sonoro", "Actividad Física",
    "Deporte de Pelota", "Deporte con Raqueta", "Deporte de Cancha", "Deporte Acuático",
    "Producción Audiovisual", "Espectáculo en Vivo", "Aparato Electrónico", "Red de Redes",
    "Dispositivo de Tiempo", "Medio de Transporte"
];

//variable que guarda la cantidad de palabras ya jugadas
let cantPalabrasJugadas = 0;

//Variable que guarda la cantidad de intentos restantes
let intentosRestantes = 5;

//variable que guarda el indice de la Palabra actual
let posActual;

//arreglo que contiene la palabra actual con la que estoy judando
let arrayPalabraActual = [];

//Cantidad de de letras acertadas por cada jugada
let cantidadAcertadas = 0;

//Arreglo que guarda cada letra en divs
let divsPalabraActual = [];

//Cantidad de palabras que debe acertar en cada jugada.
let totalQueDebeAcertar;

//Funcion que carga la  palabra nueva para jugar
function cargarNuevaPalabra(){
    //Aumento en uno cantidad de palabras jugadas y controlo si llego a su limite
    cantPalabrasJugadas++;
    if(cantPalabrasJugadas > arrayPalabras.length){
        //volvemos a cargar el arreglo
        arrayPalabras = [
            "GUITARRA", "ELEFANTE", "TURQUESA", "MARIELA", "TECLADO", "INGLATERRA",
            "COMPUTADORA", "PROGRAMACION", "JAVASCRIPT", "MATEMATICAS", "BIOLOGIA",
            "FISICA", "QUIMICA", "LITERATURA", "HISTORIA", "GEOGRAFIA", "FILOSOFIA",
            "ARTE", "MUSICA", "DEPORTES", "FUTBOL", "TENIS", "BALONCESTO", "NATACION",
            "CINE", "TEATRO", "TELEVISOR", "INTERNET", "RELOJ", "AVION"
        ];
        ayudas = [
            "Instrumento Musical", "Animal de la selva", "Es un color", "Nombre de mujer",
            "Hardware de computadora", "Es un Pais", "Dispositivo Electrónico", "Actividad Técnica",
            "Lenguaje de Programación", "Ciencia Exacta", "Ciencia de la Vida", "Ciencia Natural",
            "Ciencia de Sustancias", "Estudio de Libros", "Estudio del Pasado", "Estudio de la Tierra",
            "Estudio del Pensamiento", "Expresión Creativa", "Arte Sonoro", "Actividad Física",
            "Deporte de Pelota", "Deporte con Raqueta", "Deporte de Cancha", "Deporte Acuático",
            "Producción Audiovisual", "Espectáculo en Vivo", "Aparato Electrónico", "Red de Redes",
            "Dispositivo de Tiempo", "Medio de Transporte"
        ];
        cantPalabrasJugadas = 1;
    }

    //Selecciono una posicion random
    posActual = Math.floor(Math.random() * arrayPalabras.length);

    //Tomamos la palabra nueva
    let palabra = arrayPalabras[posActual];
    //cantidad de letras que tiene esa palabra
    totalQueDebeAcertar = palabra.length;
    //coloco en 0 la cantidad acertadas hata el momento
    cantidadAcertadas = 0;

    //Guardamos la palabra que esta en formato string en un arreglo
    arrayPalabraActual = palabra.split('');

    //limpiamos los contenedores que quedaron cargadas con la palabra anterior
    document.getElementById("palabra").innerHTML = "";
    document.getElementById("letrasIngresadas").innerHTML = "";

    //Cargamos la cantidad de divs (letras) que tiene la palabra
    for(let i = 0; i < palabra.length; i++){
        var divLetra = document.createElement("div");
        divLetra.className = "letra";
        document.getElementById("palabra").appendChild(divLetra);
    }

    //Selecciono todos los divs de la palabra
    divsPalabraActual = document.getElementsByClassName("letra");

    //setemos los intentos
    intentosRestantes = 5;
    document.getElementById("intentos").innerHTML = intentosRestantes;

    //Cargamos la ayuda de la pregunta
    document.getElementById("ayuda").innerHTML = ayudas[posActual];

    //elimino el elemento ya seleccionado del arreglo.
    arrayPalabras.splice(posActual, 1);
    ayudas.splice(posActual, 1);
}

//Llamada para cargar la primera palabra del juego
cargarNuevaPalabra();

//Detecto la tecla que el usuario presion
document.addEventListener("keydown", event => {
    //Controlo si la tecla presionada es una letra
    if(isLetter(event.key)){
        //Tomo las letras ya ingresadas hasta el momento
        let letrasIngresadas = document.getElementById("letrasIngresadas").innerHTML;
        //arma un a arreglo con las letras ingresadas
        letrasIngresadas = letrasIngresadas.split('');
        
        //controlo si la letra presionada ya ha sido ingresada
        if(letrasIngresadas.lastIndexOf(event.key.toUpperCase()) === -1){
            //variable bandera para saber si la letra ingresada esta en la palabra a descrubir
            let acerto = false;

            //Recorro el arreglo que contiene la palabra para verificar si la palabra ingresada esta
            for(let i = 0; i < arrayPalabraActual.length; i++){
                if(arrayPalabraActual[i] == event.key.toUpperCase()){//acertó
                    divsPalabraActual[i].innerHTML = event.key.toUpperCase();
                    acerto = true;
                    //Aumento en uno la cantidad de letras acertadas 
                    cantidadAcertadas = cantidadAcertadas + 1;
                }
            }
        
            //Controlo si acerto al menos una letra
            if(acerto){
                //controlamos si ya acerto todas
                if(totalQueDebeAcertar == cantidadAcertadas){
                    //asigno a cada div de la palabra la clase pintar para ponerlo en verde cada div
                    for(let i = 0; i < arrayPalabraActual.length; i++){
                        divsPalabraActual[i].className = "letra pintar";
                    }
                }
            }else{
                //No acerto, decremento los intentos restantes
                intentosRestantes = intentosRestantes - 1;
                document.getElementById("intentos").innerHTML = intentosRestantes;

                //controlamos si ya acabo todas la oportunidades
                if(intentosRestantes <= 0){
                    for(let i = 0; i < arrayPalabraActual.length; i++){
                        divsPalabraActual[i].className = "letra pintarError";
                    }
                    alert("Perdiste! Vuelve a jugar.");
                    cargarNuevaPalabra();
                }
            }

            //agrega la letra ingresada a las letras ya ingresadas que se visualizan
            document.getElementById("letrasIngresadas").innerHTML += event.key.toLocaleUpperCase() + " - ";
        }
    }
});

//Funcion que me determina si un caracter es una letra
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}
