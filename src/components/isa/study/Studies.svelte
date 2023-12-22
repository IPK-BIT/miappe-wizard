<script lang="ts">
    let studies: Array<Object>;
    export { studies as value };
    export let attr = '';

    import { setContext } from 'svelte';
    setContext('isaLevel', 'study');

    import wording from '@/lib/wording';

    import Schemas from '@/lib/schemas.js';
    import Study from '@/components/isa/study/Study.svelte';

    const addStudy = async () => {
        let emptyStudy = Schemas.getMiappeStudy();
        studies = [...studies, emptyStudy];
    }

</script>

<section>

    <div class="attr">
        <h3>{wording.Studies}</h3>

        {#if studies.length > 0}
        {#each studies as study,i}
        <Study idx={i} bind:value={study} />
        {/each}
        {:else}
        <p><i>No {wording.studies} have yet been created for this {wording.investigation}.</i></p>
        {/if}

        <button class="add" on:click|preventDefault={() => addStudy()}>add {wording.study}</button>
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