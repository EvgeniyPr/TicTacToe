import { BoardContainer } from "../styles/BoardStyles";
import Stricke from "./Strike";
import Tile from "./Tile";

function Board({ tiles, onTitleClick, playerTern, strikeClass }) {
  return (
    <BoardContainer>
      {tiles.map((tile, index) => (
        <Tile
          key={index}
          onClick={() => onTitleClick(index)}
          value={tile}
          playerTern={playerTern}
          className={`tile ${index % 3 < 2 ? "right-border" : ""} ${
            index < 6 ? "bottom-border" : ""
          }`}
        />
      ))}
      <Stricke strikeClass={strikeClass} />
    </BoardContainer>
  );
}
export default Board;
