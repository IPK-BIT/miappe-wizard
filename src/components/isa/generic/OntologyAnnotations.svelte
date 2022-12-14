<script lang="ts">
    export let ontologyAnnotations: Array<Object>;

    import ontologyLookup from '@/lib/ontologyLookup';

    import Comment from '@/components/isa/generic/Comment.svelte';
    import Svelecte from 'svelecte';

    import Schemas from '@/lib/schemas.js';
    import Assay from '@/components/isa/assay/Assay.svelte';


    const addRole = () => {
        comments = [...comments, {name: '', value: ''}];
    }

    /*function handleRemoveComment(event) {
        comments.splice(event.detail.index, 1);
        comments = [...comments];
    }*/

    let payload = null;

    function onSubmit(e) {
        const object = {};
        const formData = new FormData(e.target);
        formData.forEach((value, key) => {
            if (object[key]) {
            object[key] += ', ' + value;
            return;
            }
            object[key] = value
        });
        payload = JSON.stringify(object, null, 2);
    }

    function resetPayload(e) {
        payload = null;
    }

    async function handleFetch(query) {
        console.log(query);
        let result = await ontologyLookup(query);
        result = result.map(item => {
            
            item.origName = item.Name;
            item.Name = '<b>'+item.Name+'</b> ['+item.Accession+']';

            /*return {
                'name': item.Name+'['+item.Accession+']',
                'acc': item.Accession
            }*/
            return item;
        });
        console.log(result);
        console.log(result[0][1]);
        return result;
    }

    let roles;
    $: console.log(roles);

    const addRoles = async () => {
        let emptyOA = await Schemas.getObjectFromSchema('ontology_annotation');

        for (let role of roles) {
            let _emptyOA = Object.assign({}, emptyOA);
            _emptyOA.termAccession = role.Accession;
            _emptyOA.annotationValue = role.origName;

            console.log(_emptyOA);
            ontologyAnnotations = [...ontologyAnnotations, _emptyOA];
            console.log(ontologyAnnotations);
        }
        roles = [];
    }

</script>

<section>

    <h5>Roles of this person</h5>

    <ul>
    {#each ontologyAnnotations as oa, index}
        <li><b>{@html oa.annotationValue}</b> [{oa.termAccession}]</li>
    {/each}
    </ul>

    <!--<input type /> <button on:click|preventDefault={() => addRole()}>add role</button>-->

    

    <form action="" on:submit|preventDefault={onSubmit}>
        <Svelecte name="selection"
            bind:value={roles}
            on:change={resetPayload}
            valueAsObject={true}
            multiple
            required
            placeholder="Search for OntologyTerm"
            fetch={handleFetch}
        >
        </Svelecte>

        <div class="mt-2">
          <button on:click|preventDefault={() => addRoles()} class="btn btn-success">Add roles</button>
        </div>

        {#if payload}
          <pre>{payload}</pre>
        {/if}
    </form>

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