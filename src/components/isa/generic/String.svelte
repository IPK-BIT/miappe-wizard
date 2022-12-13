<script>
    export let attr;
    export let value;

    import { explanationActionFactory } from '@/actions/explanation.js';
    import { getContext } from 'svelte';
    const isaLevel = getContext('isaLevel');

    let explanationAction = explanationActionFactory(isaLevel);

</script>


<section>

    <div class="attr"><label>{attr}:</label> <input use:explanationAction data-attr={attr} type="text" bind:value={value} /></div>

</section>


<style>
    input {
        padding: 4px;
        font-family: sans-serif;
        font-size: 100%;
    }
</style>