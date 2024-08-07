import Board from "./Board";
import GameOver from "./GameOver";
import Reset from "./Reset";
import clickSoundAsset from "../sounds/click.wav";
import { useMachine } from "@xstate/react";
import gameMachine from "../machines/gameMachine";
import GlobalStyles from "../styles/GlobalStyles";

const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.2;

function TicTacToe() {
  const [state, send] = useMachine(gameMachine);
  const { tiles, player, gameStatus, winner, strikeClass } = state.context;

  const handleTileClick = (index) => {
    if (gameStatus !== "run") {
      return;
    }
    if (state.matches("playing") && tiles[index] === null) {
      const clickSoundClone = new Audio(clickSoundAsset);
      clickSoundClone.volume = 0.2;
      clickSoundClone.play();
      send({ type: "CLICK_TILE", index });
    }
    return;
  };

  const handleReset = () => {
    send({ type: "RESET" });
  };

  return (
    <>
      <GlobalStyles />
      <h1>TicTacToe</h1>
      <Board
        tiles={tiles}
        onTitleClick={handleTileClick}
        playerTern={player}
        strikeClass={strikeClass}
      />
      <GameOver gameState={gameStatus} winner={winner} />
      <Reset gameState={gameStatus} onReset={handleReset} />
    </>
  );
}

export default TicTacToe;
