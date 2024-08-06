import { useEffect, useState } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState";
import Reset from "./Reset";
import clickSoundAsset from "../sounds/click.wav";
const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.2;
const PLAYER_X = "X";
const PLAYER_O = "O";
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
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState(PLAYER_X);
  const [strickeClass, setStrickeClass] = useState();
  const [gameState, setGameState] = useState(GameState.inProgress);

  useEffect(() => {
    checkWinner(tiles, setStrickeClass, setGameState);
  }, [tiles]);
  //   useEffect(() => {
  //     if (tiles.some((tile) => tile !== null)) {
  //       clickSound.play();
  //     }
  //   }, [tiles]);

  function checkWinner(tiles, setStrickeClass, setGameState) {
    for (const { combo, strikeClass } of winningCombinations) {
      const tileValue1 = tiles[combo[0]];
      const tileValue2 = tiles[combo[1]];
      const tileValue3 = tiles[combo[2]];
      if (
        tileValue1 !== null &&
        tileValue1 === tileValue2 &&
        tileValue1 === tileValue3
      ) {
        setStrickeClass(strikeClass);
        if (tileValue1 === PLAYER_X) {
          setGameState(GameState.playerXWin);
        } else {
          setGameState(GameState.playerXWin);
        }
        return;
      }
    }
    const allTilesAreFilledIn = tiles.every((tile) => tile !== null);
    if (allTilesAreFilledIn) {
      setGameState(GameState.draw);
    }
  }

  const handleTileClick = (index) => {
    if (gameState !== GameState.inProgress) {
      return;
    }
    if (tiles[index] === null) {
      const newTiles = [...tiles];
      newTiles[index] = player;
      setTiles(newTiles);
      const clickSoundClone = new Audio(clickSoundAsset);
      clickSoundClone.volume = 0.2;
      clickSoundClone.play();
      if (player === PLAYER_X) {
        setPlayer(PLAYER_O);
      } else setPlayer(PLAYER_X);
    }
    return;
  };
  const handleReset = () => {
    setGameState(GameState.inProgress);
    setTiles(Array(9).fill(null));
    setPlayer(PLAYER_X);
    setStrickeClass(null);
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
