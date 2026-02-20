<script lang="ts">
  import type { Operator } from "../types";

  interface Props {
    operator: Operator;
    selectedOperator: Operator | null;
    disabled: boolean;
    onselect: (op: Operator) => void;
  }

  let { operator, selectedOperator, disabled, onselect }: Props = $props();

  const OPERATOR_LABELS: Record<Operator, string> = {
    "+": "+",
    "-": "-",
    "*": "x",
    "/": ":",
  };
</script>

<button
  class:active={selectedOperator === operator}
  {disabled}
  onclick={() => onselect(operator)}
>
  {OPERATOR_LABELS[operator]}
</button>

<style>
  button {
    font-size: 2rem;
    width: 20vw;
    height: 9vh;
    background-color: var(--primary-color);
    border: none;
    border-radius: 0.2em;
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 10px;
    border: 2px solid transparent;
    color: #000;

    @media screen and (min-width: 1024px) {
      width: 8vw;
      font-size: 4rem;
    }

    &:disabled {
      cursor: default;
    }

    &.active {
      background-color: rgb(255, 145, 0);
    }
  }
</style>
