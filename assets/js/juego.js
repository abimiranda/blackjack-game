/* 2C: 2 de Clubs-trebol */
/* 2D: 2 de diamonds-diamantes */
/* 2H: 2 de hearts/ corazones */
/* 2S: 2 de spades - espadas*/
let a = 2 + 2;
a = 3;
let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"]; //cartas especiales

let puntosJugador = 0;
let puntosComputadora = 0;
//Creo una funcion para crear el nombre de las cartas.-

//Referencias del html
//es una buena practica guardar los selectores del html por id o etiqueta en una const.
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo");

const puntosHTML = document.querySelectorAll("small");
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");

const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }
  for (let tipo of tipos) {
    //creo AC(A de trebol), JC(J de trebol) etc...
    for (let especial of especiales) {
      deck.push(especial + tipo);
    }
  }
  // console.log(deck);
  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};
console.log("impriendo array ordenado");
crearDeck();

// esta funcion me permite tomar una carta

const pedirCarta = () => {
  if (deck.length === 0) {
    //si ya no me quedan mas cartas para sacar doy un aviso
    throw "No hay cartas en el deck!";
  }

  const carta = deck.pop(); //tomo una carta del deck
  console.log("eliminando carta del array sin haber apretado el boton:", carta);
  console.log("deckkkkkk", deck);

  return carta;
};

//pedirCarta();

//sumamos el valor de las cartas tomadas
const valorCarta = (carta) => {
  // para saber el num de la carta en js tengo la opcion de que un string
  // puede ser tratado como array y de esa manera separar sus valores
  // por ejemplo de la carta 2D o 10S puedo tomar sus numeros así:

  const valor = carta.substring(0, carta.length - 1); //solo tomo sus numeros
  return isNaN(valor) //valor no es un numero?
    ? valor === "A"
      ? 11
      : 10 // si no es un num es una letra de las cartas especiales. Solo A vale 11, JQK valen 10
    : valor * 1; //si no es carta especial, multiplico el num * 1 para pasar el string 1 a numero 1.
  //estas ultimas 3 lineas son como un si, sino. Se traduce como si- si-entonces-entonces

  //   if (isNaN(valor)) {//no es valor un numero?
  //     console.log("no es un numero");
  //     //utilizo operador ternario si son las cartas especiales
  //     puntos = (valor === 'A') ? 11 : 10; //solo A vale 11, J,Q,K, valen 10
  //   } else {
  //     puntos =valor*1;//js me permite de esta manera pasar "valor"(que es un string) a un numero
  //     console.log(puntos ,"es un numero");
  //   }
};

// const valor = valorCarta(pedirCarta()); //pedircarta se ejecutará dentro de valor carta.
// console.log(valor);

//turno de la computadora
const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();
    puntosComputadora = puntosComputadora + valorCarta(carta);
    console.log("PUNTOS COMPUTADORA: ", puntosComputadora);
    //tomo la posicion 1 pq es el 1er 'p' que tengo y es el del jugador
    puntosHTML[1].innerText = puntosComputadora; // solo tengo 2 parrafos, que los voy a utilizar para guardar los puntos acumulados

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasComputadora.append(imgCarta);
  } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
  
  setTimeout(()=>{
    if(puntosComputadora===puntosMinimos){
      alert('nadie gana :(');
    }else if (puntosMinimos > 21){
      alert('computadora gana ');
    }else if(puntosComputadora > 21){
      alert('Jugador Gana');
    }else{
      alert('computadora gana');
    }
  },100);
  

};

//contador de puntos de cartas
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  puntosJugador = puntosJugador + valorCarta(carta);
  console.log("PUNTOS JUGADOR: ", puntosJugador);
  //tomo la posicion 0 pq es el 1er 'p' que tengo y es el del jugador
  puntosHTML[0].innerText = puntosJugador; // solo tengo 2 parrafos, que los voy a utilizar para guardar los puntos acumulados

  //creo cartas del jugador de forma dinamica
  //en el html debo crear: <img src="assets/cartas/10C.png" alt="" class="carta"/>
  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  divCartasJugador.append(imgCarta);

  if (puntosJugador > 21) {
    //si el jugador es mayor a 21 puntos
    console.warn("sorry perdiste lol");
    btnPedir.disabled = true; //deshabilito el botón para pedir mas carta
    btnDetener.disabled=true;
    turnoComputadora(puntosJugador);
    
  } else if (puntosJugador === 21) {
    console.warn("21, ganaste!");
    btnPedir.disabled = true;
    btnDetener.disabled=true;
    turnoComputadora(puntosJugador);
  }
});

btnDetener.addEventListener('click',()=>{
  btnPedir.disabled=true;
  btnDetener.disabled=true;

  turnoComputadora(puntosJugador);
});      


btnNuevo.addEventListener('click',()=>{
  console.clear();
  deck=[];   
  deck = crearDeck();
  puntosJugador = 0;
  puntosComputadora = 0;
  puntosHTML[0].innerText=0;
  puntosHTML[1].innerText =0;

  divCartasComputadora.innerHTML='';
  divCartasJugador.innerHTML='';

  btnPedir.disabled=false;
  btnDetener.disabled=false;

});