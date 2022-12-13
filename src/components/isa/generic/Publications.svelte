<script lang="ts">
    let publications: Array<Object>;
    export { publications as value };

    import { setContext } from 'svelte';
    setContext('isaLevel', 'Publication');

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

        <button on:click|preventDefault={() => addPublication()}>add publication</button>

        {#each publications as publication}
        <Publication bind:publication />
        {/each}
    </div>

</section>


<style>
    button {
        margin: 0 0 10px 8px;
    }
    h3 {
        display: inline;
        margin: 0 0 10px 0;
        font-style: italic;
    }
</style>