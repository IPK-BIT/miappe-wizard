<script context="module">

let rolesAvailable = [];
const mapAccessionToLabel = new Map();

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

    rolesAvailable = result['Nodes'].map(node => {
        let accUrl = 'http://purl.obolibrary.org/obo/' + node.Term.Accession;
        mapAccessionToLabel.set(accUrl, node.Term.Name);
        return {
            accession: accUrl,
            name: node.Term.Name,
            description: node.Term.Description
        }
    });

    console.log(mapAccessionToLabel);

    rolesAvailable = rolesAvailable.filter(role => !role.accession.includes('CREDIT:00000000'));
}

getCreditOntologyTerms();

</script>

<script lang="ts">
export let roles: Array<Object>;
export let ontology;
export let mode = 'edit';

import { onMount, createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

//import ontologyLookup from '@/lib/ontologyLookup';
import Schemas from '@/lib/schemas.js';

let rolesSelected = [];
let showRolesDescriptions = false;
let rolesReadable = [];


async function onChange() {
    let emptyOA = await Schemas.getObjectFromSchema('ontology_annotation');

    roles = [];
    for (let roleAccession of rolesSelected) {

        let role = rolesAvailable.find(role => role.accession === roleAccession);

        let _emptyOA = Object.assign({}, emptyOA);

        _emptyOA.termSource = 'CREDIT';
        _emptyOA.termAccession = role.accession;
        _emptyOA.annotationValue = role.name;

        roles = [...roles, _emptyOA];
    }

    rolesReadable = rolesSelected.map(r => mapAccessionToLabel.get(r));

    dispatch('change');
}

function init() {
    rolesSelected = roles.map(roleOA => roleOA.termAccession);
    rolesReadable = rolesSelected.map(r => mapAccessionToLabel.get(r));
}


onMount(() => {
    init();
})

</script>

<section style="position: relative;" class:section-bordered={mode === 'edit'}>

    <h5>Contributions of this person</h5> 

    {#if mode === 'view'}
    {#if rolesReadable.length > 0}
    <p style="margin: 5px 0 0 0;">{rolesReadable.join(', ')}</p>
    {:else}
    <p style="margin-bottom: 0;">No contributions</p>
    {/if}

    {:else}

    <button class="btn btn-secondary" style="position: absolute; top: 8px; right: 10px; margin:0;" on:click={() => showRolesDescriptions = !showRolesDescriptions}>{showRolesDescriptions == true ? 'Hide' : 'Show'} role descriptions</button>

    <div id="roles">
        {#each rolesAvailable as role}
        <div class="role">
            <input type="checkbox" value={role.accession} bind:group={rolesSelected} on:change={onChange} /> 
            <div>
                <label>{role.name}</label>
                {#if showRolesDescriptions}
                <p>{role.description.replace('"', '').replace('"', '').replace('[]', '')}</p>
                {/if}
            </div>
        
        </div>
        {/each}
    </div>

    {/if}
    
</section>


<style>
h5 {
    padding: 0;
    margin: 0;
    font-size: 100%;
    color: black;
    font-weight: 500;
}
section {
    margin-top: 10px;
    /*background: rgb(235,235,235);*/
    
}

.section-bordered {
    border: 1px solid rgb(0,0,0);
    padding: 10px;
    background: white;
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
    /*border: 1px solid rgb(150,150,150);*/
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
    top: 2px;
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