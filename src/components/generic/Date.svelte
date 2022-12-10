<script>
    export let attr;
    let date;
    export { date as value };

    import { explanationActionFactory } from '@/actions/explanation.js';
    import { getContext } from 'svelte';
    const isaLevel = getContext('isaLevel');

    let explanationAction = explanationActionFactory(isaLevel);

</script>


<section>

    <div class="attr">{attr}: <input use:explanationAction data-attr={attr} class="datepicker" type="date" bind:value={date} /></div>

</section>


<style>
.datepicker {
    padding: 4px;
    font-family: sans-serif;
    font-size: 100%;
}
</style>