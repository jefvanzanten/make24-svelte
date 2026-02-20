<script lang="ts">
  interface Props {
    value: number;
    selected?: boolean;
    disabled?: boolean;
    onclick: () => void;
  }

  let { value, selected = false, disabled = false, onclick }: Props = $props();
</script>

<button class="button" class:selected {disabled} {onclick}>
  {Number.isInteger(value) ? value : value.toFixed(2)}
</button>

<style>
  :root {
    --button-width: 42vw;
    --button-height: 20vh;
    --button-color: var(--secondary-color);

    @media screen and (min-width: 1024px) {
      --button-width: 16vw;
      --button-height: 24vh;
    }
  }

  .button {
    background-color: var(--button-color);
    font-size: 3rem;
    color: white;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", "Geneva", Verdana, sans-serif;
    box-sizing: content-box;
    border-radius: 0.3em;
    width: var(--button-width);
    height: var(--button-height);
    border: none;
    cursor: pointer;

    &:active {
      background-color: color-mix(in srgb, var(--button-color) 90%, yellow 10%);
    }

    &:visited {
      background-color: color-mix(in srgb, var(--button-color) 90%, yellow 10%);
    }

    &:disabled {
      visibility: hidden;
      width: var(--button-width);
      height: var(--button-height);
    }
  }

  .selected {
    background-color: rgb(202, 9, 9);
  }
</style>
