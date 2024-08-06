import GameState from "./GameState";
function GameOver({ gameState }) {
  console.log("gameState", gameState);
  switch (gameState) {
    case GameState.inProgress:
      return <></>;
    case GameState.playerOWin:
      return <div className="game-over"> O win</div>;
    case GameState.playerXWin:
      return <div className="game-over">X win</div>;
    case GameState.draw:
      return <div className="game-over">Drow</div>;
    default:
      return <></>;
  }
}

export default GameOver;
