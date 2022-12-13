<script lang="ts">
    export let attr;
    let materials: Array<Object>;
    export { materials as value };

    import Schemas from '@/lib/schemas.js';
    //import Assay from '@/components/isa/assay/Assay.svelte';

    const addStudy = async () => {
        let emptyAssay = await Schemas.getObjectFromSchema('assay');
        assays = [...assays, emptyAssay];
    }

    let materialsInput = '';

    let materialIds: Array<String>;
    $: materialIds = materialsInput.split(/\r?\n/).filter(item => item != '');
    $: console.log(materialIds);

</script>

<section>

    <div class="attr">
        <h3>Materials</h3>

        <br />
        <textarea bind:value={materialsInput} ></textarea>
        <br />
        {materialIds}

        <button on:click|preventDefault={() => addStudy()}>add material source</button>

        <!--{#each assays as assay}
        <Assay bind:assay />
        {/each}-->
    </div>

</section>


<style>
    textarea {
        width: 100%;
        height: 100px;
    }
    button {
        margin: 0 0 10px 8px;
    }
    h3 {
        display: inline;
        margin: 0 0 10px 0;
        font-style: italic;
    }
</style>