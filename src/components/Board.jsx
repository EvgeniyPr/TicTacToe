import Stricke from "./Strike";
import Tile from "./Tile";

function Board({ tiles, onTitleClick, playerTern, strickeClass }) {
  return (
    <div className="board">
      <Tile
        onClick={() => onTitleClick(0)}
        value={tiles[0]}
        className="right-border bottom-border"
        playerTern={playerTern}
      />{" "}
      <Tile
        onClick={() => onTitleClick(1)}
        value={tiles[1]}
        playerTern={playerTern}
        className="right-border bottom-border"
      />{" "}
      <Tile
        onClick={() => onTitleClick(2)}
        value={tiles[2]}
        playerTern={playerTern}
        className=" bottom-border"
      />{" "}
      <Tile
        onClick={() => onTitleClick(3)}
        value={tiles[3]}
        playerTern={playerTern}
        className="right-border bottom-border"
      />{" "}
      <Tile
        onClick={() => onTitleClick(4)}
        value={tiles[4]}
        playerTern={playerTern}
        className="right-border bottom-border"
      />{" "}
      <Tile
        onClick={() => onTitleClick(5)}
        value={tiles[5]}
        playerTern={playerTern}
        className=" bottom-border"
      />{" "}
      <Tile
        onClick={() => onTitleClick(6)}
        value={tiles[6]}
        playerTern={playerTern}
        className="right-border"
      />{" "}
      <Tile
        onClick={() => onTitleClick(7)}
        value={tiles[7]}
        playerTern={playerTern}
        className="right-border"
      />
      <Tile
        onClick={() => onTitleClick(8)}
        value={tiles[8]}
        playerTern={playerTern}
      />{" "}
      <Stricke strickeClass={strickeClass} />
    </div>
  );
}

export default Board;
