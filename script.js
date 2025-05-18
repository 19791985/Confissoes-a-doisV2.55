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

  const questions = [
    {
    question: "1-O que mais te faz sentir amada?",
    answers: [
      { text: "Palavras de carinho", value: "v1" },
      { text: "Gestos inesperados", value: "v2" },
      { text: "Tempo de qualidade juntos", value: "v3" },
      { text: "Toques afetuososD", value: "v4" },
      { text: "Ajuda nas tarefas do dia a dia", value: "v5" },
    ]
  },
  {
    question: "2-O que mais fortalece a tua ligação emocional com o teu parceiro?",
    answers: [
      { text: "Conversas profundas", value: "v1" },
      { text: "Rituais românticos", value: "v2" },
      { text: "Escuta ativa", value: "v3" },
      { text: "Rir juntos", value: "v4" },
      { text: "Momentos de silêncio partilhado", value: "v5" },
    ]
  },
  {
    question: "3-Como gostarias que o teu parceiro te acarinhasse mais?",
    answers: [
      { text: "Com mais palavras doces", value: "v1" },
      { text: "Com mais mimos físicos", value: "v2" },
      { text: "Com mais surpresas", value: "v3" },
      { text: "Com mais atenção às tuas emoções", value: "v4" },
      { text: "Com mais presença no quotidiano", value: "v5" },
    ]
  },
  {
    question: "4-Quando te sentes mais conectada?",
    answers: [
      { text: "Durante uma troca de olhares sincera", value: "v1" },
      { text: "Num abraço apertado", value: "v2" },
      { text: "Após uma boa conversa", value: "v3" },
      { text: "Em momentos de silêncio cúmplice", value: "v4" },
      { text: "Ao dormir juntinhos", value: "v5" },
    ]
  },
  {
    question: "5-Qual destas situações te deixaria mais feliz?",
    answers: [
      { text: "Receber uma carta de amor", value: "v1" },
      { text: "Um jantar surpresa", value: "v2" },
      { text: "Uma massagem sem motivo", value: "v3" },
      { text: "Uma noite a dois longe de tudo", value: "v4" },
      { text: "Ouvir 'amo-te' sem ser esperado", value: "v5" },
    ]
  },
  {
    question: "6. Qual a tua linguagem do amor preferida?",
    answers: [
    { text: "Palavras de afirmação", value: "linguagem_palavras" },
    { text: "Toque físico", value: "linguagem_toque" },
    { text: "Tempo de qualidade", value: "linguagem_tempo" },
    { text: "Gestos de serviço", value: "linguagem_ajuda" },
    { text: "Presentes simbólicos", value: "linguagem_presentes" }
  ]
},
{
  question: "7. Sentes-te confortável a expressar emoções?",
  answers: [
    { text: "Sim, totalmente", value: "aberta" },
    { text: "Às vezes", value: "moderada" },
    { text: "Só com quem confio", value: "reservada" },
    { text: "Prefiro guardar para mim", value: "fechada" },
    { text: "Depende do dia", value: "variável" }
  ]
},
{
  question: "8. Como gostas de ser surpreendida?",
  answers: [
    { text: "Com palavras românticas", value: "surpresa_palavras" },
    { text: "Com um jantar especial", value: "surpresa_jantar" },
    { text: "Com um beijo inesperado", value: "surpresa_beijo" },
    { text: "Com uma escapadinha", value: "surpresa_viagem" },
    { text: "Com um presente simbólico", value: "surpresa_presente" }
  ]
},
{
  question: "9. Qual destas situações te traz mais proximidade?",
  answers: [
    { text: "Conversar sobre sentimentos", value: "proximidade_conversa" },
    { text: "Partilhar silêncios", value: "proximidade_silencio" },
    { text: "Rir juntos", value: "proximidade_riso" },
    { text: "Abraçar por minutos", value: "proximidade_abraco" },
    { text: "Cuidar um do outro", value: "proximidade_cuidado" }
  ]
},
{
  question: "10. Quando te sentes mais conectada com o teu parceiro?",
  answers: [
    { text: "Durante conversas profundas", value: "conexao_conversa" },
    { text: "Quando ele me escuta", value: "conexao_escuta" },
    { text: "Quando me toca com ternura", value: "conexao_toque" },
    { text: "Quando rimos juntos", value: "conexao_riso" },
    { text: "Quando me respeita nas decisões", value: "conexao_respeito" }
  ]
},
  ]; // <-- Deves colar aqui as tuas perguntas

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
