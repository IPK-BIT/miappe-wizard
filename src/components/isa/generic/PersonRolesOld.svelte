<script lang="ts">
    export let roles: Array<Object>;
    export let ontology;

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import Svelecte from 'svelecte';

    import ontologyLookup from '@/lib/ontologyLookup';
    import Schemas from '@/lib/schemas.js';

    import Comment from '@/components/isa/generic/Comment.svelte';

    let rolesSelected;

    async function handleFetch(query) {
        let result = await ontologyLookup(query, ontology);
        result = result.map(item => {
            
            item.origName = item.Name;
            item.Name = item.Name+' ['+item.Accession+']';

            return item;
        });

        return result;
    }

    const addRoles = async () => {
        let emptyOA = await Schemas.getObjectFromSchema('ontology_annotation');

        for (let role of rolesSelected) {
            let _emptyOA = Object.assign({}, emptyOA);
            _emptyOA.termSource = role.FK_Ontology;
            _emptyOA.termAccession = 'http://purl.obolibrary.org/obo/'+role.Accession;
            _emptyOA.annotationValue = role.origName;

            roles = [...roles, _emptyOA];
        }
        rolesSelected = [];
        dispatch('change');
    }

    function onDelete(index) {
        roles.splice(index, 1);
        roles = [...roles];
    }

</script>

<section>

    <h5>Roles of this person</h5>

    <ul>
    {#each roles as oa, index}
        <li><b>{@html oa.annotationValue}</b> [{oa.termAccession}] <button on:click={() => onDelete(index)}>X</button></li>
    {/each}
    </ul>

    <Svelecte name="selection"
        bind:value={rolesSelected}
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