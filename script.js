let quantidadeCartas = null;
let contaJogadas = 0;
let tempoEspera = null;
let primeiraCarta = null;
let segundos = 0;
let relogio = null;
const facesCartas = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];

solicitaNrCartas();

function solicitaNrCartas() {
    quantidadeCartas = prompt("Informe a quantidade (par) de cartas (4 a 14): ");

    while((quantidadeCartas < 4 || quantidadeCartas > 14) || quantidadeCartas % 2 != 0) {
        quantidadeCartas = prompt("Quantidade inválida! Informe números pares entre 4 e 14: ");
    }

    distribuiCartas();
}

function distribuiCartas() {
    
    let cartasMesa = [];
    for(let i = 0; i < quantidadeCartas/2; i++){
        cartasMesa.push(facesCartas[i]);
        cartasMesa.push(facesCartas[i]);
    }

    cartasMesa.sort(embaralhar);

    const elemento = document.querySelector("main");
    for(let i = 0; i < quantidadeCartas; i++){
        elemento.innerHTML += `<div class="carta" onclick="selecionarCarta(this)"><img src="images/back.png" class="traseira"/><img src="images/${cartasMesa[i]}.gif" class="frenteira"/></div>`;
    }
    
    iniciarRelogio();
}

function selecionarCarta(carta){

    contaJogadas++;
    if(contaJogadas % 2 != 0){       
        primeiraCarta = carta;
        virarCarta(carta);
    }
    else {
        virarCarta(carta);
        
        if(primeiraCarta.innerHTML == carta.innerHTML){
            quantidadeCartas -= 2;
            primeiraCarta.onclick = cancela;
            carta.onclick = cancela;
            setTimeout(verificaPar, 1000);
            function verificaPar(){
                let resposta = null;
                        if(quantidadeCartas == 0) {
                            clearInterval(relogio);
                            alert(`Você ganhou em ${contaJogadas} jogadas e ${segundos} segundos!`);
                            while(resposta != "sim" && resposta != "não") {
                                resposta = prompt("Deseja reiniciar a partida (sim/não)?");
                            }
                            if(resposta === "sim"){
                                resetarValores();
                                solicitaNrCartas();
                            }
                            else {
                                alert("Jogo finalizado.");
                            }
                        }
            }
        }
        else {
            setTimeout(virarCarta, 1000, primeiraCarta);
            setTimeout(virarCarta, 1000, carta);
        }
    }
}

function virarCarta(carta) {
    carta.classList.toggle("carta-virada");
}

function iniciarRelogio() {
    relogio = setInterval(atualizaRelogio, 1000);
}

function atualizaRelogio() {
    segundos++;
    document.querySelector(".relogio").innerHTML = segundos;
}

function embaralhar() { 
	return Math.random() - 0.2;
}

function cancela() {
    return false;
}

function resetarValores(){
    document.querySelector("main").innerHTML = "";
    segundos = 0;
    contaJogadas = 0;
    document.querySelector(".relogio").innerHTML = segundos;
}