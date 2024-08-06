function Tile({ className, value, onClick, playerTern }) {
  let hoverClass = null;
  if (value === null) {
    hoverClass = `${playerTern.toLowerCase()}-hover`;
  }
  return (
    <div className={`tile ${className} ${hoverClass}`} onClick={onClick}>
      {value}
    </div>
  );
}

export default Tile;
