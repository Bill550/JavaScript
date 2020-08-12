/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/




var scores, runScore, activePlayer, gamePlaying;

var lastRoll;
// Initionlize Funnction 
init();

/// FOr ROLL BUTTON
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {

        // To get Random Number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        console.log(dice1,dice2);
        // To Display the Result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';

        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        if (dice1 !== 1 && dice2 !== 1) { //Update the Round Score If Rolled Number was not a 1
            //Add Score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next Player
            nextPlayer();
        }
        // // If The User Rolled Six Two Time
        // if (dice === 6 && lastRoll === 6) {
        //     scores[activePlayer] = 0;
        //     document.querySelector('#score-' + activePlayer).textContent = '0';
        //     nextPlayer();
        // } else if (dice !== 1) {  //Update the Round Score If Rolled Number was not a 1
        //     //Add Score
        //     roundScore += dice;
        //     document.querySelector('#current-' + activePlayer).textContent = roundScore;
        // } else {
        //     //Next Player
        //     nextPlayer();
        // }
        // lastRoll = dice;

    }
});
/// For HOLD BUTTON
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add Current Score to Global Score
        scores[activePlayer] += roundScore;
        // Update The UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        // For Entering Specific no of game Will be Played
        var input = document.querySelector('.final-score').value;
        var winningScore;

        if (input) {
            winningScore = input
        } else {
            winnningScore = 100;
        }
        // Check if Player Won The Game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
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
function nextPlayer() {
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
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
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
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
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
