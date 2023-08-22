import "./GameOver.css";
import Logo from "../assets/logoteste1.png"

const GameOver = ({ tryAgain, points }) => {
  return (
    <div>
      <img className="Logogame" src = {Logo} alt="logo" />  
      <h1 className="GameOverScreen">GAME OVER!</h1>
      <h2><span>
        Your Score was: {points}
        </span></h2>
      <button onClick={tryAgain}>Restart Game</button>
    </div>
  )
}

export default GameOver