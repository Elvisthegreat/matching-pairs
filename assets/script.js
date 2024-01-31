// document.getElementById('restart').addEventListener('click', restartGame())

//images array
let images = ["assets/images/foto1.webp",
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

let board = [];
let rows = 4;
let columns = 5;
let firstCard = null; // store the first card clicked
let secondCard = null; // store the second card clicked
let matchedCards = 0; // count the number of matched cards


window.onload = function () {
    shuffleCards();
    startGame();
};

function shuffleCards() {
    images = [...images, ...images]; // Duplicate the images array to have pairs of each image
    console.log(images);
    // loop over the array from the last element to the second element
    for (let i = images.length - 1; i > 0; i--) {
        // pick a random index from 0 to i
        let x = Math.floor(Math.random() * (i + 1));
        // swap the elements at i and x
        let temp = images[i];
        images[i] = images[x];
        images[x] = temp;
    }
    console.log(images);
}
const startGame = () => {
    //Arrange the board by 4x5
    for (let row = 0; row < rows; row++) {
        let roww = [];
        for (let column = 0; column < columns; column++) {
            let cardImg = images.pop();
            roww.push(cardImg);

            // Create the html image tag
            let card = document.createElement("img");
            card.id = row.toString() + "." + column.toString();
            card.src = cardImg;
            card.classList.add("card");
            document.getElementById("board").append(card);
        }
        board.push(roww);
    }
    console.log(board);

};
// Give few second to view card before showing front side
setTimeout(frontCard, 1000);
function frontCard(){
    
    for(let row = 0; row < rows; row++){
        for(let column = 0; column < columns; column++){
            let card = document.getElementById(row.toString() + "." + column.toString());
            card.src = "/assets/images/back.jpg"
        }
    }
}