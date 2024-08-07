import { TileContainer } from "../styles/TileStyles";

function Tile({ className, value, onClick, playerTern }) {
  return (
    <TileContainer
      className={className}
      value={value}
      data-playertern={playerTern}
      onClick={onClick}
      role="button"
    >
      {value}
    </TileContainer>
  );
}

export default Tile;
