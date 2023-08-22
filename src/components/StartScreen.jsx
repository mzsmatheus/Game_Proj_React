import "./StartScreen.css";
import Logo from "../assets/logoteste1.png"

const StartScreen = ({ startGame }) => {
  return (
    <div className="start"> 
    <img src = {Logo} alt="logo" />  
    <h1> Guess The Word </h1> 
    <p>Press the button to start the game:</p>
    <button onClick={startGame}>Start the Game</button>
    </div>
  )
}

export default StartScreen