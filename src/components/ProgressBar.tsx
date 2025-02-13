import { useContext } from "react"
import { GameContext } from "../GameContext"
import styles from './UI/progressBar.module.css';


export default function ProgressBar() {

  const {progress} = useContext(GameContext); 

  // // Calculate the width for both sides
  const leftWidth = `${progress}%`;

  return (
    <>
      <div id="myBarLeft" className={styles.progressBar} style={{width: leftWidth}}></div>
      
    </>
  )
}
