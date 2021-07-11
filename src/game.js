console.log("oh hello!");

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {}
let acceptedAnswer = false;
let score = 0;
let counter = 0;
let availableQs = []

//load questions from JSON
/*let questions = []
  fetch("questions.json").then(res => {
    console.log(res);
    return res.json();
  }).then(loadedQuestions => {
    questions = loadedQuestions;
    startGame();
  }).catch(err => {
    console.log(err);
  });*/

  //load in questions using trivia API
  fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
          const formattedQuestion = {
              question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
        });
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });
  let questions = []
  fetch("questions.json").then(res => {
    console.log(res);
    return res.json();
  }).then(loadedQuestions => {
    questions = loadedQuestions;
    startGame();
  }).catch(err => {
    console.log(err);
  });

const CORRECT = 10;
const MAX_Questions = 3;


startGame = () => {
    score = 0;
    counter = 0;
    availableQs = [...questions];
    console.log(availableQs);
   
    getNewQuestion();
}

let getNewQuestion = () => {
  if(availableQs.length <= 0 || counter >= MAX_Questions) {
    localStorage.setItem('mostRecentScore',score);
    return window.location.assign('./end.html');
  }
 
    counter++; 
    progressText.innerText = `Question ${counter}/${MAX_Questions}`;
    //increase progress bar
    progressBarFull.style.width = `${(counter/MAX_Questions)*100}%`;
    let questionIndex = Math.floor(Math.random() * availableQs.length); 
    currentQuestion = availableQs[questionIndex];
    console.log(currentQuestion);
    question.innerText = currentQuestion.question;
    choices.forEach(choice => {
      const number = choice.dataset['number'];
      choice.innerText = currentQuestion['choice' + number];
    });
    availableQs.splice(questionIndex,1);
    acceptedAnswer = true;

};

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {

    if(!acceptedAnswer) {return};
      acceptedAnswer = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset['number'];      
      console.log(selectedAnswer,currentQuestion.answer);

      //show if answer is corret/incorrect, and update scrore;

      const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
      if(classToApply === 'correct'){
        incrementScore(CORRECT);
      }

      selectedChoice.parentElement.classList.add(classToApply);
      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();

      }, 2000);

  });
});


