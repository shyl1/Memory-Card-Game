import Buttons from "./Buttons";
import Game from "./Game";
import ProgressBar from "./ProgressBar";
import styles from './UI/container.module.css';



export default function Body() {

  

  return (
    <>

      <div className={styles.progressContainer}>
        <ProgressBar/>
        </div> 
        
        <div className={styles.gameContainer}>
          <Game />
        </div>
        
        <div className={styles.buttons}>
        <Buttons/>
        </div>
    
    </>
    
  )
}
