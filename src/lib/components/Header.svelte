<script lang="ts">
  import type { HeaderProps } from "../types";

  const { resetSequence, undoMove }: HeaderProps = $props();
</script>

<header>
  <div class="middle">
    <button onclick={resetSequence}>🔄️</button>
    <h1>Maak 24</h1>
    <button>↩️</button>
    <button>↪️</button>
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

    &:active {
      filter: grayscale(1) brightness(0.7);
    }
  }
</style>
