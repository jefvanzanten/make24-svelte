import { GameState, type Operator, type Tile } from "./types";
import { applyOperator, generateTiles } from "./game-logic";

interface GameSnapshot {
  tiles: Tile[];
  selectedTileId: number | null;
  selectedOperator: Operator | null;
  isGameOver: boolean;
}

export function createGame() {
  let tiles = $state(generateTiles());
  let selectedTileId = $state<number | null>(null);
  let selectedOperator = $state<Operator | null>(null);
  let currentState = $state<GameState>(GameState.BeforePlaying);
  let isGameOver = $state(false);
  let undoHistory = $state<GameSnapshot[]>([]);
  let redoHistory = $state<GameSnapshot[]>([]);

  function cloneTiles(sourceTiles: Tile[]) {
    return sourceTiles.map((tile) => ({ ...tile }));
  }

  function snapshot(): GameSnapshot {
    return {
      tiles: cloneTiles(tiles),
      selectedTileId,
      selectedOperator,
      isGameOver,
    };
  }

  function restore(state: GameSnapshot) {
    tiles = cloneTiles(state.tiles);
    selectedTileId = state.selectedTileId;
    selectedOperator = state.selectedOperator;
    isGameOver = state.isGameOver;
  }

  function selectTile(tileId: number) {
    if (isGameOver) return;

    if (selectedTileId !== tileId && selectedOperator === null) {
      selectedTileId = tileId;
    } else if (selectedTileId === tileId && selectedOperator === null) {
      selectedTileId = null;
    } else if (selectedTileId !== null && selectedOperator !== null) {
      if (selectedTileId === tileId) return;

      undoHistory = [...undoHistory, snapshot()];
      redoHistory = [];

      const firstTile = tiles.find((t) => t.id === selectedTileId)!;
      const secondTile = tiles.find((t) => t.id === tileId)!;
      const result = applyOperator(
        firstTile.value,
        selectedOperator,
        secondTile.value,
      );

      firstTile.isDisabled = true;

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

  function undoMove() {
    if (undoHistory.length === 0) return;

    const previousState = undoHistory[undoHistory.length - 1];
    undoHistory = undoHistory.slice(0, -1);
    redoHistory = [...redoHistory, snapshot()];
    restore(previousState);
  }

  function redoMove() {
    if (redoHistory.length === 0) return;

    const nextState = redoHistory[redoHistory.length - 1];
    redoHistory = redoHistory.slice(0, -1);
    undoHistory = [...undoHistory, snapshot()];
    restore(nextState);
  }

  function newGame() {
    tiles = generateTiles();
    selectedTileId = null;
    selectedOperator = null;
    isGameOver = false;
    undoHistory = [];
    redoHistory = [];
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
    get canUndo() {
      return undoHistory.length > 0;
    },
    get canRedo() {
      return redoHistory.length > 0;
    },
    selectTile,
    selectOperator,
    undoMove,
    redoMove,
    newGame,
    startGame,
  };
}
