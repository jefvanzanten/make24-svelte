<script lang="ts">
  import type { HeaderProps } from "../types";

  const { resetSequence, undoMove, redoMove, canUndo, canRedo }: HeaderProps =
    $props();
</script>

<header>
  <div class="middle">
    <button onclick={resetSequence} aria-label="Nieuw spel">{"\u21BB"}</button>
    <h1>Maak 24</h1>
    <button onclick={undoMove} disabled={!canUndo} aria-label="Undo">
      {"\u21A9"}
    </button>
    <button onclick={redoMove} disabled={!canRedo} aria-label="Redo">
      {"\u21AA"}
    </button>
  </div>
</header>

<style>
  header {
    background-color: var(--primary-color);
    padding: 1em 0;
    width: 100%;
  }

  .middle {
    display: flex;
    gap: 1em;
    justify-content: center;
  }

  h1 {
    font-size: 44px;
  }

  button {
    background: none;
    border: none;
    font-size: 44px;
    cursor: pointer;

    &:disabled {
      cursor: default;
      opacity: 0.4;
    }

    &:active {
      filter: grayscale(1) brightness(0.7);
    }
  }
</style>
