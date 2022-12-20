<script lang="ts">
    export let assays: Array<Object>;
    export { assays as value };

    import { setContext } from 'svelte';
    setContext('isaLevel', 'Assay');

    import Schemas from '@/lib/schemas.js';
    import Assay from '@/components/isa/assay/Assay.svelte';

    const addStudy = async () => {
        let emptyAssay = await Schemas.getObjectFromSchema('assay');
        assays = [...assays, emptyAssay];
    }

</script>

<section>

    <div class="attr">
        <h3>Assays</h3>

        <button on:click|preventDefault={() => addStudy()}>add assay</button>

        {#each assays as assay}
        <Assay bind:assay />
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