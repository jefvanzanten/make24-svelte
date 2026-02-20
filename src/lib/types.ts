export type Operator = "+" | "-" | "*" | "/";

export interface Tile {
  id: number;
  value: number;
  isDisabled: boolean;
}

export interface HeaderProps {
  resetSequence: () => void;
  undoMove: () => void;
}

export enum GameState {
  BeforePlaying,
  Playing,
  Ended
}
