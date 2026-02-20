<script lang="ts">
  import { OPERATORS } from "./lib/game-logic";
  import { createGame } from "./lib/Game.svelte";
  import Header from "./lib/components/Header.svelte";
  import NumberTile from "./lib/components/NumberTile.svelte";
  import OperatorTile from "./lib/components/OperatorTile.svelte";
  import ScoreModal from "./lib/components/ScoreModal.svelte";
  import BeforePlayingModal from "./lib/components/BeforePlayingModal.svelte";
  import { GameState } from "./lib/types";

  const game = createGame();
</script>

<Header resetSequence={() => game.newGame()} undoMove={() => {}} />
  <main class="container">
  {#if game.currentState === GameState.Playing}
    <div class="number-container">
      {#each game.tiles as tile (tile.id)}
        <NumberTile
          value={tile.value}
          selected={tile.id === game.selectedTileId}
          disabled={game.isGameOver || tile.isDisabled}
          onclick={() => game.selectTile(tile.id)}
        />
      {/each}
    </div>

    <div class="operator-container">
      {#each OPERATORS as operator}
        <OperatorTile
          {operator}
          selectedOperator={game.selectedOperator}
          disabled={game.selectedTileId === null}
          onselect={game.selectOperator}
        />
      {/each}
    </div>
  {/if}

  <BeforePlayingModal gameState={game.currentState} onPlay={game.startGame} />
  <ScoreModal hasWon={game.isGameOver} gameEnded={game.isGameOver} />
</main>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
    gap: 1em;
    min-width: 100%;

    @media screen and (min-width: 1024px) {
      width: 40%;
    }
  }

  .number-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1em;
  }

  .operator-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1em;
  }
</style>
