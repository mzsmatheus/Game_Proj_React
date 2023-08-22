//Styles
import './App.css';

//Words Data
import {wordList} from "./data/Words"

//Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

//React
import { useCallback, useState, useEffect } from 'react';


const stages = [

  {id: 1, name: "start"},
  {id: 2, name: "midgame"},
  {id: 3, name: "end"}
  
];


function App() {
  
const [words] = useState(wordList);
console.log(words);

  const [gameStage, setGameStage] = useState(stages[0].name);

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen />}
      {gameStage === "midgame" && <Game />}
      {gameStage === "end" && <GameOver />}
    </div>
  );
}

export default App;
