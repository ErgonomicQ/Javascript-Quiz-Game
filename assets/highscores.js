    var highScoresList = document.getElementById('highscores');
    var clearBtn = document.getElementById('clear');
  //event listeners and function call. 
    displayHighScores();
    clearBtn.addEventListener('click', clearHighScores);
  
    function displayHighScores() {
        //our logical operator here will either be the high scores page OR nothing. 
      var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        //Bonus: this will sort our scores in decending order. 
      highScores.sort((a, b) => b.finalScore - a.finalScore);
  
      highScoresList.innerHTML = '';
        //We then check if there is in fact any scores. if there are none loaded from local storage (.legnth), then it'll just display
        // a string of "no high scores yet."
      if (highScores.length === 0) {
        var noScoreItem = document.createElement('li');
        noScoreItem.textContent = 'No high scores yet.';
        highScoresList.appendChild(noScoreItem);
      } else {
        highScores.forEach(function(score) {
          var scoreItem = document.createElement('li');
          scoreItem.textContent = `${score.initials}: ${score.finalScore}`;
          highScoresList.appendChild(scoreItem);
        });
      }
    }
  // This clears the high scores from local storage
    function clearHighScores() {
      localStorage.removeItem('highScores');
      displayHighScores();
    }
