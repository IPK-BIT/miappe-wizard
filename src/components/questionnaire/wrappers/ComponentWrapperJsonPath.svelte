<script>
export let component;
export let jsonPath = undefined;

import { isaObj } from '@/stores/isa';

let value;

if (jsonPath) {
    value = isaObj.keyed(jsonPath);
}

</script>

<svelte:component 
    this={component} 
    bind:value={$value}
    jsonPath={jsonPath}
/>

<style>

</style>