<script lang="ts">
  import { GameState } from "../types";

  let modal: HTMLDialogElement | null;
  let { gameState, onPlay }: { gameState: GameState; onPlay: () => void } =
    $props();

  $effect(() => {
    if (gameState === GameState.BeforePlaying && modal && !modal.open) {
      modal.showModal();
    }
  });

  const play = () => {
    onPlay();
    modal?.close();
  };
</script>

<dialog bind:this={modal}>
  <h1>Maak 24</h1>
  <div class="content">
    <p class="rules-text">Uileg bla bla</p>
    <fieldset>
      <legend>Kies een niveau</legend>
      <input type="radio" id="easy" name="difficulty" value="easy" checked />
      <label for="easy">Makkelijk</label>
      <input type="radio" id="medium" name="difficulty" value="medium" />
      <label for="medium">Gemiddeld</label>
      <input type="radio" id="hard" name="difficulty" value="hard" />
      <label for="hard">Moeilijk</label>
    </fieldset>
  </div>
  <button onclick={play}>Play</button>
</dialog>

<style>
  dialog {
    width: 400px;
    height: 600px;
    margin: auto;
    inset: 0;
    background-color: rgb(30, 30, 30);
    border-radius: 10px;

    &::backdrop {
      background-color: rgba(0, 0, 0, 0.6);
    }
  }

  h1 {
    text-align: center;
    padding: 10px 0;
    background-color: var(--primary-color);
    color: rgb(44, 44, 44);
    max-height: 12%;
  }

  .content {
    min-height: 60%;
    background-color: rgb(206, 206, 206);
    padding: 1em;
    color: black;
    display: flex;
    flex-direction: column;

    fieldset {
      border: 1px solid black;
      padding: 1em;
      display: flex;
      justify-content: space-evenly;
      color-scheme: light;
    }

    input[type="radio"] {
      appearance: auto;
      border: initial;
      accent-color: var(--secondary-color);
    }

    .rules-text {
      flex: 1;
    }
  }

  button {
    display: block;
    background-color: var(--secondary-color);
    width: 100%;
    height: 8%;
    font-size: 22px;
    font-weight: 600;
  }
</style>
