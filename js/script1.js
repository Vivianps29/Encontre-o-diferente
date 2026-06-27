const pontosEl = document.getElementById("pontos");
const gradeEl = document.getElementById("grade");
const areaJogo = document.getElementById("area-jogo");
const botaoJogar = document.getElementById("jogar");
const telaFinal = document.getElementById("tela-final");
const btnReiniciar = document.getElementById("botao-reiniciar");
const btnSom = document.getElementById("botao-som");
const musica = document.getElementById("musica-fundo");
const btnCurta = document.getElementById("curta");
const btnLonga = document.getElementById("longa");
const controlesEl = document.querySelector(".controles");

// Defini as variáveis de controle de estado do jogo.
let pontos = 0;
let tamanho = 0;
let modoSelecionado = ""; // Vai guardar se é 'curto' ou 'longo'
let limiteRodadas = 5;
let rodadaAtual = 1;
let somTocando = false;

// emojis simples
const emojisBase = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒"];
const emojisIntrusos = ["🍍", "🥝", "🫐", "🥭", "🍏", "🍑"];

//emojis mais complexos
const carinhasBase = ["😀", "😃", "😄", "😁", "😆"];
const carinhasIntrusas = ["😅", "😂", "🤣", "😉", "😊"];

// Gerenciamento do botão de som para o diferencial do projeto
btnSom.addEventListener("click", () => {
    if (somTocando) {
        musica.pause();
        somTocando = false;
        btnSom.textContent = "🔇";
    } else {
        musica.play();
        somTocando = true;
        btnSom.textContent = "🔊";
    }
});

// escolher modo
btnCurta.addEventListener("click", () => {
    modoSelecionado = "curto";
    limiteRodadas = 5;
    tamanho = 2; // Apenas para passar da trava de segurança

    // Adiciona o destaque neste botão e tira do outro
    btnCurta.classList.add("selecionado");
    btnLonga.classList.remove("selecionado");
});

btnLonga.addEventListener("click", () => {
    tamanho = 4;
    modoSelecionado = "longo";
    limiteRodadas = 10;

    // Adiciona o destaque neste botão e tira do outro
    btnLonga.classList.add("selecionado");
    btnCurta.classList.remove("selecionado");
});

// iniciar jogo
botaoJogar.addEventListener("click", () => {
    if (tamanho === 0) {
        alert("Por favor, escolha a sua missão (Curta ou Longa) antes de jogar!");
        return;
    }

    if (somTocando === false) {
        musica.play();
        somTocando = true;
        btnSom.textContent = "🔊";
    }

    pontos = 0;
    rodadaAtual = 1;
    atualizarPontos();

    botaoJogar.classList.add("oculto");
    controlesEl.classList.add("oculto");
    areaJogo.classList.remove("oculto");
    telaFinal.classList.add("oculto");

    gerarJogo();
});

// gerar grid
function gerarJogo() {
    areaJogo.replaceChildren();

    let poolBase = emojisBase;
    let poolIntrusos = emojisIntrusos;

    // Defini a árvore de regras de dificuldade baseada no modo escolhido
    if (modoSelecionado === "curto") {
        // Regras da Partida Curta (5 rodadas)
        if (rodadaAtual === 1) {
            tamanho = 2; // 2x2 Fácil (Frutas)
        } else if (rodadaAtual === 2) {
            tamanho = 2; // 2x2 Emojis parecidos (Carinhas)
            poolBase = carinhasBase;
            poolIntrusos = carinhasIntrusas;
        } else if (rodadaAtual === 3) {
            tamanho = 3; // 3x3 Intermediário para suavizar a curva
        } else if (rodadaAtual === 4) {
            tamanho = 4; // 4x4 Desafio
        } else {
            tamanho = 5; // 5x5 Desafio Final!
        }
    } else {
        // Regras da Partida Longa (10 rodadas de progressão gradual)
        if (rodadaAtual <= 2) {
            tamanho = 2;
            if (rodadaAtual === 2) { poolBase = carinhasBase; poolIntrusos = carinhasIntrusas; }
        } else if (rodadaAtual <= 4) {
            tamanho = 3;
            if (rodadaAtual === 4) { poolBase = carinhasBase; poolIntrusos = carinhasIntrusas; }
        } else if (rodadaAtual <= 7) {
            tamanho = 4;
            if (rodadaAtual === 6 || rodadaAtual === 7) { poolBase = carinhasBase; poolIntrusos = carinhasIntrusas; }
        } else {
            tamanho = 5;
            if (rodadaAtual === 9 || rodadaAtual === 10) { poolBase = carinhasBase; poolIntrusos = carinhasIntrusas; }
        }
    }

    gradeEl.textContent = `GRADE: ${tamanho}x${tamanho}`;
    let total = tamanho * tamanho;

    let diferenteIndex = Math.floor(Math.random() * total);
    const emojiBaseSorteado = poolBase[Math.floor(Math.random() * poolBase.length)];
    const emojiIntrusoSorteado = poolIntrusos[Math.floor(Math.random() * poolIntrusos.length)];

    for (let i = 0; i < total; i++) {
        const div = document.createElement("div");
        div.classList.add("cartao");

        div.textContent = i === diferenteIndex ? emojiIntrusoSorteado : emojiBaseSorteado;

        div.addEventListener("click", () => {
            if (i === diferenteIndex) {
                pontos += 1; // 1 ponto por partida acertada
                rodadaAtual++;
                atualizarPontos();

                if (rodadaAtual > limiteRodadas) {
                    finalizarJogo();
                } else {
                    gerarJogo();
                }
            } else {
                alert("Poxa, não é esse! Procure com atenção");
            }
        });

        areaJogo.appendChild(div);
    }

    areaJogo.style.gridTemplateColumns = `repeat(${tamanho}, 1fr)`;
}

// atualizar pontos
function atualizarPontos() {
    pontosEl.textContent = "PONTOS: " + pontos;
}

function finalizarJogo() {
    areaJogo.replaceChildren();

    areaJogo.classList.add("oculto");
    telaFinal.classList.remove("oculto");

    const nomeJogador = prompt("Você encontrou todos! Qual é o seu nome?") || "Jogador Misterioso";
    
    const msgVitoria = document.getElementById("mensagem-vitoria");
    const msgPontos = document.getElementById("mensagem-pontos");

    msgVitoria.textContent = `Parabéns, ${nomeJogador}!`;
    msgPontos.textContent = `Você terminou com ${pontos} pontos!`;
}

// Reseta o jogo para o estado inicial caso o jogador queira jogar de novo.
btnReiniciar.addEventListener("click", () => {
    telaFinal.classList.add("oculto");
    botaoJogar.classList.remove("oculto");
    controlesEl.classList.remove("oculto");

    tamanho = 0;
    pontos = 0;
    rodadaAtual = 1;
    modoSelecionado = "";
    gradeEl.textContent = "GRADE: --"; 
    atualizarPontos();

    // Removo o destaque dos dois botões para a próxima partida
    btnCurta.classList.remove("selecionado");
    btnLonga.classList.remove("selecionado");
});