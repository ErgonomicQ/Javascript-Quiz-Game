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


  //these are our event listeners that will run the functions startQuiz and save score when the start and submit buttons clicked.
  startBtn.addEventListener('click', startQuiz);
  submitBtn.addEventListener('click', saveScore);
//this function will hide the start screen HTML elements, the display the question portion of the game. It affects the class by removing and adding it.
//in the css file, this class has a display:none attibute. the easiest way to display, is to just... remove the class. 
  function startQuiz() {
    startScreen.classList.add('hide');
    questionsScreen.classList.remove('hide');
    startTimer();
    renderQuestion();
  }
//here's where the magic really happens:  This function renders the current question on the screen. 
//It sets the question title based on the current objects 'question' property within in the object, found on the previous JS.
  function renderQuestion() {
    var question = questions[currentQuestionIndex];
    questionTitle.textContent = question.question;
    choicesContainer.innerHTML = '';
//when the game runs it checks each object for an 'index' within the object and then loads-in the 'options' as a series of choices and gives it
//the 'choice' class. This will be useful shortly. Additionally it sets a data-index attribute that is the same as its index number in Questions.JS
    question.options.forEach((choice, index) => {
      var choiceBtn = document.createElement('button');
      choiceBtn.classList.add('choice');
      choiceBtn.textContent = choice;
      choiceBtn.setAttribute('data-index', index);
      choiceBtn.addEventListener('click', checkAnswer);
      choicesContainer.appendChild(choiceBtn);
    });
  }
//This function will activate on click of an answer. It parses the items data-index as a number, then compares that number to the one assigned to the 
//answer in the index from Questions.JS. if it's right. they user gets points, if it's wrong the user loses 15 seconds. 
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
//This is the feedback text that'll say if the users right or wrong. again, same trick as the above quiz. just remove the class and poof, there's your feedback.
// setTimeout makes it vanish after 1 second.
    feedback.classList.remove('hide');
    setTimeout(() => {
      feedback.classList.add('hide');
    }, 1000);


    //this increments to the next question.
    currentQuestionIndex++;
//the function will check if we've reached the end of the list after every answer. if it does, we run the endQuiz, otherwise, we go back to the top. 
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
//this will clear our interval, and then swap to the endscreen where the user may input their initials. Third trick hide trick.  
  //this function captures the remaining time, and the flat points the user earned from the questions, plus the bonus from the timer and outputs it
  // outputs it as a combinedScore. 
function endQuiz() {
    clearInterval(timerInterval);
    questionsScreen.classList.add('hide');
    endScreen.classList.remove('hide');
    var combinedScore = timeLeft + score;
    finalScore.textContent = combinedScore;
  }
// Finally, when then the game ends, it askes for an imput from the user of initials. This is parsed into a new value of highStore.
// the next thing that happens is a retrieval of existing scores first converting it into an array, 
// then it adds the intitals and score(which requires adding again) into a new varible called newScore It's pushed into highScores, and the new array stringifyed into text. 
// We'll grab this array later. The final step sends us right to the highscore page
  function saveScore() {
    var initials = initialsInput.value.trim();
    if (initials !== '') {
      var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
      var newScore = { initials: initials, finalScore: timeLeft + score };
      highScores.push(newScore);
      localStorage.setItem('highScores', JSON.stringify(highScores));
      location.href = 'highscores.html';
    }
  };
