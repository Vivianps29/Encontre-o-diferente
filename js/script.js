// Lista de emojis (começa fácil e vai progredindo)
const paresDeEmojis = [
    { comum: '🐶', diferente: '🐱' },
    { comum: '🚗', diferente: '🚕' },
    { comum: '🍏', diferente: '🍎' },
    { comum: '😀', diferente: '😃' },
    { comum: '🎈', diferente: '🎆' },
    { comum: '🐸', diferente: '🐢' }
];

// Variáveis globais de controle
let pontuacaoAtual = 0;
let metaDePontos = 5;
let tamanhoGradeAtual = 2;
let somLigado = false; // O som começa desligado por padrão (boas práticas de navegadores)

// Mapeando os elementos do DOM
const gridJogo = document.getElementById('grid-jogo');
const spanPlacar = document.getElementById('placar');
const spanFase = document.getElementById('fase');
const btnIniciar = document.getElementById('btn-iniciar');
const selectMeta = document.getElementById('meta-pontos');
const btnSom = document.getElementById('btn-som');
const musicaFundo = document.getElementById('musica-fundo');
const telaFinal = document.getElementById('tela-final');
const mensagemPontos = document.getElementById('mensagem-pontos');
const btnReiniciar = document.getElementById('btn-reiniciar');

// Adiciona o evento de clique no novo botão de reiniciar
btnReiniciar.addEventListener('click', voltarAoMenu);

// Configurando o volume da música para não estourar o ouvido da criança
musicaFundo.volume = 0.3;

// Eventos de clique
btnIniciar.addEventListener('click', iniciarJogo);
btnSom.addEventListener('click', alternarSom);

const botoesMeta = document.querySelectorAll('.opcao-meta');

botoesMeta.forEach(botao => {
    botao.addEventListener('click', () => {
        // Remove a classe 'selecionado' de todos
        botoesMeta.forEach(b => b.classList.remove('selecionado'));
        // Adiciona apenas no que foi clicado
        botao.classList.add('selecionado');
        
        // Atualiza a variável global da meta de pontos
        metaDePontos = parseInt(botao.dataset.valor);
    });
});

function iniciarJogo() {
    // Agora não pegamos mais do select, pois a variável metaDePontos 
    // já é atualizada pelo clique nos botões acima.
    
    pontuacaoAtual = 0;
    tamanhoGradeAtual = 2;
    
    atualizarPlacarNaTela();
    
    document.querySelector('.controles').style.display = 'none';
    gridJogo.classList.remove('grid-oculto');
    
    if (somLigado) {
        musicaFundo.play();
    }
    
    gerarRodada();
}

function alternarSom() {
    // Inverto o estado do som (se era true vira false, se era false vira true)
    somLigado = !somLigado;
    
    if (somLigado) {
        btnSom.textContent = "🔊";
        // Só dou play se o jogo já tiver começado (quando o grid não está oculto)
        if (!gridJogo.classList.contains('grid-oculto')) {
            musicaFundo.play();
        }
    } else {
        btnSom.textContent = "🔇";
        musicaFundo.pause();
    }
}

function gerarRodada() {
    gridJogo.innerHTML = ''; 
    gridJogo.style.gridTemplateColumns = `repeat(${tamanhoGradeAtual}, 1fr)`;
    
    const parSorteado = paresDeEmojis[Math.floor(Math.random() * paresDeEmojis.length)];
    const totalElementos = tamanhoGradeAtual * tamanhoGradeAtual;
    const posicaoDiferente = Math.floor(Math.random() * totalElementos);
    
    for (let i = 0; i < totalElementos; i++) {
        const cartao = document.createElement('div');
        cartao.classList.add('cartao-emoji');
        
        if (i === posicaoDiferente) {
            cartao.textContent = parSorteado.diferente;
            cartao.dataset.correto = "sim"; // Dataset autoral para marcar o alvo correto
        } else {
            cartao.textContent = parSorteado.comum;
            cartao.dataset.correto = "nao";
        }
        
        cartao.addEventListener('click', verificarClique);
        gridJogo.appendChild(cartao);
    }
}

function verificarClique(evento) {
    const cartaoClicado = evento.target;
    
    if (cartaoClicado.dataset.correto === "sim") {
        acertou();
    } else {
        errou();
    }
}

function acertou() {
    pontuacaoAtual++;
    atualizarPlacarNaTela();
    
    if (pontuacaoAtual >= metaDePontos) {
        finalizarJogo("Parabéns! Você encontrou todos os emojis diferentes! 🎉🏆");
    } else {
        // Aumenta a grade dinamicamente baseado nos acertos
        if (pontuacaoAtual === 2) tamanhoGradeAtual = 3; // 3x3
        if (pontuacaoAtual === 4) tamanhoGradeAtual = 4; // 4x4
        if (pontuacaoAtual === 6) tamanhoGradeAtual = 5; // Retém no limite máximo de 5x5
        
        gerarRodada();
    }
}

function errou() {
    // Mensagem amigável sem penalidade severa de pontos (foco no público infantil)
    alert("Ops! Esse emoji é igual. Procure bem o que está diferente!");
}

function atualizarPlacarNaTela() {
    spanPlacar.textContent = `Pontos: ${pontuacaoAtual} / ${metaDePontos}`;
    spanFase.textContent = `Grade: ${tamanhoGradeAtual}x${tamanhoGradeAtual}`;
}

function finalizarJogo() {
    gridJogo.innerHTML = '';
    gridJogo.classList.add('grid-oculto');
    
    // Pausa e reseta a música
    musicaFundo.pause();
    musicaFundo.currentTime = 0; 
    
    // Mostra a tela final no jogo
    mensagemPontos.textContent = `Você fez ${pontuacaoAtual} pontos!`;
    telaFinal.classList.remove('oculto');
}

function voltarAoMenu() {
    // Esconde a tela final e mostra o menu de missões novamente
    telaFinal.classList.add('oculto');
    document.querySelector('.controles').style.display = 'block';
    
    // Zera o placar na tela para ficar pronto para a nova partida
    pontuacaoAtual = 0;
    atualizarPlacarNaTela();
}function voltarAoMenu() {
    // Esconde a tela final e mostra o menu de missões novamente
    telaFinal.classList.add('oculto');
    document.querySelector('.controles').style.display = 'block';
    
    // Zera o placar na tela para ficar pronto para a nova partida
    pontuacaoAtual = 0;
    atualizarPlacarNaTela();
}