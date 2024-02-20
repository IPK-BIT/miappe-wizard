<script>
export let value;
export let jsonPath;

import { onMount } from 'svelte';

import get from 'lodash.get';
import set from 'lodash.set';

import Schemas from '@/lib/schemas';

import { config } from '@/stores/config';
import { isaObj } from '@/stores/isa';

let factors = config.checklist.studyFactors;


let selectedFactorNames = [];

function addFactor(factorName) {
    if (!selectedFactorNames.includes(factorName)) {
        selectedFactorNames = [...selectedFactorNames, factorName];
    }
    update();
}

function getFactor(factorName) {
    let factor = Schemas.getObjectFromSchema('factor');
    factor.factorType = Schemas.getObjectFromSchema('ontology_annotation');
    factor.factorName = factorName;
    return factor;
}

function update() {
    let factors = [];
    for (let factorName of selectedFactorNames) {
        factors.push(getFactor(factorName));
    }
    console.log(factors);

    set($isaObj, jsonPath, factors);
    $isaObj = $isaObj;
}

function init() {
    let factors = get($isaObj, jsonPath);
    selectedFactorNames = factors.map(o => o.factorName);
}

onMount(() => {
    init();
});

</script>

<section>

    {#if selectedFactorNames.length > 0}
    <div id="selected-parameters">
        <span>You have selected the following factors as varying between samples:<br /></span>
        <ul>
        {#each selectedFactorNames as factorName}
            <li>{factorName}</li>
        {/each}
        </ul>
    </div>
    {/if}

    <table id="parameters-predefined">
        <tr>
            <th></th>
            <th>Factor</th>
            <th>Description</th>
        </tr>
        {#each factors as factor}
        {#if !selectedFactorNames.includes(factor.label)}
        <tr>
            <td><button class="add" on:click={() => addFactor(factor.label)}>add</button></td>
            <td>{factor.label}</td>
            <td>{factor.explanation}</td>
        </tr>
        {/if}
        {/each}
    </table>

</section>

<style>
#selected-parameters {
    border: 3px solid rgb(21, 209, 17);
    background: rgb(240,240,240);
    padding: 20px;
    margin-bottom: 40px;
}

#selected-parameters span {
    font-weight: 500;
}

table#parameters-predefined {
    border-collapse: collapse;
}

table#parameters-predefined tr td, table#parameters-predefined tr th {
    border: 1px solid rgb(130,130,130);
    padding: 3px 6px 3px 6px;
    font-size: 0.9em;
}

table#parameters-predefined tr th {
    font-weight: 500;
    background: rgb(240,240,240);
}


table#parameters-selected {
    border-collapse: collapse;
    margin-top: 30px;
}

table#parameters-selected tr td, table#parameters-selected tr th {
    border: 0px solid rgb(130,130,130);
    padding: 3px 6px 3px 6px;
    font-size: 0.9em;
}

table#parameters-selected tr th {
    font-weight: 500;
    background: rgb(240,240,240);
    font-size: 1em;
}

table#parameters-selected tr th:nth-child(1) {
    text-align: left;
}

table#parameters-selected tr td:nth-child(1) {
    padding-right: 30px;
}
</style>