import { useState, useRef } from "react";
import "./Game.css";
import Logo from "../assets/logoteste1.png"

const Game = ({ verifyLetter, guessedLetters, pickedWord, pickedCategory, guesses, points, letters, wrongLetters }) => {

  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);

    setLetter("");

    letterInputRef.current.focus();
  };

  return (
    <div className="game">  
    <img className="Logogame" src = {Logo} alt="logo" />  
    <p className="score">
      <span>Score: {points} </span>
    </p>
    <h1>Guess the Word:</h1>
    <h3 className="hint">
      Hint about the word: <span>{pickedCategory}</span>
    </h3>
    <p>Lives left: {guesses} </p>
    <div className="wordContainer">
    {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span className="letter" key={i}>
              {letter}
            </span>
          ) : (
            <span key={i} className="blank"></span>
          )
        )}

    </div>
    <div className="letterSlot">
    <p>Guess a letter from the word:</p>
    <form onSubmit={handleSubmit}>
      <input 
      type="text"
       name = "letter" 
       maxLength="1"
      onChange={(e) => setLetter(e.target.value)}
      required 
      value={letter}
      ref={letterInputRef}
      />
      <button>Select!</button>
    </form> 
    </div>
    <div className="wrongLettersContainer">
      <p>Letters Used:</p>
      {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
    </div>
    </div>
  )
}

export default Game