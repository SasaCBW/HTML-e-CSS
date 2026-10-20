
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  // Menu responsivo
  const menuToggle = $("menu-toggle");
  const navigation = $("navigation");

  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
      menuToggle.textContent = "☰";
    });
  });

  // Demonstração interativa de tags HTML.
  const tagExamples = {
    h1: {
      title: "Título principal",
      description: "A tag h1 representa o título principal da página. Ela ajuda a organizar o conteúdo e a indicar o assunto mais importante.",
      code: '<h1>Olá, desenvolvedor!</h1>',
      preview: '<h1>Olá, desenvolvedor!</h1><p>Este é um título criado com HTML.</p>'
    },
    p: {
      title: "Parágrafo",
      description: "A tag p agrupa um bloco de texto. É útil para apresentar explicações, descrições, notícias e outros conteúdos.",
      code: "<p>Aprender HTML é o primeiro passo.</p>",
      preview: "<p>Aprender HTML é o primeiro passo.</p><p>Com prática, você constrói páginas cada vez melhores.</p>"
    },
    a: {
      title: "Link",
      description: "A tag a cria um link. O atributo href indica o destino que será aberto quando a pessoa clicar.",
      code: '<a href="https://developer.mozilla.org/">Aprender mais</a>',
      preview: '<h1>Continue aprendendo</h1><p><a href="https://developer.mozilla.org/" target="_blank" rel="noopener noreferrer">Abrir documentação HTML ↗</a></p>'
    },
    img: {
      title: "Imagem",
      description: "A tag img exibe uma imagem. O atributo src aponta para o arquivo e o atributo alt descreve a imagem para quem não consegue vê-la.",
      code: '<img src="assets/images/foto.jpg" alt="Descrição da foto">',
      preview: '<h1>Imagens na web</h1><p>A tag img exibe imagens no conteúdo.</p><img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" alt="Mesa de trabalho com computador e código">'
    },
    ul: {
      title: "Lista não ordenada",
      description: "A tag ul cria uma lista sem numeração. Cada item é colocado dentro de uma tag li.",
      code: "<ul>\\n  <li>HTML</li>\\n  <li>CSS</li>\\n</ul>",
      preview: "<h1>Fundamentos da web</h1><ul><li>HTML: estrutura</li><li>CSS: aparência</li><li>JavaScript: interação</li></ul>"
    },
    button: {
      title: "Botão",
      description: "A tag button cria um botão interativo. O comportamento depende do contexto e do JavaScript associado.",
      code: '<button type="button">Clique aqui</button>',
      preview: '<h1>Interatividade</h1><p>Botões permitem realizar ações.</p><button type="button" id="preview-demo-button">Clique aqui</button>'
    }
  };

  const tagButtons = document.querySelectorAll(".tag-item");
  const tagPreview = $("tag-preview");
  const tagTitle = $("tag-title");
  const tagDescription = $("tag-description");
  const tagCode = $("tag-code");

  function showTag(tagName) {
    const example = tagExamples[tagName];
    if (!example) return;

    tagButtons.forEach((button) => {
      const selected = button.dataset.tag === tagName;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    tagTitle.textContent = example.title;
    tagDescription.textContent = example.description;
    tagCode.textContent = example.code;
    tagPreview.innerHTML = example.preview;

    const demoButton = $("preview-demo-button");
    if (demoButton) {
      demoButton.addEventListener("click", () => {
        showToast("Você clicou no botão de exemplo!");
      });
    }
  }

  tagButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.classList.contains("active")));
    button.addEventListener("click", () => showTag(button.dataset.tag));
  });

  // Playground de CSS
  const liveCard = $("live-card");
  const radiusRange = $("radius-range");
  const paddingRange = $("padding-range");
  const radiusValue = $("radius-value");
  const paddingValue = $("padding-value");
  const radiusCode = $("radius-code");
  const paddingCode = $("padding-code");
  const backgroundValue = $("background-value");
  const colorButtons = document.querySelectorAll(".color-choice");

  let cardColor = "#7c3aed";

  function updatePlayground() {
    const radius = Number(radiusRange.value);
    const padding = Number(paddingRange.value);

    liveCard.style.setProperty("--card-color", cardColor);
    liveCard.style.borderRadius = `${radius}px`;
    liveCard.style.padding = `${padding}px`;

    radiusValue.textContent = `${radius}px`;
    paddingValue.textContent = `${padding}px`;
    radiusCode.textContent = `${radius}px`;
    paddingCode.textContent = `${padding}px`;
    backgroundValue.textContent = cardColor;
  }

  colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      cardColor = button.dataset.color;
      colorButtons.forEach((item) => {
        item.classList.toggle("selected", item === button);
      });
      updatePlayground();
    });
  });

  radiusRange.addEventListener("input", updatePlayground);
  paddingRange.addEventListener("input", updatePlayground);

  $("reset-playground").addEventListener("click", () => {
    cardColor = "#7c3aed";
    radiusRange.value = "20";
    paddingRange.value = "24";

    colorButtons.forEach((button) => {
      button.classList.toggle("selected", button.dataset.color === cardColor);
    });

    updatePlayground();
    showToast("Estilo restaurado!");
  });

  $("demo-button").addEventListener("click", () => {
    showToast("Botão funcionando! Você pode estilizar sua aparência com CSS.");
  });

  // Quiz educativo
  const questions = [
    {
      question: "Qual é a principal função do HTML?",
      answers: [
        "Criar a estrutura e organizar o conteúdo da página.",
        "Definir apenas as cores e fontes do site.",
        "Hospedar o site na internet.",
        "Editar fotografias."
      ],
      correct: 0,
      explanation: "Isso mesmo! O HTML organiza o conteúdo e a estrutura da página."
    },
    {
      question: "Para que serve o CSS?",
      answers: [
        "Armazenar dados de usuários.",
        "Controlar a aparência e o layout dos elementos.",
        "Substituir o navegador.",
        "Criar pastas automaticamente."
      ],
      correct: 1,
      explanation: "Correto! O CSS define cores, fontes, espaçamentos e layouts."
    },
    {
      question: "Qual tag representa um parágrafo em HTML?",
      answers: ["<title>", "<body>", "<p>", "<img>"],
      correct: 2,
      explanation: "A tag <p> é usada para marcar parágrafos."
    },
    {
      question: "Onde normalmente colocamos o arquivo style.css neste projeto?",
      answers: [
        "Dentro da pasta css.",
        "Dentro da pasta de imagens.",
        "Dentro da pasta js.",
        "Na pasta do navegador."
      ],
      correct: 0,
      explanation: "Isso! Neste projeto, o CSS fica em css/style.css."
    },
    {
      question: "Qual atributo da tag link conecta o HTML ao arquivo CSS?",
      answers: ["src", "alt", "href", "class"],
      correct: 2,
      explanation: "O atributo href indica o caminho do arquivo de estilos."
    },
    {
      question: "O que significa tornar um site responsivo?",
      answers: [
        "Fazer o site funcionar apenas no computador.",
        "Adicionar o maior número possível de imagens.",
        "Fazer o site se adaptar a diferentes tamanhos de tela.",
        "Usar somente letras maiúsculas."
      ],
      correct: 2,
      explanation: "Perfeito! Um layout responsivo se adapta a celulares, tablets e computadores."
    }
  ];

  let currentQuestion = 0;
  let score = 0;
  let answered = false;

  const questionText = $("question-text");
  const answerList = $("answer-list");
  const questionCounter = $("question-counter");
  const quizProgress = $("quiz-progress");
  const quizFeedback = $("quiz-feedback");
  const nextQuestion = $("next-question");
  const questionArea = $("quiz-question-area");
  const quizResult = $("quiz-result");

  function renderQuestion() {
    const item = questions[currentQuestion];
    answered = false;

    questionCounter.textContent = `PERGUNTA ${currentQuestion + 1} DE ${questions.length}`;
    quizProgress.style.width = `${(currentQuestion / questions.length) * 100}%`;
    questionText.textContent = item.question;
    answerList.replaceChildren();
    quizFeedback.textContent = "";
    quizFeedback.className = "quiz-feedback";
    nextQuestion.disabled = true;
    nextQuestion.textContent = currentQuestion === questions.length - 1
      ? "Ver resultado →"
      : "Próxima pergunta →";

    item.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-option";

      const letter = document.createElement("span");
      letter.className = "answer-letter";
      letter.textContent = String.fromCharCode(65 + index);

      const text = document.createElement("span");
      text.className = "answer-text";
      text.textContent = answer;

      button.append(letter, text);
      button.addEventListener("click", () => selectAnswer(index));
      answerList.appendChild(button);
    });
  }

  function selectAnswer(selectedIndex) {
    if (answered) return;
    answered = true;

    const item = questions[currentQuestion];
    const buttons = answerList.querySelectorAll(".answer-option");

    buttons.forEach((button, index) => {
      button.disabled = true;
      if (index === item.correct) button.classList.add("correct");
      if (index === selectedIndex && index !== item.correct) {
        button.classList.add("incorrect");
      }
    });

    if (selectedIndex === item.correct) {
      score++;
      quizFeedback.textContent = `✓ ${item.explanation}`;
      quizFeedback.classList.add("success");
    } else {
      quizFeedback.textContent = `Resposta incorreta. ${item.explanation}`;
      quizFeedback.classList.add("error");
    }

    quizProgress.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    nextQuestion.disabled = false;
  }

  function showResult() {
    questionArea.hidden = true;
    quizResult.hidden = false;
    quizProgress.style.width = "100%";
    $("score-value").textContent = `${score}/${questions.length}`;

    const percentage = (score / questions.length) * 100;
    let title;
    let description;
    let medal;

    if (percentage === 100) {
      title = "Incrível! Você acertou tudo!";
      description = "Você demonstrou um ótimo domínio dos fundamentos apresentados. Continue praticando e crie seu próximo projeto web.";
      medal = "🏆";
    } else if (percentage >= 67) {
      title = "Muito bem! Você está avançando.";
      description = "Você já compreendeu vários conceitos importantes. Revise as questões que errou e continue desenvolvendo suas habilidades.";
      medal = "✦";
    } else {
      title = "Sua jornada está começando!";
      description = "Aprender programação leva prática. Volte aos módulos, explore os exemplos e tente o desafio novamente.";
      medal = "🚀";
    }

    $("result-title").textContent = title;
    $("result-description").textContent = description;
    $("result-medal").textContent = medal;
  }

  nextQuestion.addEventListener("click", () => {
    if (!answered) return;

    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      renderQuestion();
    } else {
      showResult();
    }
  });

  function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    questionArea.hidden = false;
    quizResult.hidden = true;
    renderQuestion();
  }

  $("restart-quiz").addEventListener("click", restartQuiz);
  $("play-again").addEventListener("click", restartQuiz);

  // Mensagens rápidas sem dependências externas.
  let toastTimeout;

  function showToast(message) {
    const toast = $("toast");
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }

  // Inicializa os componentes.
  showTag("h1");
  updatePlayground();
  renderQuestion();
});
