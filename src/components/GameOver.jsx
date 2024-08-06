import { GameOverContainer } from "../styles/GameOverStyle";

function GameOver({ gameState, winner }) {
  if (gameState === "run") return null;

  return (
    <GameOverContainer>
      {gameState === "won" ? `${winner} wins!` : "Draw"}
    </GameOverContainer>
  );
}

export default GameOver;
