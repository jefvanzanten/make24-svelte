export type Operator = "+" | "-" | "*" | "/";

export interface Tile {
  id: number;
  value: number;
  isDisabled: boolean;
}

export interface HeaderProps {
  resetSequence: () => void;
  undoMove: () => void;
  redoMove: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export enum GameState {
  BeforePlaying,
  Playing,
  Ended
}
