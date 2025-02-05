//#region imports
import { IPrepare } from "./models/prepare.model";
import { ICard } from "./models/card.model";
//#endregion

//#region initialize the game setup using IPrepare interface 
let prepare : IPrepare ={

  cards: Array.from(document.querySelectorAll('.memoryCard')).map((card) => ({
    element: card,
    imgFrontFaceSrc: (card.querySelector('.front-face img') as HTMLImageElement)?.src || '',
  })),

  startBtn: document.getElementById('startBtn'),
  resetBtn: document.getElementById('resetBtn'),

  progressBarLeft: document.getElementById('myBarLeft'),
  progressBarRight: document.getElementById('myBarRight'),

  totalPairs: document.querySelectorAll('.memoryCard').length / 2,
};
//#endregion

//#region vars declaration
let gameStarted : boolean = false;
let flippedCards : ICard[] = [];
let matchedCards : ICard[] = [];

//#endregion
//#region function declartion
function flipCard(this : Element): void{
  //search for the target card in the array cards in prepare setup
  const card = prepare.cards.find((targetCard) =>  targetCard.element === this);

  if (!card ||!gameStarted || this.classList.contains('flipped') || matchedCards.find((c) => c === card)) return;

  this.classList.add('flipped');
  flippedCards.push(card);

  if(flippedCards.length >= 2){
    checkForMatch();
  }
}

function checkForMatch(): void {
  const [firstCard , secondCard] = flippedCards;

  let Match : boolean = firstCard.imgFrontFaceSrc === secondCard.imgFrontFaceSrc;

  if(Match){
    matchedCards.push(firstCard ,secondCard);
    disabledClickingOnMatchedCards(firstCard ,secondCard );
    console.log("Match found:", firstCard, secondCard);
    console.log("Matched cards array:", matchedCards);
    updateProgressBar();
  } else {
    nonMatchingCardsToFlipThemBack(firstCard ,secondCard );
    
  }

  reseting();
}

function disabledClickingOnMatchedCards(firstCard: ICard , secondCard : ICard){
  firstCard.element.removeEventListener('click' , flipCard as EventListener);
  secondCard.element.removeEventListener('click' , flipCard as EventListener);
}

function nonMatchingCardsToFlipThemBack(firstCard: ICard , secondCard : ICard):void {
  setTimeout(() => {
    firstCard.element.classList.remove('flipped');
    secondCard.element.classList.remove('flipped');
  },1500);
    // Debugging: Log to confirm removal
    console.log("Removed click listener for matched cards:", firstCard, secondCard);

}

function updateProgressBar() : void {
  const progressPercentage : number = ((matchedCards.length/2) / prepare.totalPairs) * 100;

  if(prepare.progressBarLeft && prepare.progressBarRight){
    prepare.progressBarLeft.style.width = `${progressPercentage}%`;
    prepare.progressBarRight.style.width = `${progressPercentage}%`;
  }
}

function reseting() : void {
  flippedCards = [];
}

function resetBoard(): void{
    matchedCards = [];
    backToBeBornAgain();

    //reset bars
    if(prepare.progressBarLeft && prepare.progressBarRight){
    prepare.progressBarLeft.style.width = `0%`;
    prepare.progressBarRight.style.width = `0%`;
    }
}

function backToBeBornAgain(): void {
  prepare.cards.forEach((card) => {
    card.element.classList.remove('flipped');
    card.element.addEventListener('click' , flipCard);
  });

  gameStarted = false;
}


function startGame() : void {
  shuffleCards();

  gameStarted =true;

  if(prepare.progressBarLeft && prepare.progressBarRight){
    prepare.progressBarLeft.style.width = `0%`;
    prepare.progressBarRight.style.width = `0%`;
    }
}

function shuffleCards(){
  const images : string[] = prepare.cards.map((card) => card.imgFrontFaceSrc);

  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }

  //reassgin the shuffled images to the cards

  prepare.cards.forEach((card , index) => {
    const img =card.element.querySelector('.front-face img') as HTMLImageElement;
    img.src = images[index];
    card.imgFrontFaceSrc = images[index];
  });
}
//#endregion

//#region add events listeners to buttons and for cards
//making sure that btns exist in the html file
if (prepare.startBtn && prepare.resetBtn) {
  prepare.startBtn.addEventListener('click', startGame);
  prepare.resetBtn.addEventListener('click', resetBoard);
}

prepare.cards.forEach((card)=> {
  card.element.addEventListener('click', flipCard);
});

//#endregion


