<script>
    export let attr;
    export let value;

    import { getContext } from 'svelte';
    import { explanation } from '@/stores/explanation.js';

    const isaLevel = getContext('isaLevel');
    explanation.setIsaLevel(isaLevel);

    //TODO: use Svelte actions to inject focus/blur behaviour into the <input> element

</script>


<section>

    <div class="attr">{attr}: <input on:focus={() => explanation.setAttr(attr)} on:blur={() => explanation.reset()} type="text" bind:value={value} /></div>

</section>


<style>
input {
    padding: 4px;
    font-family: sans-serif;
    font-size: 100%;
}
</style>