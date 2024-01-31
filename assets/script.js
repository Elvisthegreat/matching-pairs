//images array
let images = [
"assets/images/foto1.webp",
"assets/images/foto2.webp",
"assets/images/foto3.webp",
"assets/images/foto4.webp",
"assets/images/foto5.webp",
"assets/images/foto6.webp",
"assets/images/foto7.webp",
"assets/images/foto8.webp",
"assets/images/foto9.webp",
"assets/images/foto10.webp"
];

// Declare a Restart game variable and add an EventListener to it for restart
document.getElementById('restart').addEventListener('click', restartGame);

let board = [];
let rows = 4;
let columns = 5;
// Game state
let firstCard ; // store the first card clicked
let secondCard; // store the second card clicked
let matchedCards = 0; // count the number of matched cards
let gameTime = 60; // global variable for the game time
let timerId; // global variable for the timer id


window.onload = function () {
    startGame();
};

function shuffleCards(cards) {
    let shuffledCards = [...cards, ...cards]; // Duplicate the images array to have pairs of each image
    // loop over the array from the last element to the second element
    for (let i = shuffledCards.length - 1; i > 0; i--) {
        // pick a random index from 0 to i
        let x = Math.floor(Math.random() * (i + 1));
        // swap the elements at i and x
        let temp = shuffledCards[i];
        shuffledCards[i] = shuffledCards[x];
        shuffledCards[x] = temp;
    }
    return shuffledCards;
}
const startGame = () => {
    // shuffle the cards and assign them to the board
    let shuffledCards = shuffleCards(images);
    gameTime --;
    //Arrange the board by 4x5
    for (let row = 0; row < rows; row++) {
        let roww = [];
        for (let column = 0; column < columns; column++) {
            let cardImg = shuffledCards.pop();
            roww.push(cardImg);

            // Create the html image tag
            let card = document.createElement("img");
            card.id = row.toString() + "." + column.toString();
            card.src = cardImg;
            card.classList.add("card");
            // EventListener for the clickCard
            card.addEventListener('click', clickCard);
            document.getElementById("board").append(card);
        }
        board.push(roww);
    }

};
// Give few second to view card before showing front side
setTimeout(frontCard, 1000);
function frontCard(){
    
    for(let row = 0; row < rows; row++){
        for(let column = 0; column < columns; column++){
            let card = document.getElementById(row.toString() + "." + column.toString());
            card.src = "assets/images/back.jpg"
        }
    }
}

// Add an event listener to each card
function clickCard() {
    if (this.src.includes("back")) {
        if(!firstCard){
            firstCard = this;
            let row = firstCard.id.split('.')[0];
            let column = this.id.split(".")[1];
            this.src = board[row][column];
            this.classList.add("flipped");
        }else if(!secondCard && this != firstCard){
            secondCard = this;
            let row = secondCard.id.split('.')[0];
            let column = this.id.split(".")[1];
            this.src = board[row][column] ;
            this.classList.add("flipped");
            lookForMatch();
        }
    }

    // Start the timer that will update the game time every second
    timerId = setInterval(() => {
        gameTime--; // decrement the game time by one
        document.getElementById("time").textContent = gameTime; // display the game time on the screen
    }, 1000);
}

  function lookForMatch() {
    // Compare the sources of the first and second cards
    if (firstCard.src != secondCard.src) {
    setTimeout( () => {
         // Flip them back to the back image after a delay
        firstCard.src = "assets/images/back.jpg";
        secondCard.src = "assets/images/back.jpg";

        firstCard = null;
        secondCard = null;
      
      }, 1000);
    } else{
      firstCard = null ;
      secondCard = null;
    }
}

function restartGame() {
    // Clear the board array
    board = [];
    // Reset the game state variables
    firstCard = null;
    secondCard = null;
    matchedCards = 0;
    // Remove all the cards from the board in the DOM
    let boardElement = document.getElementById("board");
    while (boardElement.firstChild) {
        boardElement.firstChild.src = "assets/images/back.jpg";
        boardElement.removeChild(boardElement.firstChild);
    }

// Clear the timer and reset the game time to 60
clearInterval(timerId);
gameTime = 60;
document.getElementById("time").textContent = gameTime;

/*Calling the startGame function inside the
 restartGame function to Start a new game*/

startGame();

// Call the time counting function

timeCounting();
}

const timeCounting = () =>{
// Check if the game time is zero
if (gameTime === 0) {
    // Call the game over function
    gameOver();
} else {
    // Show the alert message with the game time
    alert(`You are a super model! You finsihed in ${timerId} seconds...`);
}
}

function gameOver(){
    alert('Game over');
}

// jQuery for the Restart button color effect
$('.restart1').mouseenter(function(){
    $(this).addClass('turn-blue').removeClass('restart1')
});

$('.restart1').mouseleave(function(){
    $(this).removeClass('turn-blue').addClass('restart1')
});