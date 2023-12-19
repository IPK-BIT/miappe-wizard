<script>
let factors;
export { factors as value };

import Schemas from '@/lib/schemas.js';
import Factor from './Factor.svelte';

const addFactor = async () => {
    let emptyFactor = Schemas.getObjectFromSchema('factor');
    factors = [...factors, emptyFactor];
}

</script>

<section>

    <div class="attr">
        <h3>Factors</h3>

        <button class="add" on:click|preventDefault={() => addFactor()}>Add Factor</button>

        {#each factors as factor}
        <Factor bind:factor />
        {/each}
    </div>

</section>


<style>
    section {
        background: rgba(0,0,0,0.05);
        margin-bottom: 10px;
    }
    h3 {
        display: inline;
        margin: 0 0 10px 0;
        font-weight: 500;
    }
    button {
        margin-left: 8px;
        margin-bottom: 10px;
    }
</style>