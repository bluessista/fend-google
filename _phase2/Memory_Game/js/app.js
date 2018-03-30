/*
 * Create a list that holds all of your cards
 */
var icons = [
    'bomb', 'bomb', 
    'diamond', 'diamond', 
    'bicycle', 'bicycle', 
    'hand-spock-o', 'hand-spock-o', 
    'bug', 'bug',
    'beer', 'beer',
    'anchor', 'anchor',
    'android', 'android'
];
var opened = []; //stores the cards
var match = 0;
var $scorePanel = document.querySelector('.score-panel');
var moves = 0;
var moveCount = document.querySelector('.moves');
var currentSeconds;
var second = 0;
var timer = document.querySelector('.time');
var ratingStars = document.querySelector('.fa-star');
var gameboard = document.querySelector('.gameboard');
var stars3 = 10;
var stars2 = 18;
var star1 = 30;
var allCardsOpen = icons.length / 2;
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
    resetTimer(currentSeconds);
    // second = 0;
    timer.innerHTML = (`${second}`);
    startTimer();
    addCardListener();
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
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

//Generate all Cards with shuffled Icons
const generateCards = (array) => {
    for(var i = 0; i < array.length; i++) {
        var card = gameboard.appendChild(document.createElement('li'));
        card.classList.add('card');
        card.innerHTML = '<i class="fa fa-'+icons[i]+'"></i>';
    };
}

// Handle Timer - restart when page is loaded
const resetTimer = (seconds) => {
    if(seconds) {
        clearInterval(seconds);
    }
}

const startTimer = () => {
    currentSeconds = setInterval(handleSeconds, 1000);
}

const handleSeconds = () => {
    timer.innerHTML = second;
    second = second + 1;
}

//Handle Rating
const handleRating = (moves) => {
    var rates = 3;
    if(moves > stars3 && moves < stars2) {
        ratingStars.classList.toggle('fa-star-o');
        rating = 2;
    } else if (moves > stars2 && moves < star1) {
        ratingStars.classList.toggle('fa-star-o');
        rating = 1;
    } else {
        ratingStars.classList.toggle('fa-star-o');
        rating = 0;
    }
    return { score: rating};
}

// Handle Card Moves
const addCardListener = () => {
    var cards = gameboard.querySelectorAll('.card');
    cards.forEach(handleCards);

    if (allCardsOpen === match) {
        handleRating(moves);
        var score = handleRating(moves).score;
        setTimeout(function () {
            winningPopUp(moves, score);
        }, 500);
    }
};

const handleCards = (card) => {
    card.addEventListener('click', function () {
        if(this.hasAttribute('show') || this.hasAttribute('match')) {
            return true;
        }
        var openCard = this.innerHTML;
        this.classList.add('open', 'show');
        opened.push(openCard);
        console.log(this);

        if(opened.length > 1) {
            if(openCard === opened[0]) {
                var cardsOpen = gameboard.querySelectorAll('.open');

                cardsOpen.forEach((el) => {
                    el.classList.add('match');
                });

                setTimeout(function() {
                    var cardsMatch = gameboard.querySelectorAll('.match');
                    cardsMatch.forEach((el) => {
                        el.classList.remove('open', 'show');
                    });
                }, successDelay);
                match++;
            } else {
                var cardsOpen = gameboard.querySelectorAll('.open');
                cardsOpen.forEach((el) => {
                    el.classList.remove('nomatch');
                    setTimeout(function() {
                        el.classList.remove('open', 'show');
                    }, successDelay);
                });
            }
            opened = [];
            moves++;
            handleRating(moves);
            moveCount.innerHTML = moves;
        }
    });
};

// Game Winner Popup Box via Sweetalert2.js
const winningPopUp = (moves, moveCount) => {
    swal({
		allowEscapeKey: false,
		allowOutsideClick: false,
		title: 'Congratulations! You Won!',
		text: 'With ' + moves + ' moves and ' + moveCount + ' Stars in ' + second + ' Seconds.\n Woooooo!',
		type: 'success',
		confirmButtonColor: '#7a43a4',
		confirmButtonText: 'Play again!'
	}).then(function (isConfirm) {
		if (isConfirm) {
			initGame();
		}
	})
}

//Restart Game Popup via Sweetalert2.js
const restartingPopUp = () => {
    swal({
		allowEscapeKey: false,
		allowOutsideClick: false,
		title: "You're tough!",
		text: "Are you sure you wanna play again?",
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#7a43a4',
		cancelButtonColor: '#f95c3c',
		confirmButtonText: 'Yes, Mam',
	}).then(function (isConfirm) {
		if (isConfirm) {
			initGame();
		}
	})
}
reset.addEventListener('click', restartingPopUp);

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
