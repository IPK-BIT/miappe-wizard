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

let rolesAvailable = [];

let showRolesDescriptions = false;

async function getCreditOntologyTerms() {
    let apiurl = 'https://swate.nfdi4plants.org/api/IOntologyAPIv2/getTreeByAccession';

    let response = await fetch(apiurl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(['CREDIT:00000000'])
    });

    let result = await response.json();

    console.log(result);

    rolesAvailable = result['Nodes'].map(node => {
        return {
            accession: node.Term.Accession,
            name: node.Term.Name,
            description: node.Term.Description
        }
    });

    console.log(rolesAvailable);

    rolesAvailable = rolesAvailable.filter(role => role.accession !== 'CREDIT:00000000');
    
}

getCreditOntologyTerms();



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

<section style="position: relative;">

    <h5>Contributions of this person</h5> <button style="position: absolute; top: 8px; left: 250px; margin:0;" on:click={() => showRolesDescriptions = !showRolesDescriptions}>{showRolesDescriptions == true ? 'Hide' : 'Show'} role descriptions</button>

    <div id="roles">
        {#each rolesAvailable as role}
        <div class="role">
            <input type="checkbox"> 
            <div>
                <label>{role.name}</label>
                {#if showRolesDescriptions}
                <p>{role.description.replace('"', '').replace('"', '').replace('[]', '')}</p>
                {/if}
            </div>
        
        </div>
        {/each}
    </div>
    

    <!--

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

-->

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



#roles {
    /*display: flow-root;*/
    margin-top: 15px;
    display: grid;
    row-gap: 0.5em;
    column-gap: 1em;
    grid-template-columns: repeat(2, 1fr);
    /*grid-template-rows: masonry;*/
    /*height: 150px;
    overflow-y: scroll;*/
    border: 1px solid rgb(150,150,150);
    padding: 10px;
}

div.role {
    /*float: left;*/
    position: relative;
    /*margin-bottom: 10px;*/
    border: 0px solid rgb(200,200,200);
    /*padding: 6px;*/
    /*width: 49%;*/
    /*background: white;*/
    
}

div.role label {
    font-weight: 400;
}

div.role input {
    position: absolute;
    top: 0px;
    left: 7px;
}

div.role div {
    margin-left: 30px;
}

div.role p {
    margin: 5px 0 10px 0;
    font-size: 0.80em;
}
</style>