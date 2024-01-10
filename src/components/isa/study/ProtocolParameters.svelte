<script>
    let parameters;
    export { parameters as value };
    
    import { setContext } from 'svelte';
    setContext('isaLevel', 'protocol');
    
    import Schemas from '@/lib/schemas.js';
    import ProtocolParameter from './ProtocolParameter.svelte';
    
    const addParameter = async () => {
        let emptyParameter = Schemas.getObjectFromSchema('protocol_parameter');
        emptyParameter.parameterName = Schemas.getObjectFromSchema('ontology_annotation');
    
        parameters = [...parameters, emptyParameter];
    }
    
    </script>
    
    <section>
    
        <div class="attr">
            <h3>Parameters</h3>
    
            <button class="add" on:click|preventDefault={() => addParameter()}>Add Parameter</button>
    
            {#each parameters as parameter}
            <ProtocolParameter bind:parameter />
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