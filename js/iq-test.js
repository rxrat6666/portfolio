// время 
const TOTAL_TIME = 85; // секунды
let timeLeft = TOTAL_TIME;

// подгружаем элименты
const timerEl = document.getElementById("time");
const form = document.getElementById("iqForm");
const resultBlock = document.getElementById("result");
const resultText = document.getElementById("resultText");

// таймер
const timer = setInterval(() => {
  timeLeft--;
  timerEl.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timer);
    finishTest(true); // авто-завершение
  }
}, 1000);

// форма
form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearInterval(timer);
  finishTest(false);
});

//логика работы 
function finishTest(autoFinished) {
  const answers = new FormData(form);
  let score = 0;

  for (let value of answers.values()) {
    score += Number(value);
  }

  form.style.display = "none";
  resultBlock.classList.remove("hidden");

  // Градация 
  if (autoFinished) {
    resultText.textContent =
      "Время вышло. ты слишком долго думал";
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
      "средний уровень - посредственность";
  } else {
    resultText.textContent =
      "Максимальный результат. Но мы то знаем правду.";
  }
}

