<script>

import get from 'lodash.get';
import set from 'lodash.set';

import { setContext, onMount, afterUpdate, tick, createEventDispatcher } from 'svelte';

setContext('isaLevel', 'investigation');
const dispatch = createEventDispatcher();


//import { questionnaire } from '@/stores/questionnaire';
import { wizard } from '@/stores/wizard';
import { config } from '@/stores/config';
import { isaObj } from '@/stores/isa';

import Schemas from '@/lib/schemas.js';


import Date from '@/components/isa/generic/Date.svelte';
import People from '@/components/isa/generic/People.svelte';
import Studies from '@/components/isa/study/Studies.svelte';
import String from '@/components/isa/generic/String.svelte';
import Textarea from '@/components/isa/generic/Textarea.svelte';

//import MultipleChoice from '@/components/questionnaire/MultipleChoice.svelte';

import Materials from '@/components/isa/generic/materials/Materials.svelte';
import StudyTemplateGenerator from '@/components/StudyTemplateGenerator.svelte';
import ProtocolParametersSelect from '../isa/study/ProtocolParametersSelect.svelte';
import FactorsSelect from '../isa/study/FactorsSelect.svelte';
    import Uploader from '../isa/generic/Uploader.svelte';


const fieldTypes = {
    'text': String,
    'textarea': Textarea,
    'date': Date
}

const components = {
    'StudyTemplateGenerator': StudyTemplateGenerator,
    'Materials': Materials,
    'ProtocolParametersSelect': ProtocolParametersSelect,
    'FactorsSelect': FactorsSelect,
    'Uploader': Uploader
}

let steps = config.steps;

$wizard.steps = steps.length;

let currentStep = 0;

let hooksExecuted = [];

const hooks = {
    'addStudy': addStudy,
    'addProtocol': addProtocol
}

function addStudy() {
    let emptyStudy = Schemas.getMiappeStudy();
    $isaObj['studies'] = [ ...$isaObj['studies'], emptyStudy];
}

function addProtocol() {
    let emptyProtocol = Schemas.getObjectFromSchema('protocol');
    emptyProtocol.protocolType = Schemas.getObjectFromSchema('ontology_annotation');

    let params = steps[currentStep].hookParameters;

    emptyProtocol.name = params.protocolName;
    emptyProtocol.description = params.protocolDescription;
    emptyProtocol.version = params.protocolVersion;

    if (params.protocolParameters !== undefined) {
        for (let parameterName of params.protocolParameters) {
            let emptyParameter = Schemas.getObjectFromSchema('protocol_parameter');
            emptyParameter.parameterName = Schemas.getObjectFromSchema('ontology_annotation');
            emptyParameter.parameterName.annotationValue = parameterName;
            emptyProtocol.parameters = [...emptyProtocol.parameters, emptyParameter];
        }
    }

    $isaObj['studies'][0]['protocols'] = [ ...$isaObj['studies'][0]['protocols'], emptyProtocol];
}


async function initFirstStep() {
    executeStepHooks(0);
    populateFieldValues();
}

async function prev() {
    currentStep = currentStep - 1;
    $wizard.currentStep = currentStep;
    populateFieldValues();
}

async function next() {
    executeStepHooks(currentStep);
    currentStep = currentStep + 1;
    $wizard.currentStep = currentStep;
    populateFieldValues();
}

function executeStepHooks(step) {
    if (steps[step] && steps[step].hook !== undefined) {
        const hookId = steps[step].hook+'_'+step;
        if (!hooksExecuted.includes(hookId)) {
            hooks[steps[step].hook]();
            hooksExecuted.push(hookId);
            console.log('execute hook: ', steps[step].hook);
        } else {
            console.info('hooks do not get executed twice!')
        }
    }
}








function populateFieldValues() {
    if (steps[currentStep] && steps[currentStep].fields) {
        for (let field of steps[currentStep].fields) {
            if (field.isaMapping.attribute === 'comments') {
                commentMapper(field);
            } else if (field.isaMapping.entity === 'protocol') {
                field.value = get($isaObj, field.isaMapping.jsonPath);
                doRerender++;
            } else {
                nativeAttributeMapper(field);
            }
        }
    }
}

async function nativeAttributeMapper(field) {
    let target;
    if (field.isaMapping.entity === 'investigation') {
        target = $isaObj;
    } else if (field.isaMapping.entity === 'study') {
        const studyIndex = field.isaMapping.studyIndex ?? 0;
        target = $isaObj.studies[studyIndex];
    }

    if(target[field.isaMapping.attribute]) {
        field.value = target[field.isaMapping.attribute];
        doRerender++;
    }
}

