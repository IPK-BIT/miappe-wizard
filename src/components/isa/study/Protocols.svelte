<script>
let protocols;
export { protocols as value };

import { setContext } from 'svelte';
setContext('isaLevel', 'protocol');

import Schemas from '@/lib/schemas.js';
import Protocol from './Protocol.svelte';

const addProtocol = async () => {
    let emptyProtocol = Schemas.getObjectFromSchema('protocol');

    let protocolType = Schemas.getObjectFromSchema('ontology_annotation');
    emptyProtocol.protocolType = protocolType;

    protocols = [...protocols, emptyProtocol];
}

</script>

<section>

    <div class="attr">
        <h3>Protocols</h3>

        <button class="add" on:click|preventDefault={() => addProtocol()}>Add Protocol</button>

        {#each protocols as protocol}
        <Protocol bind:protocol />
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