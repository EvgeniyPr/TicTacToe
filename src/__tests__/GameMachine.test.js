import { interpret } from "xstate";
import gameMachine from "../machines/gameMachine"; // Путь к вашей машине

const runTest = async (actor, actions) => {
  for (const action of actions) {
    actor.send(action.event);
    await new Promise((r) => setTimeout(r, 100)); // Ожидание для асинхронных действий
  }
};
const moves = [
  { event: { type: "CLICK_TILE", index: 0 } },
  { event: { type: "CLICK_TILE", index: 1 } },
  { event: { type: "CLICK_TILE", index: 2 } },
  { event: { type: "CLICK_TILE", index: 4 } },
  { event: { type: "CLICK_TILE", index: 3 } },
  { event: { type: "CLICK_TILE", index: 5 } },
  { event: { type: "CLICK_TILE", index: 7 } },
  { event: { type: "CLICK_TILE", index: 6 } },
  { event: { type: "CLICK_TILE", index: 8 } },
];
describe("gameMachine Component", () => {
  test("player can click a tile and the player alternates", async () => {
    const gameActor = interpret(gameMachine).start();
    const initialContext = gameActor.getSnapshot().context;
    expect(initialContext.tiles).toEqual(Array(9).fill(null));
    expect(initialContext.player).toBe("X");
    expect(initialContext.gameStatus).toBe("run");
    await runTest(gameActor, [
      { event: { type: "CLICK_TILE", index: 0 } },
      { event: { type: "CLICK_TILE", index: 1 } },
      { event: { type: "CLICK_TILE", index: 2 } },
    ]);
    const finalContext = gameActor.getSnapshot().context;
    expect(finalContext.tiles[0]).toBe("X");
    expect(finalContext.tiles[1]).toBe("O");
    expect(finalContext.tiles[2]).toBe("X");
    expect(finalContext.player).toBe("O");
    expect(gameActor.getSnapshot().matches("playing")).toBe(true);
  });

  test("game ends in a draw", async () => {
    const gameActor = interpret(gameMachine).start();

    await runTest(gameActor, moves);
    expect(gameActor.getSnapshot().matches("draw")).toBe(true);
  });

  test("game can be reset", async () => {
    const gameActor = interpret(gameMachine).start();
    await runTest(gameActor, moves);
    expect(gameActor.getSnapshot().matches("draw")).toBe(true);
    gameActor.send({ type: "RESET" });
    const resetContext = gameActor.getSnapshot().context;
    expect(resetContext.tiles).toEqual(Array(9).fill(null));
    expect(resetContext.player).toBe("X");
    expect(resetContext.gameStatus).toBe("run");
    expect(resetContext.strikeClass).toBe("");
    expect(resetContext.winner).toBe("");
    expect(gameActor.getSnapshot().matches("playing")).toBe(true);
  });
});
