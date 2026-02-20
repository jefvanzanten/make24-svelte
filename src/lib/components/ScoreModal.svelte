<script lang="ts">
    let { gameEnded, hasWon } = $props();
    let modal: HTMLDialogElement | null;

    $effect(() => {
        if(gameEnded) {
            modal?.showModal();
        }
    })
</script>

<dialog bind:this={modal} id="score-modal">
    {#if hasWon}
        <h1>Gefelicteerd je hebt gewonnen!</h1>
    {:else if !hasWon}
        <h1>Helaas je hebt verloren...</h1>
    {/if}
</dialog>