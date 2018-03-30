/*
 * Create a list that holds all of your cards
 */
var icons = [
    'bomb', 'bomb', 
    'diamond', 'diamond', 
    'bicycle', 'bicycle', 
    'earlybirds', 'earlybirds', 
    'bug', 'bug',
    'beer', 'beer',
    'anchor', 'anchor',
    'android', 'android'
];
var opened = []; //stores the cards later
var match = 0;
var $scorePanel = document.querySelector('.score-panel');
var moves = 0;
var moveCount = document.querySelector('.moves');
var currentSeconds;
var second = 0;
var timer = document.querySelector('.time');
var ratingStars = document.querySelector('.fa-star');
var gameboard = document.querySelector('.gameboard');
var card = document.querySelector('.card');
var stars3 = 10;
var stars2 = 18;
var star1 = 30;
var successDelay = 400;
var reset = document.querySelector('.restart');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
var init = () => {
    var cards = shuffle(icons);
    generateCards(icons);

    // gameboard.innerHTML = '';
    // match = 0;
    // moves = 0;
    moveCount.innerHTML = ('0');
    // resetTimer(currentIndex);
    // second = 0;
    timer.innerHTML = (`${second}`);
 

}

// Shuffle function from http://stackoverflow.com/a/2450976
const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const generateCards = (array) => {
    for(var i = 0; i < array.length; i++) {
        var cardLi = gameboard.appendChild(document.createElement('li'));
        cardLi.classList.add('card');
        cardLi.innerHTML = '<i class="fa fa-'+icons[i]+'"></i>';
    };
}

// Game Winner
// const winningPopUp{
//     swal({

//     })
// }

init();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
