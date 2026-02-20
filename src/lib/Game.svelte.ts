import { GameState, type Operator } from "./types";
import { applyOperator, generateTiles } from "./game-logic";

export function createGame() {
  let tiles = $state(generateTiles());
  let remainingTiles = $derived(tiles);
  let selectedTileId = $state<number | null>(null);
  let selectedOperator = $state<Operator | null>(null);
  let currentState = $state<GameState>(GameState.BeforePlaying);
  let isGameOver = false;

  function selectTile(tileId: number) {
    if (isGameOver) return;

    // If it is the first action (operators are disabled in this phase)
    if (selectedTileId !== tileId && selectedOperator === null) {
      selectedTileId = tileId;
    }
    // If the numbertile gets selected again, deselect it
    else if (selectedTileId === tileId && selectedOperator === null) {
      console.log("deselect numbertile");
      selectedTileId = null;
    }

    // Do the calculation and merge
    else if (selectedTileId !== null && selectedOperator !== null) {
      const firstTile = tiles.find((t) => t.id === selectedTileId)!;
      const secondTile = tiles.find((t) => t.id === tileId)!;
      const result = applyOperator(
        firstTile.value,
        selectedOperator!,
        secondTile.value,
      );

      firstTile.isDisabled = true;

      // Filter remaining tiles
      tiles = tiles
        .map((t) => (t.id === tileId ? { ...t, value: result } : t))
        .filter((t) => t.id !== selectedTileId);

      selectedTileId = null;
      selectedOperator = null;

      if (tiles.length === 1) {
        isGameOver = Math.abs(tiles[0].value - 24) < 1e-9;
      }
    }
  }

  function selectOperator(op: Operator) {
    if (selectedTileId !== null) {
      selectedOperator = op;
    } else if (selectedOperator === op) {
      selectedOperator = null;
    }
  }

  function newGame() {
    tiles = generateTiles();
    selectedTileId = null;
    selectedOperator = null;
  }

  function startGame() {
    currentState = GameState.Playing;
  }

  return {
    get tiles() {
      return tiles;
    },
    get selectedTileId() {
      return selectedTileId;
    },
    get selectedOperator() {
      return selectedOperator;
    },
    get isGameOver() {
      return isGameOver;
    },
    get currentState() {
      return currentState;
    },
    selectTile,
    selectOperator,
    newGame,
    startGame,
  };
}
