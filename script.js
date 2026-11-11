// Lista de perguntas do quiz.
const perguntas = [

    {
        texto: "Qual é o resultado de 5 x 6?",
        opcoes: ["11", "30", "56", "25"],
        correta: 1
    },

    {
        texto: "Qual é o planeta conhecido como Planeta Vermelho?",
        opcoes: ["Vênus", "Júpiter", "Marte", "Saturno"],
        correta: 2
    },

    {
        texto: "Qual é o principal idioma falado no Brasil?",
        opcoes: ["Espanhol", "Inglês", "Francês", "Português"],
        correta: 3
    },

    {
        texto: "Qual órgão é responsável por bombear o sangue?",
        opcoes: ["Pulmão", "Coração", "Estômago", "Rim"],
        correta: 1
    },

    {
        texto: "Quanto é 100 dividido por 4?",
        opcoes: ["20", "25", "40", "50"],
        correta: 1
    }

];

// Variáveis do jogo.
let indiceAtual = 0;

let pontos = 0;

let respondeu = false;

// Elementos da página.
const perguntaEl = document.getElementById("pergunta");

const opcoesEl = document.getElementById("opcoes");

const feedbackEl = document.getElementById("feedback");

const progressoEl = document.getElementById("progresso");

const pontuacaoEl = document.getElementById("pontuacao");

const preenchimentoEl = document.getElementById("preenchimento");

const proximoBtn = document.getElementById("proximo");

const finalEl = document.getElementById("final");

// Mostra a pergunta atual.
function mostrarPergunta() {

    respondeu = false;

    proximoBtn.disabled = true;

    feedbackEl.textContent = "";

    const atual = perguntas[indiceAtual];

    perguntaEl.textContent = atual.texto;

    progressoEl.textContent =
    `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;

    pontuacaoEl.textContent = `Pontos: ${pontos}`;

    preenchimentoEl.style.width =
    `${(indiceAtual / perguntas.length) * 100}%`;

    opcoesEl.replaceChildren();

    atual.opcoes.forEach((opcao, indice) => {

        const botao = document.createElement("button");

        botao.textContent = opcao;

        botao.addEventListener("click", () => {

            verificarResposta(indice);

        });

        opcoesEl.appendChild(botao);

    });

}

// Verifica se a resposta está correta.
function verificarResposta(escolha) {

    if (respondeu) return;

    respondeu = true;

    const correta = perguntas[indiceAtual].correta;

    const botoes = opcoesEl.querySelectorAll("button");

    botoes.forEach((botao, indice) => {

        botao.disabled = true;

        if (indice === correta) {

            botao.classList.add("correta");

        }

        if (indice === escolha && escolha !== correta) {

            botao.classList.add("errada");

        }

    });

    if (escolha === correta) {

        pontos++;

        feedbackEl.textContent =
        "Muito bem! Resposta correta! 🎉";

    } else {

        feedbackEl.textContent =
        "Não foi dessa vez! A resposta correta está destacada.";

    }

    pontuacaoEl.textContent = `Pontos: ${pontos}`;

    proximoBtn.disabled = false;

}

// Finaliza o quiz.
function finalizar() {

    perguntaEl.hidden = true;

    opcoesEl.hidden = true;

    proximoBtn.hidden = true;

    feedbackEl.hidden = true;

    finalEl.hidden = false;

    preenchimentoEl.style.width = "100%";

    document.getElementById("resultadoFinal").textContent =
    `Você acertou ${pontos} de ${perguntas.length} perguntas!`;

}

// Passa para a próxima pergunta.
proximoBtn.addEventListener("click", () => {

    indiceAtual++;

    if (indiceAtual < perguntas.length) {

        mostrarPergunta();

    } else {

        finalizar();

    }

});

// Reinicia o jogo.
document.getElementById("reiniciar").addEventListener("click", () => {

    indiceAtual = 0;

    pontos = 0;

    perguntaEl.hidden = false;

    opcoesEl.hidden = false;

    proximoBtn.hidden = false;

    feedbackEl.hidden = false;

    finalEl.hidden = true;

    mostrarPergunta();

});

// Inicia o quiz.
mostrarPergunta();
