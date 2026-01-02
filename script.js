// Perguntas do Quiz
const questions = [
  {
    question: "O que é engenharia social?",
    options: [
      "Um tipo de golpe que usa a manipulação das pessoas.",
      "Um vírus que invade computadores sozinho.",
      "Um programa para proteger o computador.",
    ],
    correct: 0,
  },
  {
    question: "Qual é o principal alvo da engenharia social?",
    options: ["A tecnologia do computador.", "As pessoas e seu comportamento.", "Somente empresas grandes."],
    correct: 1,
  },
  {
    question: "Um golpe de phishing normalmente tenta fazer você:",
    options: [
      "Atualizar o sistema operacional.",
      "Clicar em links falsos ou revelar informações pessoais.",
      "Instalar aplicativos de jogos.",
    ],
    correct: 1,
  },
  {
    question: "Qual atitude ajuda a evitar golpes de engenharia social?",
    options: [
      "Clicar rapidamente em links para resolver logo o problema.",
      "Compartilhar informações pessoais para 'confirmar sua identidade'.",
      "Desconfiar de mensagens estranhas e verificar a fonte.",
    ],
    correct: 2,
  },
  {
    question: "Por que o fator humano é considerado o elo mais fraco da segurança?",
    options: [
      "Porque as pessoas podem ser enganadas e manipuladas.",
      "Porque os computadores nunca têm problemas.",
      "Porque os antivírus fazem todo o trabalho sozinho.",
    ],
    correct: 0,
  },
]

let currentQuestion = 0
let score = 0

function startQuiz() {
  currentQuestion = 0
  score = 0
  showScreen("quiz-screen")
  loadQuestion()
}

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active")
  })
  document.getElementById(screenId).classList.add("active")
}

function loadQuestion() {
  const question = questions[currentQuestion]

  // Atualiza o contador
  document.getElementById("current-question").textContent = currentQuestion + 1
  document.getElementById("total-questions").textContent = questions.length

  // Atualiza a barra de progresso
  const progress = ((currentQuestion + 1) / questions.length) * 100
  document.getElementById("progress").style.width = progress + "%"

  // Carrega a pergunta
  document.getElementById("question-text").textContent = question.question

  // Carrega as opções
  const optionsContainer = document.getElementById("options-container")
  optionsContainer.innerHTML = ""

  question.options.forEach((option, index) => {
    const optionDiv = document.createElement("div")
    optionDiv.className = "option"
    optionDiv.textContent = option
    optionDiv.onclick = () => selectOption(index)
    optionsContainer.appendChild(optionDiv)
  })
}

function selectOption(selectedIndex) {
  const question = questions[currentQuestion]
  const options = document.querySelectorAll(".option")

  // Desabilita todas as opções
  options.forEach((option) => option.classList.add("disabled"))

  // Marca a resposta
  if (selectedIndex === question.correct) {
    options[selectedIndex].classList.add("correct")
    score++
  } else {
    options[selectedIndex].classList.add("wrong")
    options[question.correct].classList.add("correct")
  }

  // Aguarda 1.5 segundos antes de avançar
  setTimeout(() => {
    currentQuestion++
    if (currentQuestion < questions.length) {
      loadQuestion()
    } else {
      showResults()
    }
  }, 1500)
}

function showResults() {
  showScreen("result-screen")

  document.getElementById("score").textContent = score
  document.getElementById("total").textContent = questions.length

  let icon, title, message

  const percentage = (score / questions.length) * 100

  if (percentage === 100) {
    icon = "🏆"
    title = "EXCELENTE!"
    message = "Parabéns! Você tem um elevado conhecimento na segurança digital! Continue sempre atento aos golpes de engenharia social."
  } else if (percentage >= 80) {
    icon = "🌟"
    title = "MUITO BOM!"
    message = "Você tem um ótimo conhecimento sobre engenharia social! Algumas revisões e você será não cairá em golpes."
  } else if (percentage >= 60) {
    icon = "👍"
    title = "BOM!"
    message = "Você tem uma base sólida, mas ainda há espaço para melhorar. Continue estudando sobre segurança digital!"
  } else if (percentage >= 40) {
    icon = "📚"
    title = "PODE MELHORAR"
    message = "É importante aprender mais sobre engenharia social para se proteger melhor. Pratique mais!"
  } else {
    icon = "💪"
    title = "CONTINUE TENTANDO!"
    message = "A segurança digital é muito importante! Estude mais sobre o tema e tente novamente. Você consegue!"
  }

  document.getElementById("result-icon").textContent = icon
  document.getElementById("result-title").textContent = title
  document.getElementById("result-message").textContent = message
}

function restartQuiz() {
  startQuiz()
}
