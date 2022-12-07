<script lang="ts">
    let studies: Array<Object>;
    export { studies as value };

    import Schemas from '@/lib/schemas.js';
    import Study from '@/components/study/Study.svelte';

    const addStudy = async () => {
        let emptyStudy = await Schemas.getObjectFromSchema('study');
        studies = [...studies, emptyStudy];
    }

</script>

<section>

    <div class="attr">
        <h3>Studies</h3>

        <button on:click|preventDefault={() => addStudy()}>add study</button>

        {#each studies as study}
        <Study bind:study />
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