// document.addEventListener('DOMContentLoaded', function() {}
// in the event the page does not capture the original questions.js, you can uncomment this function to verify and run the 
//this script as a function on the following page. This should not be needed for modern browsers. 

//this is our list of defined global varibles.  This will capture elements from the HTML doc, and apply elements/logic to the page.
  var startBtn = document.getElementById('start');
  var questionTitle = document.getElementById('question-title');
  var choicesContainer = document.getElementById('choices');
  var feedback = document.getElementById('feedback');
  var timer = document.getElementById('time');
  var initialsInput = document.getElementById('initials');
  var submitBtn = document.getElementById('submit');
  var wrapper = document.querySelector('.wrapper');
  var startScreen = document.getElementById('start-screen');
  var questionsScreen = document.getElementById('questions');
  var endScreen = document.getElementById('end-screen');
  var finalScore = document.getElementById('final-score');

  let currentQuestionIndex = 0;
  let timeLeft = 60;
  let timerInterval;
  let score = 0;


  //these are out event listeners that will run the functions startQuiz and save score when the start and submit buttons clicked.
  startBtn.addEventListener('click', startQuiz);
  submitBtn.addEventListener('click', saveScore);

  function startQuiz() {
    startScreen.classList.add('hide');
    questionsScreen.classList.remove('hide');
    startTimer();
    renderQuestion();
  }

  function renderQuestion() {
    var question = questions[currentQuestionIndex];
    questionTitle.textContent = question.question;
    choicesContainer.innerHTML = '';

    question.options.forEach((choice, index) => {
      var choiceBtn = document.createElement('button');
      choiceBtn.classList.add('choice');
      choiceBtn.textContent = choice;
      choiceBtn.setAttribute('data-index', index);
      choiceBtn.addEventListener('click', checkAnswer);
      choicesContainer.appendChild(choiceBtn);
    });
  }

  function checkAnswer(event) {
    var selectedOption = event.target;
    var selectedAnswer = parseInt(selectedOption.getAttribute('data-index'));
    var question = questions[currentQuestionIndex];

    if (question.options[selectedAnswer] === question.answer) {
      feedback.textContent = 'Correct!';
      score += 10;
    } else {
      feedback.textContent = 'Wrong!';
      timeLeft -= 15;
      if (timeLeft < 0) timeLeft = 0;
    }

    feedback.classList.remove('hide');
    setTimeout(() => {
      feedback.classList.add('hide');
    }, 1000);

    currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {
      endQuiz();
    } else {
      renderQuestion();
    }
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      timeLeft--;
      timer.textContent = timeLeft;

      if (timeLeft <= 0) {
        endQuiz();
      }
    }, 1000);
  }

  function endQuiz() {
    clearInterval(timerInterval);
    questionsScreen.classList.add('hide');
    endScreen.classList.remove('hide');
    finalScore.textContent = score;
  }

  function saveScore() {
    var initials = initialsInput.value.trim();
    if (initials !== '') {
      var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
      var newScore = { initials: initials, score: score };
      highScores.push(newScore);
      localStorage.setItem('highScores', JSON.stringify(highScores));
      location.href = 'highscores.html';
    }
  };
