/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



var scores, roundScore, activePlayer, gamePlaying, previousDice, diceTwo;

//edit HTML element using innerHTML
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; 

//var x = document.querySelector('#current-0').textContent;
//console.log(x);

//change value of CSS element
//this will hide the dice

init();

//the event for the eventListener is click and when click happens the button function is called
//callback function is calling the function from the event listener
//anonymous function is a function that does not have a name and that will not be called, it can only be used in the adeventlistener
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //1.Get random number
        //floor is to get integer intead of decimal
        var dice = Math.floor(Math.random() * 6) + 1;
        var diceTwo = Math.floor(Math.random() * 6) + 1;
        
        //2.Display the result for first dice
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        
        //Display the result for second dice
        var diceTwoDOM = document.querySelector('.diceTwo');
        diceTwoDOM.style.display = 'block';
        diceTwoDOM.src = 'dice-' + diceTwo + '.png';

        //3.Update the round score IF the rolled number was not a 1
        if (dice === 6 && previousDice === 6) {
            //Player looses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
        
        previousDice = dice;
            //IF activePlayer is 0 THEN(?) set activePlayer to 1 ELSE(:) set activePlayer to 0
            //NEXT PLAYER
            //activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            //roundScore = 0;
            //document.getElementById('current-0').textContent = '0';
            //document.getElementById('current-1').textContent = '0';

            //add the class if it is not there and remove it if its there
            //document.querySelector('.player-0-panel').classList.toggle('active');
            //document.querySelector('.player-1-panel').classList.toggle('active');

            //we wanna hide the dice when the player rolls a 1
            //document.querySelector('.dice').style.display = 'none';

            //remove and add a class text from the HTML
            //document.querySelector('.player-0-panel').classList.remove('active');
            //document.querySelector('.player-1-panel').classList.add('active');
        }
});

//we want to add an event listener for when we click on the hold button, and we want to call an anonymous function when we click on the button
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //add current score to global score
        //add the roundscore to the array of the current active player scores
        scores[activePlayer] += roundScore;

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won the game
        if(scores[activePlayer] >= gameLimit){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //next player
            nextPlayer();
        }
    }
});


function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    //add the class if it is not there and remove it if its there
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
        
    //we wanna hide the dice when the player rolls a 1
    document.querySelector('.dice').style.display = 'none';
};


document.querySelector('.btn-new').addEventListener('click', init);

//make a function to set everything as a new game
function init(){
    gameLimit = 0;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    previousDice = 0;
    //state variable = tells us the condition of a system, we need it when we want to remember something or the state of somthing
    //in this case we need to check if the game is being played or not
    gamePlaying = true;
    gameLimit = prompt("Please enter winning score");
    
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.diceTwo').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
};

//function to reset the current players score
function resetPlayer(){
    document.querySelector('#current-' + activePlayer).textContent = '0';
}




































