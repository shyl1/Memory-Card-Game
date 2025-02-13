//craete Context 
import React, { createContext, useState } from "react";

//Card type
type Card ={
  id: number;
  imgFrontFaceSrc: string;
}

// array of cards its type is Card[]
type GameContextType = {
  cards:Card[];
  flippedCards:Card[];
  matchedCards?:Card[]; //store pairs
  flipCard:(card:Card)=>void;
  startGame: ()=>void;
  resetBoard: ()=>void;
  gameStarted?: boolean;
  disableCards?: number[];
  reseting?: ()=>void;
  updateProgress:()=> void;
  progress?: number;
}

//Deafult value of GameContextType
const GameContextDefaultValue : GameContextType ={
  cards:[],
  flippedCards:[], 
  matchedCards:[],
  flipCard:()=>{},
  startGame:()=>{},
  resetBoard:()=>{},
  gameStarted:false,
  disableCards:[],
  reseting:()=>{},
  updateProgress:()=>{},
  progress:0,
}


const GameContext = createContext<GameContextType>(GameContextDefaultValue);


function GameProvider( {children} : { children : React.ReactNode}){

  // cards 
  const [cards , setCards] = useState<Card[]>([
    {id:1, imgFrontFaceSrc:"../public/images/0.png"},
    {id:2, imgFrontFaceSrc:"../public/images/1.png"},
    {id:3, imgFrontFaceSrc:"../public/images/2.png"},
    {id:4, imgFrontFaceSrc:"../public/images/3.png"},
    {id:5, imgFrontFaceSrc:"../public/images/4.png"},
    {id:6, imgFrontFaceSrc:"../public/images/5.png"},
    {id:7, imgFrontFaceSrc:"../public/images/6.png"},
    {id:8, imgFrontFaceSrc:"../public/images/7.png"},
    {id:9, imgFrontFaceSrc:"../public/images/8.png"},
    {id:10, imgFrontFaceSrc:"../public/images/9.png"},
    {id:11, imgFrontFaceSrc:"../public/images/0.png"},
    {id:12, imgFrontFaceSrc:"../public/images/1.png"},
    {id:13, imgFrontFaceSrc:"../public/images/2.png"},
    {id:14, imgFrontFaceSrc:"../public/images/3.png"},
    {id:15, imgFrontFaceSrc:"../public/images/4.png"},
    {id:16, imgFrontFaceSrc:"../public/images/5.png"},
    {id:17, imgFrontFaceSrc:"../public/images/6.png"},
    {id:18, imgFrontFaceSrc:"../public/images/7.png"},
    {id:19, imgFrontFaceSrc:"../public/images/8.png"},
    {id:20, imgFrontFaceSrc:"../public/images/9.png"},
  ]);

  // flipped cards array
  const [flippedCards , setFlippedCards] = useState<Card[]>([]);
  const [matchedCards , setMatchedCards] = useState<Card[]>([]);
  const [gameStarted , setGameStarted] = useState(false);

  // for disbale the double click on the same card
  const [disableCards , setDisableCards] = useState<number[]>([]);

  //progress bar 
  const [progress , setProgress] = useState(0);

  function updateProgress() : void{
    const newProgress = (matchedCards.length  / (cards.length / 2) * 100) ;
    //console.log("Updating progress:", newProgress); 
    setProgress(newProgress);
  }

  console.log(progress);


  function flipCard(card:Card) : void{
    if (!gameStarted || matchedCards.some(matchedCard => matchedCard.id === card.id) || disableCards.includes(card.id)) return;

    //prevent flipping more than 2 cards
    if (flippedCards.length >= 2) return;

    //disable the double click on the same card
    setDisableCards((prevDisableCards) => [...prevDisableCards , card.id]);

    //update the flipped cards array 
    setFlippedCards((prevFlipCard)=> {
      const newFLippedCards = [...prevFlipCard , card];

      if(newFLippedCards.length === 2){
        setTimeout(()=> {
          checkForMatch(newFLippedCards);
        } , 1000);
      }

      return newFLippedCards;
    });
  }


  function checkForMatch(flippedCards:Card[]): void{
    const [firstCard , secondCard] = flippedCards;

    if(firstCard.imgFrontFaceSrc === secondCard.imgFrontFaceSrc){
      //pusing the matched cards to the matchedCards array
      setMatchedCards((prevMatchedCards) =>{
        //avoid duplicating entries
        const alreadyMatched = prevMatchedCards.some((card) => card.id === firstCard.id);
        return alreadyMatched ? prevMatchedCards : [...prevMatchedCards , firstCard , secondCard];
      });

      updateProgress();
    }
    setFlippedCards([]);
    setDisableCards([]);

  }


  function startGame(): void {
    shuffleCards();
    setGameStarted(true); 
  }

  function shuffleCards(): void{
    const shuffledCards = [...cards];
    for(let i = shuffledCards.length -1 ; i > 0 ; i--){
      const j = Math.floor(Math.random() * i);
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }

    setCards(shuffledCards);
  }

  function resetBoard():void {
    setFlippedCards([]);
    setMatchedCards([]);
    setGameStarted(false);
    setProgress(0);
  }


  return(
    <GameContext.Provider value={{
      cards,
      flipCard,
      startGame,
      resetBoard,
      flippedCards,
      gameStarted,
      updateProgress,
      progress,
      matchedCards,


    }}>
      {children}
    </GameContext.Provider>

    );
};


export  {GameContext};
export default GameProvider;