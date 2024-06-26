//images array
let images = [
    "assets/images/three-chicken.webp",
    "assets/images/cyber-street.webp",
    "assets/images/tallest-buiding-in-dubai.webp",
    "assets/images/sky-scrapper.webp",
    "assets/images/intense-cold-weather.webp",
    "assets/images/influencer.webp",
    "assets/images/children-in-school-bus.webp",
    "assets/images/chrismas-snow.webp",
    "assets/images/animal-bear.webp",
    "assets/images/man-in-space.webp"
    ];
    
    /**
     * A random strings to be pick from when 
     * all cards are all matched
     */
    const congratsArray = [
         'You are the game master',
         'Keep rolling.',
         'You are the man!',
         'Excellent! Great job!',
         'Looks like it was too easy for you! :D',
         "Magnificent",
         'Better days are ahead of you',
         "You spiced it up",
         "Should i call you a Sir? :D!",
         'Best to ever do it alone'
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
    
    let isGameOver = false; // Global variable to prevent cards flip when game is over
    
    // For the time
    const countDownTime = document.getElementById("timer");
    let countdownInterval = null; // Store the interval
    // Initial Time
    let seconds = 61;
    
    const countDownTiming = () => {
        seconds --;
        // seconds logic
        if( seconds == 0){
            gameOver();
        }
    
    //format time before displaying
    let secondsValue = seconds <= 61 ? `${seconds}` : seconds;
    countDownTime.innerHTML = `<span>Time:</span> ${secondsValue}`;
    };
    
    // Call the startGame immediately the window is loaded
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
                card.src = "assets/images/back.jpg";
                card.classList.add("card");
                card.classList.add("flip");
                // EventListener for the clickCard
                card.addEventListener('click', clickCard);
                document.getElementById("board").append(card);
            }
            board.push(roww);
        }
        countdownInterval = setInterval(countDownTiming, 1000); // call countDownTiming every 1000 milliseconds
    };
    
    function frontCard(){
        for(let row = 0; row < rows; row++){
            for(let column = 0; column < columns; column++){
                let card = document.getElementById(row.toString() + "." + column.toString());
                card.src = "assets/images/back.jpg";
            }
        }
    }
    
    function clickCard() {
    
        if (!isGameOver){ // Only flip the cards if the game is not over
    
        if (this.src.includes("back.")) {
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
      }
    }
    
      function lookForMatch() {
        // Compare the sources of the first and second cards
        if (firstCard.src != secondCard.src) {
        setTimeout( () => {  // Flip them back to the back image after a delay
            firstCard.src = "assets/images/back.jpg";
            secondCard.src = "assets/images/back.jpg";
    
            firstCard = null;
            secondCard = null;
          
          }, 1000);
        } else{
          matchedCards += 2; // Increment the matchedCards count
          firstCard = null ;
          secondCard = null;
        }
    
        // Check if all cards are matched
        // Then call the congrats function
        if (matchedCards === rows * columns) {
            clearInterval(countdownInterval); // Stop the countdown if all cards are matched
            congrats();
        }
    
    }
    
    function restartGame() {
        // Clear the board array
        board = [];
        // Reset the game state variables
        firstCard = null;
        secondCard = null;
        matchedCards = 0;
        // Reset gameOver to false when a new game starts so cards can be flip again
        isGameOver = false;
    
        // Remove all the cards from the board in the DOM
        let boardElement = document.getElementById("board");
        while (boardElement.firstChild) {
            boardElement.firstChild.src = "assets/images/back.jpg";
            boardElement.removeChild(boardElement.firstChild);
        }
    
         // Clear the countdown interval and reset the seconds
         clearInterval(countdownInterval);
         seconds = 60;

    
    /*Calling the startGame function inside the
     restartGame function to Start a new game 
     when the restart button is clicked*/
    startGame();
    } 
    
    function congrats() {
        //Randomly select from the congratsArray if all cards are matched
        let randomPick = Math.floor(Math.random() * congratsArray.length);
         alert(congratsArray[randomPick]);
     }
    
    
    // Game over function
    function gameOver(){
        alert('Game Over! :D');
        clearInterval(countdownInterval); // Stop the countdown
        isGameOver = true;
    }
    
    
    // jQuery for the Restart button color effect
    $('.restart1').mouseenter(function(){
        $(this).addClass('turn-blue').removeClass('restart1');
    });
    
    $('.restart1').mouseleave(function(){
        $(this).removeClass('turn-blue').addClass('restart1');
    });