async function commentMapper(field) {
    let target;
    if (field.isaMapping.entity === 'investigation') {
        target = $isaObj;
    } else if (field.isaMapping.entity === 'study') {
        const studyIndex = field.isaMapping.studyIndex ?? 0;
        target = $isaObj.studies[studyIndex];
    }

    let comment = target.comments.find((c) => c.name == field.isaMapping.commentName);
    if(comment) {
        field.value = comment.value;
        doRerender++;
    }
}








function handleKeypress() {

}



function updateStore(value, i) {
    if (value) {
        let step = steps[currentStep];
        let field = step.fields[i];

        if (field.isaMapping.attribute === 'comments') {
            updateComment(field, value);
        } else if (field.isaMapping.entity === 'protocol') {
            updateProtocol(field, value);
        } else {
            updateNativeAttribute(field, value);
        }


    }
}

function updateNativeAttribute(field, value) {
    let attr = field.isaMapping.attribute;
    if (field.isaMapping.entity === 'investigation') {
        $isaObj[attr] = value;
    } else if (field.isaMapping.entity === 'study') {
        const studyIndex = field.isaMapping.studyIndex ?? 0;
        $isaObj.studies[studyIndex][attr] = value;
    }

    //target[field.isaMapping.attribute] = value;
}

function updateProtocol(field, value) {
    set($isaObj, field.isaMapping.jsonPath, value);
}

function updateComment(field, value) {
    let target;
    if (field.isaMapping.entity === 'investigation') {
        target = $isaObj;
    } else if (field.isaMapping.entity === 'study') {
        const studyIndex = field.isaMapping.studyIndex ?? 0;
        target = $isaObj.studies[studyIndex];
    }

    let comment = target.comments.find((c) => c.name == field.isaMapping.commentName);
    if(comment) {
        comment.value = value;
    } else {
        comment = Schemas.getObjectFromSchema('comment');
        comment.name = field.isaMapping.commentName;
        comment.value = value;
        target.comments = [...target.comments, comment];
    }
    $isaObj = $isaObj;
}


function onChange(i) {
    let value = steps[currentStep].fields[i].value;
    updateStore(value, i);
}

const forceUpdate = async (_) => {};
let doRerender = 0;

onMount(() => {
    initFirstStep();
});


</script>

<section>
    {#if Object.keys($isaObj).length > 0}

    {#await forceUpdate(doRerender) then _}

    <p id="question">{steps[currentStep].title}</p>

    <div class="input-wrapper">

    <div on:keypress={handleKeypress} role="button" tabindex="0" aria-pressed="false">

        {#key currentStep}
        {#if steps[currentStep].fields}

            {#each steps[currentStep].fields as field, i}
            <svelte:component 
                this={fieldTypes[field.type]} 
                bind:value={field.value} 
                showLabel={true} 
                label={field.label} 
                isaLevel={field.isaMapping.entity}
                attr={field.explanation ? field.explanation : field.isaMapping.attribute} 
                on:change={() => onChange(i)} 
            />
            {/each}

        {/if}

        {#if steps[currentStep].component}
        <svelte:component 
            this={components[steps[currentStep].component]} 
            bind:value={$isaObj['studies'][0]}
            jsonPath={steps[currentStep].jsonPath}
        />
        {/if}

        {/key}

    </div>

    </div>

    <div style="margin-top: 45px; display: flow-root;">
        {#if currentStep > 0}
        <button class="add large" on:click={() => prev()}>Previous</button>
        {/if}

        {#if currentStep < (steps.length-1)}
        <button class="add large float-right" on:click={() => next()}>Next</button>
        {:else}
        <button class="add large float-right" on:click={() => dispatch('closeWizard')}>Close wizard</button>
        {/if}

    </div>
    
    {/await}

{/if}
</section>

<style>
    #question {
        font-weight: 500;
        font-size: 115%;
        color: rgb(30,30,30);
        margin-bottom: 40px;
    }

    .input-wrapper {
        /*background: rgb(240,240,240);*/
        padding: 0px;
        border: 0px solid rgb(200,200,200);
    }

    :global(input[type="text"]) {
        /*width: 80%;*/
    }

    .float-right {
        float: right;
    }
</style>