import { createMachine, assign } from "xstate";

const gameMachine = createMachine(
  {
    id: "ticTacToe",
    initial: "playing",
    context: {
      tiles: Array(9).fill(null),
      player: "X",
      gameStatus: "",
      winner: "",

      //   strikeClass: null,
    },
    states: {
      //   idle: {
      //     on: {
      //       START: "playing",
      //     },
      //   },
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
          { target: "won", guard: "checkWinCondition" },
          { target: "draw", guard: "checkDrawCondition" },
          { target: "playing" },
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
          player: context.player === "X" ? "O" : "X",
        };
      }),
      resetGame: assign(({ context, event }) => {
        return {
          tiles: Array(9).fill(null),
          player: "X",
          gameStatus: "",
          winner: "",
          //   strikeClass: null,
        };
      }),
    },
    guards: {
      checkWinCondition: ({ context, event }) => {
        const winningCombinations = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (const combo of winningCombinations) {
          const [a, b, c] = combo;
          if (
            context.tiles[a] &&
            context.tiles[a] === context.tiles[b] &&
            context.tiles[a] === context.tiles[c]
          ) {
            return true;
          }
        }
        return false;
      },
      checkDrawCondition: ({ context, event }) => {
        return context.tiles.every((tile) => tile !== null);
      },
    },
  }
);

export default gameMachine;
