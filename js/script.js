const pontosP = document.getElementById("pontos");
const gradeG = document.getElementById("grade");
const areaJogo = document.getElementById("area-jogo");
const botaoJogar = document.getElementById("jogar");
const telaFinal = document.getElementById("tela-final");
const botaoReiniciar = document.getElementById("botao-reiniciar");
const botaoSom = document.getElementById("botao-som");
const musica = document.getElementById("musica-fundo");
const botaoCurta = document.getElementById("curta");
const botaoLonga = document.getElementById("longa");
const controlesC = document.querySelector(".controles");
const inputNome = document.getElementById("nome-jogador");
const listaRanking = document.getElementById("lista-ranking");

// Defini as variáveis globais
let pontos = 0;
let tamanho = 0;
let modoSelecionado = "";
let limiteRodadas = 5;
let rodadaAtual = 1;
let somTocando = false;
let nomeSalvo = "";

// Emojis simples
const emojisBase = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒"];
const emojisIntrusos = ["🍍", "🥝", "🫐", "🥭", "🍏", "🍑"];

// Emojis mais complexos
const carinhasBase = ["😀", "😃", "😄", "😁", "😆"];
const carinhasIntrusas = ["😅", "😂", "🤣", "😉", "😊"];

// Criei essee botão onde pode ligar e desligar o som.
botaoSom.addEventListener("click", () => {
    if (somTocando) {
        musica.pause();
        somTocando = false;
        botaoSom.textContent = "🔇";
    } else {
        musica.play();
        somTocando = true;
        botaoSom.textContent = "🔊";
    }
});

/* Fiz isso para guardar o tipo de missão que o jogador  escolheu (curta ou longa) para alterar a quantidade de rodadas e a dificuldade. */
botaoCurta.addEventListener("click", () => {
    modoSelecionado = "curto";
    limiteRodadas = 5;
    tamanho = 2;

    // Adiciona o destaque neste botão e tira do outro
    botaoCurta.classList.add("selecionado");
    botaoLonga.classList.remove("selecionado");
});

botaoLonga.addEventListener("click", () => {
    tamanho = 4;
    modoSelecionado = "longo";
    limiteRodadas = 10;

    botaoLonga.classList.add("selecionado");
    botaoCurta.classList.remove("selecionado");
});

// Isso não deixa que o jogo comece sem o jogador insira seu nome e escolha a missão.
botaoJogar.addEventListener("click", () => {
    if (tamanho === 0) {
        alert("Por favor, escolha a sua missão (Curta ou Longa) antes de jogar!");
        return;
    }
    if (inputNome.value.trim() === "") {
        alert("Por favor, digite seu nome antes de começar!");
        return;
    }

    nomeSalvo = inputNome.value; // Guarda o nome para o final do jogo.

    //Adicionei para resolver o problema do áudio não tocar desde o início do jogo.
    if (somTocando === false) {
        musica.play();
        somTocando = true;
        botaoSom.textContent = "🔊";
    }

    pontos = 0;
    rodadaAtual = 1;
    atualizarPontos();

    botaoJogar.classList.add("oculto");
    controlesC.classList.add("oculto");
    inputNome.classList.add("oculto");
    areaJogo.classList.remove("oculto");
    telaFinal.classList.add("oculto");

    gerarJogo();
});

function gerarJogo() {
    areaJogo.replaceChildren();

    let poolBase = emojisBase;
    let poolIntrusos = emojisIntrusos;

    //Deine as dificuldades baseados na missão escolhida.
    if (modoSelecionado === "curto") {
        if (rodadaAtual === 1) {
            tamanho = 2; 
        } else if (rodadaAtual === 2) {
            tamanho = 2;
            poolBase = carinhasBase;
            poolIntrusos = carinhasIntrusas;
        } else if (rodadaAtual === 3) {
            tamanho = 3;
        } else if (rodadaAtual === 4) {
            tamanho = 4;
        } else {
            tamanho = 5;
        }
    } else {
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

    gradeG.textContent = `GRADE: ${tamanho}x${tamanho}`;
    let total = tamanho * tamanho;

    // Sorteia a posição onde irá ficar o emoji intruso e quais emojis serão usados.
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

function atualizarPontos() {
    pontosP.textContent = "PONTOS: " + pontos;
}
/* Função que criei para esconder a área do jogo, exibir a tela final e salvar o placar.*/
function finalizarJogo() {
    areaJogo.replaceChildren();

    areaJogo.classList.add("oculto");
    telaFinal.classList.remove("oculto");
    
    const msgVitoria = document.getElementById("mensagem-vitoria");
    const msgPontos = document.getElementById("mensagem-pontos");

    msgVitoria.textContent = `Parabéns, ${nomeSalvo}!`;
    msgPontos.textContent = `Você terminou com ${pontos} pontos!`;

    salvarPlacar(nomeSalvo, pontos);
    renderizarRanking();
}

// Reseta o jogo para o estado inicial caso o jogador queira jogar de novo.
botaoReiniciar.addEventListener("click", () => {
    telaFinal.classList.add("oculto");
    botaoJogar.classList.remove("oculto");
    controlesC.classList.remove("oculto");
    inputNome.classList.remove("oculto");

    tamanho = 0;
    pontos = 0;
    rodadaAtual = 1;
    modoSelecionado = "";
    inputNome.value = "";
    gradeG.textContent = "GRADE: --"; 
    atualizarPontos();

    // Adicionei para remover o destaque dos dois botões para a próxima partida.
    botaoCurta.classList.remove("selecionado");
    botaoLonga.classList.remove("selecionado");
});

/* Uso o localStorage do navegador para salvar a pontuação, ordena do maior ao menor e guarda apenas os 5 melhores.*/
function salvarPlacar(nome, pontuacaoObtida) {

    let ranking = JSON.parse(localStorage.getItem("ranking_emojis")) || [];

    const novoRegistro = { nome: nome, pontos: pontuacaoObtida };

    ranking.push(novoRegistro);

    ranking.sort((a, b) => b.pontos - a.pontos);
    ranking = ranking.slice(0, 5);

    localStorage.setItem("ranking_emojis", JSON.stringify(ranking));
}

/* Essa função é responsável por mostrar o ranking na tela final, limpar a lista anterior, buscar os dados salvos e criar a lista dos jogadores. */
function renderizarRanking() {

    listaRanking.replaceChildren();

    const ranking = JSON.parse(localStorage.getItem("ranking_emojis")) || [];

    ranking.forEach((jogador) => {
        const li = document.createElement("li");
        
        li.textContent = `${jogador.nome.toUpperCase()} - ${jogador.pontos} PTS`;
        
        listaRanking.appendChild(li);
    });
}