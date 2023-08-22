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

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [wrongLetters, setWrongLetters] = useState([]);
  const [letters, setLetters] = useState([]);
  const [points, setPoints] = useState(0);
  const [guesses, setGuesses] = useState(3);
  const [guessedLetters, setGuessedLetters] = useState([]);
  
  const [words] = useState(wordList);

  const [gameStage, setGameStage] = useState(stages[0].name);


  const pickWordAndCategory = useCallback(() => {

    //Picking a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * categories.length )];

    //Picking a random word
    const word = words[category][Math.floor(Math.random() * words[category].length )];

    return { category, word };
  }, [words]);

  //Start the game function
  const startGame = useCallback(() => {
    // clear all letters
    clearLettersStates();

    // choose a word
    const { category, word } = pickWordAndCategory();

    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
    
  }, [pickWordAndCategory]);


  //Verify letter input
  const verifyLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase()
    //Verify if letter has been used
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }
    //Push guessed letter or lose a life
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      //Removing a life for every wrong letter
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  //Resets the game in case you want to retry
  const tryAgain = () => {
    setPoints(0);
    setGuesses(3);
    setGameStage(stages[0].name);
  };

  // clear letters state
  const clearLettersStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

    useEffect(() => {
      if (guesses === 0) {
        //Game is over and reset all states
        clearLettersStates();
  
        setGameStage(stages[2].name);
      }
    }, [guesses]);

    //Verify win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    //Declaring win condition
    if (guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      //Sum to score
       setPoints((actualPoints) => (actualPoints += 1));

      //Resets game with a new word
      startGame();
    }
  }, [guessedLetters, letters, startGame, gameStage]);


  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame = {startGame} />}
      {gameStage === "midgame"
      && (<Game 

      verifyLetter = {verifyLetter}
      pickedWord = {pickedWord}
      pickedCategory = {pickedCategory} 
      letters = {letters}
      wrongLetters = {wrongLetters}
      points = {points}
      guesses = {guesses}
      guessedLetters = {guessedLetters}

       />
       )}

      {gameStage === "end" && <GameOver
       tryAgain = {tryAgain} 
       points = {points}/>}
    </div>
  );
};

export default App;
