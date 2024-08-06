import { ResetButton } from "../styles/ResetButton";

function Reset({ gameState, onReset }) {
  return gameState !== "run" ? (
    <ResetButton onClick={onReset}>Reset</ResetButton>
  ) : null;
}

export default Reset;
