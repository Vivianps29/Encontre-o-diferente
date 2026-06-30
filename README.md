# Encontre o Diferente

## Desenvolvedor
Vivian Petrille da Silva.

## Mecânica escolhida e tema
A mecânica que eu escolhi foi "Encontre o Diferente" e o tema é "Emojis de frutas e carinhas".

## Briefing do cliente
O público-alvo são crianças de 6 anos.

## Regras do Jogo
- Escolha sua missão: **Curta (5 rodadas)** ou **Longa (10 rodadas)**
- Insira seu nome e clique em **Jogar**
- Encontre o emoji diferente em cada grade
- Cada acerto vale **1 ponto**
- Erros não descontam pontos, mas exibem um aviso
- O jogo termina quando todas as rodadas forem concluídas

## Seu diferencial
Além da mecânica principal de encontrar o emoji diferente, implementei uma progressão automática de dificuldade. Conforme o jogador avança, a grade aumenta de tamanho e, em algumas rodadas, os emojis passam de frutas para carinhas muito parecidas, tornando o desafio maior. Também adicionei uma música de fundo com um botão para ligar e desligar o som durante a partida.

## Como jogar
1. Escolha sua missão: Curta ou Longa
2. Digite seu nome
3. Clique em **Jogar**
4. Encontre o emoji diferente em cada grade
5. Tente fazer a maior pontuação possível!

## Como executar
Acesse esse link: https://encontreodiferente.netlify.app/

Ou, se preferir executar localmente:
- Clone ou baixe este repositório.
- Abra o arquivo index.html em um navegador.

## Reflexão
**1. Qual foi o bug mais chato e como resolveu?**

O bug mais chato foi o ranking não aparecendo na tela final. O problema era que o `id` da lista no HTML estava `"Lista-ranking"` com L maiúsculo, mas o JavaScript buscava `"lista-ranking"` com l minúsculo. Como `getElementById` é case-sensitive, o elemento nunca era encontrado. Corrigi padronizando o id em minúsculo nos dois arquivos.

**2. Por que escolheu essa fórmula de pontuação?**

Escolhi 1 ponto por acerto sem penalidade porque o público é uma criança de 6 anos, queria que ela se sentisse bem ao jogar, sem medo de errar. O objetivo é que ela se divirta e queira jogar de novo.

**3. Como o briefing do cliente mudou suas decisões?**

Pensar em uma criança de 6 anos mudou quase tudo, escolhi emojis coloridos e conhecidos como frutas, comecei com uma grade pequena de 2x2, removi qualquer limite de tempo e não coloquei penalidade por erro. Tudo para que a criança se sinta capaz e animada durante o jogo.

**4. Se tivesse mais uma semana, o que mudaria?**

Adicionaria efeitos sonoros de acerto e erro para dar mais feedback para a criança, e também animações de celebração ao acertar para tornar a experiência mais empolgante.

**5. Aponte uma função sua que ficou boa e explique o que ela faz.**

A função `gerarJogo()` ficou bem estruturada, ela define o tamanho da grade e o conjunto de emojis de acordo com o tipo de missão e a rodada atual, sorteia a posição do intruso aleatoriamente e cria cada cartão pelo DOM com seu evento de clique, tudo sem repetição de código.

## Minhas Decisões
**1. Tamanho e formato do grid**

Escolhi um grid dinâmico que vai aumentando gradualmente de acordo com a dificuldade do jogo. Ele evolui nos formatos 2×2, 3×3, 4×4 e 5×5. Isso faz com que o jogador comece com um nível de dificuldade mais baixo e avance para grades maiores e mais difíceis.

**2. Quantidade de cores/elementos**

Escolhi cores fortes como vermelho e amarelo porque são cores vibrantes e chamativas, facilitando a identificação dos elementos na tela. Os emojis foram escolhidos por serem familiares e coloridos para o público-alvo.

**3. Fórmula de pontuação (valor do acerto, custo do erro, combo/bônus?)**

Cada acerto concede 1 ponto e não há custos ou penalidades para os erros. Também optei por não incluir sistemas de combo ou bônus por tempo, mantendo a interface e a contagem de pontos o mais simples possível para que uma criança de 6 anos consiga acompanhar sua evolução sem frustrações.

**4. Critérios de tempo (partida e/ou rodada)**

Não coloquei limite de tempo por rodada para que, assim, a criança possa jogar no próprio ritmo sem ansiedade ou pressão.

**5. Curva de dificuldade**

A grade cresce suavemente e os emojis ficam mais parecidos a cada rodada para que a criança se sinta progredindo sem se sentir perdida de repente.

**6. Condição de término**

O jogo termina ao completar todas as rodadas do modo escolhido, exibindo uma mensagem de parabéns com o nome da criança para valorizar sua conquista e o ranking.


## Bônus Implementados

### Mecânica original
Implementei uma progressão automática de dificuldade. A função gerarJogo() verifica a rodada atual e altera o tamanho da grade e o conjunto de emojis utilizados. Nas primeiras fases são usadas frutas e grades menores; nas fases mais avançadas, a grade aumenta e os emojis passam a ser carinhas muito parecidas, tornando o desafio maior. Além disso, adicionei um botão para ligar e desligar a música de fundo usando os métodos .play() e .pause() do elemento <audio>.

### Ranking
Os 5 melhores jogadores são salvos no `localStorage` do navegador, então os recordes persistem mesmo após fechar o navegador. A lista é ordenada do maior para o menor e exibida na tela final.

### Responsividade
O jogo foi desenvolvido para funcionar bem no celular e no desktop, com largura máxima de 500px e grid adaptável ao tamanho da tela.

## Declaração de Uso de IA
Usei IA como apoio durante o desenvolvimento para identificar bugs, melhorar comentários do código e estruturar o README. Ela também me ajudou em algumas partes que eu não sabia como fazer, principalmente no CSS e na implementação para colocar o áudio. Todo o código entregue foi revisado e compreendido por mim, e as decisões de design e personalização do jogo foram minhas.

## Créditos — fontes de referência utilizadas (e o que adaptou de cada uma)
- Material disponibilizado pelo professor em aula — base para aprender manipulação do DOM e criação de elementos via JavaScript
- [MDN Web Docs — Manipulação do DOM](https://developer.mozilla.org/pt-BR/docs/Web/API/Document_Object_Model) — consultei para entender métodos como `createElement`, `appendChild` e `replaceChildren`
- [MDN Web Docs — localStorage](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage) — consultei para aprender a salvar e recuperar dados no navegador
- Apoio de IA para identificação de bugs, revisão e organização do README

## Licença do projeto
Este projeto está sob a licença MIT.
