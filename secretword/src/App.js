//CSS
import './App.css';

//React
import {useCallBack, useEffect, useState} from 'react'

//data = os dados...
import {wordsList} from './data/word'


//components
import StartScreen from './components/StartScreen';
import Gamee from './components/Gamee';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: "Start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)//estou iniciando o estagio inical chamando o nome também
  
  //start the secret word game
  const startGamee = () => {
    setGameStage(stages[1].name)
  }

  //process the letter imput 
  const verifyLeter = () => {
    setGameStage(stages[3].name)
  }


  return (
    <div className="App">
      {gameStage === 'Start' && <StartScreen startGame = {startGamee}/> }
      {gameStage === 'game' && <Gamee/>}
      {gameStage === 'end' && <GameOver />}
     
    </div>
  );
}

export default App; 