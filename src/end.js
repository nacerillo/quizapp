const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem("highScore")) || [];
const MAX_HIGH_SCORE = 5;
finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    //console.log(username.value);
    saveScoreBtn.disabled = !username.value;
})
saveHighScore = (e) =>{
    console.log("clicked!");
    e.preventDefault();
    const score = {
        score: mostRecentScore,
        name: username.value
    }
    highScores.push(score);
    highScores.sort((a,b) => {b.score - a.score});
    highScores.splice(MAX_HIGH_SCORE);
    
    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign("./index.html");
    console.log(highScores);
}


