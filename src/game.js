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

let questions = 
[
  {
    "question": "Inside which HTML element do we put the JavaScript??",
    "choice1": "<script>",
    "choice2": "<javascript>",
    "choice3": "<js>",
    "choice4": "<scripting>",
    "answer": 1
  },
  {
    "question": "What is the correct syntax for referring to an external script called 'xxx.js'?",
    "choice1": "<script href='xxx.js'>",
    "choice2": "<script name='xxx.js'>",
    "choice3": "<script src='xxx.js'>",
    "choice4": "<script file='xxx.js'>",
    "answer": 3
  },
  {
    "question": " How do you write 'Hello World' in an alert box?",
    "choice1": "msgBox('Hello World');",
    "choice2": "alertBox('Hello World');",
    "choice3": "msg('Hello World');",
    "choice4": "alert('Hello World');",
    "answer": 4
  }
]
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

startGame();
