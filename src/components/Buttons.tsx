import { useContext } from "react";
import styles from "./UI/Buttons.module.css";
import { GameContext } from "../GameContext";


export default function Buttons() {
  
  const {startGame , resetBoard , gameStarted} = useContext(GameContext);

  return (
    <>
      <button id="startBtn" className={styles.btn} onClick={startGame} disabled={gameStarted}>Start</button>
      <button id="resetBtn"  className={styles.btn} onClick={resetBoard} disabled={!gameStarted}>Reset</button>
      
    </>
  )
}
