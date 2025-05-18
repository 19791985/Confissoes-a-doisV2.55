document.addEventListener("DOMContentLoaded", () => {
  const slideTitle = document.getElementById("slide-title");
  const btnToIntro = document.getElementById("btn-to-intro");
  const introScreen = document.getElementById("intro");
  const startBtn = document.getElementById("start-btn");
  const phaseSummaryScreen = document.getElementById("phase-summary");
  const quizContainer = document.getElementById("quiz-container");
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const resultScreen = document.getElementById("result");
  const summaryEl = document.getElementById("summary");
  const continueBtn = document.getElementById("continue-btn");

  let currentPhase = 0;
  let currentQuestionIndex = 0;
  let results = [];

  const phases = [
    { title: "Fase 1: Conexão Emocional", description: "Explora o que une os nossos corações e mentes. Nesta fase, exploramos as emoções, a ternura e a ligação afetiva como casal. As perguntas são construídas para fortalecer o diálogo íntimo, a empatia e a valorização do “nós”. Cada resposta representa uma nuance emocional diferente." },
    { title: "Fase 2: Intimidade e Confiança", description: "Descobre como confiam, tocam e se entregam." },
    { title: "Fase 3: Desejo e Curiosidade", description: "Aprofunda a curiosidade e a vontade de mais." },
    { title: "Fase 4: Fantasias e Ousadia", description: "Liberta os desejos mais intensos e secretos." },
    { title: "Fase 5: Complicidade Total", description: "Sela o amor com visão de futuro e entrega." }
  ];

  const questions = []; // <-- Deves colar aqui as tuas perguntas

  btnToIntro.addEventListener("click", () => {
    slideTitle.classList.remove("active");
    introScreen.classList.add("active");
  });

  startBtn.addEventListener("click", () => {
    introScreen.classList.add("hidden");
    showPhaseSummary();
  });

  continueBtn.addEventListener("click", () => {
    phaseSummaryScreen.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    showQuestion();
  });

  function showPhaseSummary() {
    const phase = phases[currentPhase];
    document.getElementById("phase-title").textContent = phase.title;
    document.getElementById("phase-description").textContent = phase.description;
    phaseSummaryScreen.classList.remove("hidden");
  }

  function showQuestion() {
    const q = questions[currentQuestionIndex];
    questionEl.textContent = q.question;
    answersEl.innerHTML = "";
    q.answers.forEach((a) => {
      const btn = document.createElement("button");
      btn.textContent = a.text;
      btn.onclick = () => {
        results.push(a.value);
        currentQuestionIndex++;
        if (currentQuestionIndex % 20 === 0 && currentQuestionIndex < questions.length) {
          currentPhase++;
          quizContainer.classList.add("hidden");
          showPhaseSummary();
        } else if (currentQuestionIndex < questions.length) {
          showQuestion();
        } else {
          showResult();
        }
      };
      answersEl.appendChild(btn);
    });
  }

  function showResult() {
    quizContainer.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    summaryEl.textContent = "Obrigado por responder!";
  }
});
