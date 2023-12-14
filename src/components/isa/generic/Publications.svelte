<script lang="ts">
    let publications: Array<Object>;
    export { publications as value };
    export let attr = '';

    import { setContext } from 'svelte';
    setContext('isaLevel', 'Publication');

    import wording from '@/lib/wording';

    import Schemas from '@/lib/schemas.js';
    import Publication from '@/components/isa/generic/Publication.svelte';

    const addPublication = async () => {
        let emptyPublication = await Schemas.getObjectFromSchema('publication');
        publications = [...publications, emptyPublication];
    }

</script>

<section>

    <div class="attr">
        <h3>Publications</h3>

        {#if publications.length > 0}
        {#each publications as publication}
        <Publication bind:publication />
        {/each}
        {:else}
        <p><i>No publications have yet been created.</i></p>
        {/if}

        <button class="add" on:click|preventDefault={() => addPublication()}>add publication</button>
    </div>

</section>


<style>
    section {
        background: rgba(0,0,0,0.05);
        margin-bottom: 10px;
    }
    button {
        margin: 0 0 10px 0;
    }
    h3 {
        display: inline;
        margin: 0 0 10px 0;
        font-weight: 500;
    }
</style>