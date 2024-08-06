import { createMachine, assign } from "xstate";

const gameMachine = createMachine(
  {
    id: "ticTacToe",
    initial: "playing",
    context: {
      tiles: Array(9).fill(null),
      player: "X",
      gameStatus: "run",
      strikeClass: "",
      winner: "",
    },
    states: {
      playing: {
        on: {
          CLICK_TILE: {
            actions: "clickTile",
            target: "checkWin",
          },
        },
      },
      checkWin: {
        always: [
          {
            target: "won",
            guard: "checkWinCondition",
            actions: ["setWinner", "setStrikeClass"],
          },
          { target: "draw", guard: "checkDrawCondition" },
          { target: "playing", actions: "togglePlayer" },
        ],
      },
      won: {
        entry: assign({ gameStatus: "won" }),
        on: {
          RESET: {
            target: "playing",
            actions: "resetGame",
          },
        },
      },
      draw: {
        entry: assign({ gameStatus: "draw" }),
        on: {
          RESET: {
            target: "playing",
            actions: "resetGame",
          },
        },
      },
    },
  },
  {
    actions: {
      clickTile: assign(({ context, event }) => {
        const newTiles = [...context.tiles];
        newTiles[event.index] = context.player;
        return {
          tiles: newTiles,
        };
      }),
      togglePlayer: assign(({ context }) => ({
        player: context.player === "X" ? "O" : "X",
      })),
      setWinner: assign(({ context }) => ({
        winner: context.player,
      })),
      setStrikeClass: assign(({ context, event }) => ({
        strikeClass: event.strikeClass,
      })),
      resetGame: assign(() => {
        return {
          tiles: Array(9).fill(null),
          player: "X",
          gameStatus: "run",
          strikeClass: "",
          winner: "",
        };
      }),
    },
    guards: {
      checkWinCondition: ({ context, event }) => {
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
        for (const { combo, strikeClass } of winningCombinations) {
          const [a, b, c] = combo;
          if (
            context.tiles[a] !== null &&
            context.tiles[a] === context.tiles[b] &&
            context.tiles[a] === context.tiles[c]
          ) {
            event.strikeClass = strikeClass;
            return true;
          }
        }
        return false;
      },
      checkDrawCondition: ({ context }) => {
        return context.tiles.every((tile) => tile !== null);
      },
    },
  }
);

export default gameMachine;
