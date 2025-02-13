
import { useContext } from 'react';
import styles from './UI/cards.module.css';
import { GameContext } from '../GameContext';

export default function Game() {

  //consume the cards array from the context
  const {cards , flipCard , flippedCards , matchedCards} = useContext(GameContext);

  return (
    <>
    {cards?.map((card) => (
      <div key={card.id} className={`${styles.memoryCard} ${ flippedCards.some((c) => c.id === card.id)  || matchedCards?.some((c)=> c.id === card.id) ? styles.flipped : "" } `} onClick={()=> flipCard(card)}>
        <div className={styles.innerCard}>
          <div className={styles.frontFace}>
            <img src={card.imgFrontFaceSrc}/>
          </div>
          <div className={styles.backFace}></div>
        </div>
      </div>
    ))}
    </>
  )
}
