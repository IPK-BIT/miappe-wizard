<script lang="ts">
    export let ontologyAnnotations: Array<Object>;

    import Svelecte from 'svelecte';

    import ontologyLookup from '@/lib/ontologyLookup';
    import Schemas from '@/lib/schemas.js';

    import Comment from '@/components/isa/generic/Comment.svelte';

    let roles;

    async function handleFetch(query) {
        let result = await ontologyLookup(query);
        result = result.map(item => {
            
            item.origName = item.Name;
            item.Name = '<b>'+item.Name+'</b> ['+item.Accession+']';

            return item;
        });

        return result;
    }

    const addRoles = async () => {
        let emptyOA = await Schemas.getObjectFromSchema('ontology_annotation');

        for (let role of roles) {
            let _emptyOA = Object.assign({}, emptyOA);
            _emptyOA.termAccession = role.Accession;
            _emptyOA.annotationValue = role.origName;

            ontologyAnnotations = [...ontologyAnnotations, _emptyOA];
        }
        roles = [];
    }

    function onDelete(index) {
        ontologyAnnotations.splice(index, 1);
        ontologyAnnotations = [...ontologyAnnotations];
    }

</script>

<section>

    <h5>Roles of this person</h5>

    <ul>
    {#each ontologyAnnotations as oa, index}
        <li><b>{@html oa.annotationValue}</b> [{oa.termAccession}] <button on:click={() => onDelete(index)}>X</button></li>
    {/each}
    </ul>

    <Svelecte name="selection"
        bind:value={roles}
        valueAsObject={true}
        multiple
        required
        placeholder="Search for OntologyTerm"
        fetch={handleFetch}
    />

    <div class="mt-2">
        <button on:click|preventDefault={() => addRoles()} class="btn btn-success">Add roles</button>
    </div>

</section>


<style>
    h5 {
        padding: 0;
        margin: 0;
        font-size: 100%;
        color: darkslateblue;
    }
    section {
        margin-top: 10px;
        border: 1px solid rgb(200,200,200);
        background: rgb(235,235,235);
        padding: 10px;
    }
    button {
        margin-top: 15px;
    }
</style>