//list of cards
const cards = document.querySelectorAll('.memoryCard');

//buttons 
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

//add eventlistener to btns
resetBtn.addEventListener('click', resetBoard);
startBtn.addEventListener('click' , startGame)

// array to store the flipped cards 
let flippedCards = [];

// store the matched cards
let matchedCards = [];

//the game is started or no
let gameStarted = false;

//Total no. of pairs in the game 
const totalPairs = cards.length / 2;

//progress bar elements
const progressBarLeft = document.getElementById('myBarLeft');
const progressBarRight = document.getElementById('myBarRight');

//Add event listeners to each card
cards.forEach((card) => {
  card.addEventListener('click' , flipCard);
});

function flipCard(){
  /*
    prevent clicking if:
    1- the board is locking (while checking for matches)
    2- the card is already flipped 
    3- the card is already matched
  */
  if (!gameStarted || this.classList.contains('flipped') || matchedCards.includes(this)) return;

  // first click 
  this.classList.add('flipped');

  //add the card to flippedCards array
  flippedCards.push(this);

  //console.log(flippedCards.length);

  //if the 2 cards are flipped , check for a match
  if(flippedCards.length >= 2){
    //lockBoard =true ; // lock the board while checking for a match
    checkForMatch();
  }
}

//check for matching logic by seeing if the pics has the same src
function checkForMatch(){
  //takes 2 cards 
  const [firstCard , secondCard] = flippedCards;

  // check for the front-face srcs is equal 
  let Match = firstCard.querySelector('.front-face img').src === secondCard.querySelector('.front-face img').src;
  
  if(Match){
    // if the cards match then store them in the matchedCards array
    matchedCards.push(firstCard ,secondCard );

    // Disable clicking on matched cards and keep them flipped
    disabledClickingOnMatchedCards(firstCard ,secondCard );

    //update the progress bar
    updateProgressBar();
  } else {

    // Flip non-matching cards back after a delay
    nonMatchingCardsToFlipThemBack(firstCard ,secondCard );
  }

  // Reset the flippedCards array
  reseting();
}


function disabledClickingOnMatchedCards(firstCard ,secondCard ){
  //if they match disabled the cards being clickable and keep them flipped
  firstCard.removeEventListener('click' , flipCard);
  secondCard.removeEventListener('click' , flipCard);
}

function nonMatchingCardsToFlipThemBack(firstCard ,secondCard ){
  // make time to see the cards if they dont match delay for 1.5s
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
  },1500);
}

function reseting(){
  //reset the flippedcards
  flippedCards=[];
}


//reset the boards 
function resetBoard(){
  //reset the matchedCards array
    matchedCards = [];
    backToBeBornAgain();

    //reset bars
    progressBarLeft.style.width = `0%`;
    progressBarRight.style.width = `0%`;
}

function backToBeBornAgain(){
  //reset all cards flipping them back and enable clicking on them 
  cards.forEach((card)=>{
    card.classList.remove('flipped');
    card.addEventListener('click', flipCard);
  });

  //set the game to its default 
  gameStarted = false;
}

//start the game  before clicking the cards shuffle
function startGame(){
  shuffleCards();

  //allow card flipping
  gameStarted =true ;

  //reset bars
  progressBarLeft.style.width = `0%`;
  progressBarRight.style.width = `0%`;
}

//updating the progress bar 
function updateProgressBar(){
  //calculate the percentage of matches 
  const progressPercentage = ((matchedCards.length/2) / totalPairs) * 100; // Each pair contributes 10%
  //console.log("Progress Percentage:", progressPercentage); // Debug log
  //update the left and right progress bars symmetrically
  progressBarLeft.style.width = `${progressPercentage}%`;
  progressBarRight.style.width = `${progressPercentage}%`;
}


/*
  This is an implementation of the Fisher-Yates Shuffle Algorithm , which ensures that the images are randomly shuffled.
*/

//Shuffle the images 
function shuffleCards(){
  //extract all images srcs
  const images = Array.from(cards).map((card)=> card.querySelector('.front-face img').src);

  //Shuffle the image srcs
  for (let i = images.length- 1 ; i > 0 ; i--){
    const j = Math.floor(Math.random() * (i +1));
    //swapping the imgs
    [images[i] , images[j]] = [images[j] , images[i]];
  }

  //reassgin the shuffled images to the cards

  cards.forEach((card ,index) => {
    card.querySelector('.front-face img').src = images[index];
  });

}