import { StrikeContainer } from "../styles/StrikeStyles";

function Strike({ strikeClass }) {
  return (
    <StrikeContainer className={strikeClass} data-testid="strike-component" />
  );
}

export default Strike;
