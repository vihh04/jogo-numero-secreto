let listaDeNumSorteado = [];
let numLimite = 10;
let numeroSecreto = gerarNumeroAleatorio ();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um numero entre 1 e 10');
}

function gerarNumeroAleatorio() {
    let numEscolhido = parseInt(Math.random() * numLimite + 1);
    let qtdDeElementosNaLista = listaDeNumSorteado.length;

    if (qtdDeElementosNaLista == numLimite) {
        
        listaDeNumSorteado = [];
    }

    if (listaDeNumSorteado.includes(numEscolhido)) {
        return gerarNumeroAleatorio();
    } else
    listaDeNumSorteado.push(numEscolhido); 
    console.log (listaDeNumSorteado);
    return numEscolhido;
}


exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela ('h1', 'Acertou!');
        let palavraTentaiva = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o Número Secreto com ${tentativas} ${palavraTentaiva}!`
        exibirTextoNaTela ('p', mensagemTentativas );  
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O numero secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O numero secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}



function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
