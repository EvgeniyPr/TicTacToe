import { useEffect, useState } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState";
import Reset from "./Reset";
import clickSoundAsset from "../sounds/click.wav";
import { useMachine } from "@xstate/react";
import gameMachine from "../machines/gameMachine";

const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.2;
const PLAYER_X = "X";
// const PLAYER_O = "O";
const winningCombinations = [
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },
  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike-column-3" },
  { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];

function TicTacToe() {
  const [state, send] = useMachine(gameMachine);

  const { tiles, player, gameStatus } = state.context;
  const [strickeClass, setStrickeClass] = useState();
  const [gameState, setGameState] = useState(GameState.inProgress);

  useEffect(() => {
    if (gameStatus === "won") {
      setGameState(
        player === "X" ? GameState.playerXWin : GameState.playerOWin
      );
    } else if (gameStatus === "draw") {
      setGameState(GameState.draw);
    } else {
      setGameState(GameState.inProgress);
    }
  }, [gameStatus, player]);
  //   useEffect(() => {
  //     checkWinner(tiles, setStrickeClass, setGameState);
  //   }, [tiles]);

  //   function checkWinner(tiles, setStrickeClass, setGameState) {
  //     for (const { combo, strikeClass } of winningCombinations) {
  //       const tileValue1 = tiles[combo[0]];
  //       const tileValue2 = tiles[combo[1]];
  //       const tileValue3 = tiles[combo[2]];
  //       if (
  //         tileValue1 !== null &&
  //         tileValue1 === tileValue2 &&
  //         tileValue1 === tileValue3
  //       ) {
  //         setStrickeClass(strikeClass);
  //         if (tileValue1 === PLAYER_X) {
  //           setGameState(GameState.playerXWin);
  //         } else {
  //           setGameState(GameState.playerXWin);
  //         }
  //         return;
  //       }
  //     }
  //     const allTilesAreFilledIn = tiles.every((tile) => tile !== null);
  //     if (allTilesAreFilledIn) {
  //       setGameState(GameState.draw);
  //     }
  //   }

  const handleTileClick = (index) => {
    if (gameState !== GameState.inProgress) {
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
    console.log("reset");
  };

  return (
    <>
      <h1>TicTacToe</h1>
      <Board
        tiles={tiles}
        onTitleClick={handleTileClick}
        playerTern={player}
        strickeClass={strickeClass}
      />
      <GameOver gameState={gameState} />
      <Reset gameState={gameState} onReset={handleReset} />
    </>
  );
}

export default TicTacToe;
