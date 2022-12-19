<script lang="ts">
    let studies: Array<Object>;
    export { studies as value };

    import { setContext } from 'svelte';
    setContext('isaLevel', 'Study');

    import Schemas from '@/lib/schemas.js';
    import Study from '@/components/isa/study/Study.svelte';

    const addStudy = async () => {
        let emptyStudy = await Schemas.getObjectFromSchema('study');
        studies = [...studies, emptyStudy];
    }

</script>

<section>

    <div class="attr">
        <h3>Studies</h3>

        <button class="add" on:click|preventDefault={() => addStudy()}>add study</button>

        {#each studies as study}
        <Study bind:value={study} />
        {/each}
    </div>

</section>


<style>
    section {
        background: rgba(0,0,0,0.05);
        margin-bottom: 10px;
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