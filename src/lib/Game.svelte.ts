import { GameState, type Operator, type Tile } from "./types";
import { applyOperator, generateTiles } from "./game-logic";

interface GameSnapshot {
  tiles: Tile[];
  selectedTileId: number | null;
  selectedOperator: Operator | null;
  gameEnded: boolean;
  hasWon: boolean;
}

export function createGame() {
  let tiles = $state(generateTiles());
  let selectedTileId = $state<number | null>(null);
  let selectedOperator = $state<Operator | null>(null);
  let currentState = $state<GameState>(GameState.BeforePlaying);
  let gameEnded = $state(false);
  let hasWon = $state(false);
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
      gameEnded,
      hasWon,
    };
  }

  function restore(state: GameSnapshot) {
    tiles = cloneTiles(state.tiles);
    selectedTileId = state.selectedTileId;
    selectedOperator = state.selectedOperator;
    gameEnded = state.gameEnded;
    hasWon = state.hasWon;
  }

  function selectTile(tileId: number) {
    if (gameEnded) return;

    // Always allow deselecting the currently selected tile, even when
    // an operator is selected (e.g. right after undo).
    if (selectedTileId === tileId) {
      selectedTileId = null;
      selectedOperator = null;
      return;
    }

    if (selectedTileId === null) {
      selectedTileId = tileId;
      return;
    }

    if (selectedOperator === null) {
      selectedTileId = tileId;
      return;
    }

    undoHistory = [...undoHistory, snapshot()];
    redoHistory = [];

    const firstTile = tiles.find((t) => t.id === selectedTileId)!;
    const secondTile = tiles.find((t) => t.id === tileId)!;
    const result = applyOperator(firstTile.value, selectedOperator, secondTile.value);

    firstTile.isDisabled = true;

    tiles = tiles
      .map((t) => (t.id === tileId ? { ...t, value: result } : t))
      .filter((t) => t.id !== selectedTileId);

    selectedTileId = null;
    selectedOperator = null;

    if (tiles.length === 1) {
      gameEnded = true;
      hasWon = Math.abs(tiles[0].value - 24) < 1e-9;
    }
  }

  function selectOperator(op: Operator) {
    if (selectedTileId === null) return;

    if (selectedOperator === op) {
      selectedOperator = null;
      return;
    }

    selectedOperator = op;
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
    gameEnded = false;
    hasWon = false;
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
    get gameEnded() {
      return gameEnded;
    },
    get hasWon() {
      return hasWon;
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
