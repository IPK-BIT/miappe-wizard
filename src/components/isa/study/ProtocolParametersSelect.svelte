<script>
export let value;
export let jsonPath;

console.log(jsonPath);

import { onMount } from 'svelte';

import get from 'lodash.get';
import set from 'lodash.set';

import Schemas from '@/lib/schemas';

import { config } from '@/stores/config';
import { isaObj } from '@/stores/isa';

let parameters = config.checklist.defaultProtocols[0].parameters;
let parameterValues = {};

let selectedParameterNames = [];

function addParameter(parameterName) {
    if (!selectedParameterNames.includes(parameterName)) {
        selectedParameterNames = [...selectedParameterNames, parameterName];
    }
    update();
}

function getParameter(parameterName) {
    let parameter = Schemas.getObjectFromSchema('protocol_parameter');
    parameter.parameterName = Schemas.getObjectFromSchema('ontology_annotation');
    parameter.parameterName.annotationValue = parameterName;
    parameter.comments = [{name: 'value', value: parameterValues[parameterName]}]
    return parameter;
}

function update() {
    let parameters = [];
    for (let parameterName of selectedParameterNames) {
        parameters.push(getParameter(parameterName));
    }
    console.log(parameters);
    set($isaObj, jsonPath, parameters);
}

function init() {
    let parameters = get($isaObj, jsonPath);
    selectedParameterNames = parameters.map(o => o.parameterName.annotationValue);

    if (parameters.length > 0) {
        let selectedParameterValues = parameters.map(o => [
            o.parameterName.annotationValue,
            o.comments.find((c) => c.name == 'value')['value']
        ]);
        parameterValues = Object.fromEntries(selectedParameterValues);
    }
}

onMount(() => {
    init();
});

</script>

<section>

    {#if selectedParameterNames.length > 0}
    <div id="selected-parameters">
        <span>You have selected the following parameters as constants during your experiment:<br /></span>
        <table id="parameters-selected">
            <tr>
                <th>Parameter</th>
                <th>Value</th>
            </tr>
        {#each selectedParameterNames as parameterName}
        <tr>
            <td>{parameterName}</td>
            <td><input type="text" style="width: 400px;" bind:value={parameterValues[parameterName]} on:change={() => update()} /></td>
        </tr>
        {/each}
        </table>
    </div>
    {/if}


    {#if parameters.length > 0}
    <div style="height: 400px; overflow-y: scroll;">
    <table id="parameters-predefined">
        <tr>
            <th></th>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
        {#each parameters as parameter}
        {#if !selectedParameterNames.includes(parameter.label)}
        <tr>
            <td><button class="add" on:click={() => addParameter(parameter.label)}>add</button></td>
            <td>{parameter.label}</td>
            <td>{parameter.explanation}</td>
        </tr>
        {/if}
        {/each}
    </table>
    </div>
    {/if}

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