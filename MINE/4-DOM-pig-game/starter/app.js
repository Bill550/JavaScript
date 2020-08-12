/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/




var scores, runScore, activePlayer, gamePlaying;
// Initionlize Funnction 
init();

/// FOr ROLL BUTTON
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {

        // To get Random Number
        var dice = Math.floor(Math.random() * 6) + 1;
        console.log(dice);
        // To Display the Result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        //Update the Round Score If Rolled Number was not a 1
        if (dice !== 1) {
            //Add Score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next Player
            nextPlayer();
        }
    }
});
/// For HOLD BUTTON
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add Current Score to Global Score
        scores[activePlayer] += roundScore;
        // Update The UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        // Check if Player Won The Game
        if (scores[activePlayer] >= 30) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;
        } else {
            // Next Player
            nextPlayer();
        }
    }
});
/// FOR SWITCHING PLAYERS
function nextPlayer (){
    //Next Player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    //For RedBox Scoring = 0
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Active Status

    // With Toggle (Toggle: It can add class if it's not there and remove if it's there)
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // Without Toggle 
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
};

// for NEW GAME
document.querySelector('.btn-new').addEventListener('click', init);
// Initionlize Funnction 
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    //state Variable (Tell The Sate of Variable ACtive Or Not)
    gamePlaying = true;

    // document.querySelector('#current-' + activePlayer).textContent = dice; // For editing In Only  Plain Text 
    // document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '<em>';   For editing in HTML
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
