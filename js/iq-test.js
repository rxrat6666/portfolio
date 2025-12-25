// время теста
const TOTAL_TIME = 85;
let timeLeft = TOTAL_TIME;


// элементы страницы
const timerEl = document.getElementById("time");
const form = document.getElementById("iqForm");
const resultBlock = document.getElementById("result");
const resultText = document.getElementById("resultText");

const questions = document.querySelectorAll(".question");
const nextBtn = document.getElementById("nextBtn");
const finishBtn = document.getElementById("finishBtn");

let currentQuestion = 0;
nextBtn.disabled = true;


// стартовое состояние
questions.forEach(q => {
  q.classList.remove("show");
});

questions[0].classList.add("show");


// таймер
const timer = setInterval(() => {
  timeLeft--;
  timerEl.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timer);
    finishTest(true);
  }
}, 1000);


// активируем кнопку "Далее" после выбора ответа
questions.forEach(question => {
  const radios = question.querySelectorAll("input[type='radio']");

  radios.forEach(radio => {
    radio.addEventListener("change", () => {
      nextBtn.disabled = false;
      nextBtn.style.opacity = "1";
    });
  });
});


// переход к следующему вопросу
nextBtn.addEventListener("click", () => {
  // скрываем текущий вопрос
  questions[currentQuestion].classList.remove("show");

  currentQuestion++;
  nextBtn.disabled = true;

  // если следующий вопрос — последний
  if (currentQuestion === questions.length - 1) {
    nextBtn.classList.add("btn-hidden");
    finishBtn.classList.remove("btn-hidden");
  }

  // показываем следующий
  if (currentQuestion < questions.length) {
    requestAnimationFrame(() => {
      questions[currentQuestion].classList.add("show");
    });
  }
});


// отправка формы
form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearInterval(timer);
  finishTest(false);
});


// подсчет результата
function finishTest(autoFinished) {
  const answers = new FormData(form);
  let score = 0;

  for (let value of answers.values()) {
    score += Number(value);
  }

  form.style.display = "none";
  resultBlock.classList.remove("hidden");

  if (autoFinished) {
    resultText.textContent =
      "Время вышло. Ты слишком долго думал.";
    return;
  }

  if (score <= 5) {
    resultText.textContent =
      "Твой IQ настолько низок, что даже таймер был умнее тебя.";
  } else if (score <= 10) {
    resultText.textContent =
      "Ты стараешься выглядеть умным. Получается не всегда.";
  } else if (score <= 15) {
    resultText.textContent =
      "Средний уровень. Посредственность.";
  } else {
    resultText.textContent =
      "Максимальный результат. Не ври себе — мы то знаем правду.";
  }
}

