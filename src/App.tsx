import Body from './components/Body';
import GameProvider from './GameContext';
import './index.css';


function App() {
  

  return (
    <>
    
      <h1>Flower Matching</h1>
      <GameProvider>
        <div className="Container">
          <Body/>
        </div>
      </GameProvider>
        
    </>
  )
}

export default App
