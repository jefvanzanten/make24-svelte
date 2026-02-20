import type { Operator, Tile } from "./types";

export const OPERATORS: Operator[] = ["+", "-", "*", "/"];

let nextId = 0;

export function calc(a: number, op: Operator, b: number): number {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? Infinity : a / b;
  }
}

export function canMake24(nums: number[]): boolean {
  if (nums.length === 1) return Math.abs(nums[0] - 24) < 1e-9;
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (i === j) continue;
      const rest = nums.filter((_, k) => k !== i && k !== j);
      for (const op of OPERATORS) {
        const result = calc(nums[i], op, nums[j]);
        if (!isFinite(result)) continue;
        if (canMake24([result, ...rest])) return true;
      }
    }
  }
  return false;
}

export function randomNum(): number {
  return Math.floor(Math.random() * 9) + 1;
}

export function generateTiles(): Tile[] {
  let values: number[];
  do {
    values = Array.from({ length: 4 }, randomNum);
  } while (!canMake24(values));
  return values.map((value) => ({ id: nextId++, value, isDisabled: false }));
}

export function applyOperator(a: number, op: Operator, b: number): number {
  return calc(a, op, b);
}
