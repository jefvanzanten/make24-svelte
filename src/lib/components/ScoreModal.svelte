<script lang="ts">
  interface Props {
    gameEnded: boolean;
    hasWon: boolean;
    onRestart: () => void;
  }

  let { gameEnded, hasWon, onRestart }: Props = $props();
  let modal: HTMLDialogElement | null;

  function restartGame() {
    modal?.close();
    onRestart();
  }

  $effect(() => {
    if (!modal) return;

    if (gameEnded && !modal.open) {
      modal.showModal();
    }

    if (!gameEnded && modal.open) {
      modal.close();
    }
  });
</script>

<dialog bind:this={modal} id="score-modal">
  {#if hasWon}
    <h1>Gefelicteerd je hebt gewonnen!</h1>
  {:else}
    <h1>Helaas je hebt verloren...</h1>
  {/if}

  <button type="button" onclick={restartGame}>Opnieuw spelen</button>
</dialog>

<style>
  #score-modal[open] {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    width: min(92vw, 860px);
    min-height: 360px;
    border: none;
    border-radius: 18px;
    padding: 3rem;
    display: grid;
    place-items: center;
    gap: 1.5rem;
    text-align: center;
    box-shadow: 0 20px 50px rgb(0 0 0 / 30%);
  }

  #score-modal::backdrop {
    background: rgb(0 0 0 / 55%);
  }

  #score-modal h1 {
    margin: 0;
    font-size: clamp(2.2rem, 5.8vw, 4rem);
    line-height: 1.15;
  }

  #score-modal button {
    border: none;
    border-radius: 10px;
    padding: 0.8rem 1.2rem;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
    background: var(--primary-color);
  }
</style>
