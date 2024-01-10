<script>

import get from 'lodash.get';
import set from 'lodash.set';

import { onMount, afterUpdate, tick } from 'svelte';

import { setContext } from 'svelte';
setContext('isaLevel', 'investigation');

import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

import { explanation } from '@/stores/explanation.js';

import { questionnaire } from '@/stores/questionnaire';
import { wizard } from '@/stores/wizard';

import Schemas from '@/lib/schemas.js';


let test = Schemas.getSource('HOR_1000', {
    'Genus': 'Hordeum',
    'Species': 'vulgare'
});

console.log(test);


import Date from '@/components/isa/generic/Date.svelte';
import People from '@/components/isa/generic/People.svelte';
import Studies from '@/components/isa/study/Studies.svelte';
import String from '@/components/isa/generic/String.svelte';
import Textarea from '@/components/isa/generic/Textarea.svelte';

import MultipleChoice from '@/components/questionnaire/MultipleChoice.svelte';

//import StudyBasicsSection from './miappe/StudyBasicsSection.svelte';
//import StudyContactSection from './miappe/StudyContactSection.svelte';

import Materials from '@/components/isa/generic/materials/Materials.svelte';
import StudyTemplateGenerator from '@/components/StudyTemplateGenerator.svelte';
import ProtocolParametersSelect from '../isa/study/ProtocolParametersSelect.svelte';
import FactorsSelect from '../isa/study/FactorsSelect.svelte';

import miappe from '@/lib/miappe/miappeChecklist';
import wording from '@/lib/wording';
import { isaObj } from '@/stores/isa';


const fieldTypes = {
    'text': String,
    'textarea': Textarea,
    'date': Date
}

const components = {
    'StudyTemplateGenerator': StudyTemplateGenerator,
    'Materials': Materials,
    'ProtocolParametersSelect': ProtocolParametersSelect,
    'FactorsSelect': FactorsSelect
}

let steps = [
    {
        title: 'Please provide title and description of your plant phenotyping project.',
        fields: [
            {
                label: 'Project title',
                type: 'text',
                isaMapping: {
                    entity: 'investigation',
                    attribute: 'title'
                },
                explanation: 'DM-3'
            },
            {
                label: 'Project description',
                type: 'textarea',
                isaMapping: {
                    entity: 'investigation',
                    attribute: 'description'
                }
            }
        ]
    },
    {
        title: 'What is the submission date of your plant phenotyping project?',
        fields: [
            {
                label: 'Submission date:',
                type: 'date',
                isaMapping: {
                    entity: 'investigation',
                    attribute: 'submissionDate'
                }
            }
        ]
    },
    {
        title: 'Please provide contact address of your institute.',
        fields: [
            {
                label: 'Contact address',
                type: 'text',
                isaMapping: {
                    entity: 'investigation',
                    attribute: 'comments',
                    commentName: 'Study Contact Institution'
                },
                explanation: 'DM-16'
            },
            {
                label: 'Country',
                type: 'text',
                isaMapping: {
                    entity: 'investigation',
                    attribute: 'comments',
                    commentName: 'Study Country'
                },
                explanation: 'DM-17'
            }
        ],
        hook: 'addStudy'
    },
    {
        title: 'What is the title of your experiment?',
        fields: [
            {
                label: 'Study title',
                type: 'text',
                isaMapping: {
                    entity: 'study',
                    attribute: 'title'
                }
            }
        ]
    },
    {
        title: 'Please provide contact address of your institute.',
        fields: [
            {
                label: 'Contact address',
                type: 'text',
                explanation: 'DM-16',
                isaMapping: {
                    entity: 'study',
                    attribute: 'comments',
                    commentName: 'Study Contact Institution'
                }
            },
            {
                label: 'Country',
                type: 'text',
                explanation: 'DM-17',
                isaMapping: {
                    entity: 'study',
                    attribute: 'comments',
                    commentName: 'Study Country'
                }
            }
        ]
    },
    {
        title: 'Please provide a link to the data file of the study.',
        fields: [
            {
                label: 'Study Data File Link',
                type: 'text',
                isaMapping: {
                    entity: 'study',
                    attribute: 'comments',
                    commentName: 'Study Data File Link'
                }
            },
            {
                label: 'Study Data File Description',
                type: 'textarea',
                isaMapping: {
                    entity: 'study',
                    attribute: 'comments',
                    commentName: 'Study Data File Description'
                }
            }
        ],
        hook: 'addProtocol',
        hookParameters: {
            protocolName: 'Growth',
            protocolVersion: 'MIAPPE v1.1',
            protocolDescription: 'How the plants were grown up.',
            //protocolParameters: ['Light intensity', 'Air temperature']
        }
    },
    {
        title: 'Please describe how the plants were grown up.',
        fields: [
            {
                label: 'Growth description',
                type: 'textarea',
                isaMapping: {
                    entity: 'protocol',
                    attribute: 'description',
                    jsonPath: 'studies[0].protocols[0].description'
                }
            }
        ]
    },
    {
        title: 'Select parameters that were kept constant for all samples during the experiment.',
        level: 'Study',
        component: 'ProtocolParametersSelect',
        jsonPath: 'studies[0].protocols[0].parameters'
    },
    {
        title: 'Select factors that were different between the samples.',
        level: 'Study',
        component: 'FactorsSelect',
        jsonPath: 'studies[0].factors'
    },
    /*{
        title: 'Growth Protocol',
        level: 'Study',
        component: 'StudyTemplateGenerator'
    },
    {
        title: 'Materials',
        level: 'Study',
        component: 'Materials'
    }*/
];

$wizard.steps = steps.length;

let currentStep = 0;

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
        hooks[steps[step].hook]();
        console.log('execute hook: ', steps[step].hook);
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
        target = $isaObj.studies[0];
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
        target = $isaObj.studies[0];
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
    let target;
    if (field.isaMapping.entity === 'investigation') {
        target = $isaObj;
    } else if (field.isaMapping.entity === 'study') {
        target = $isaObj.studies[0];
    }

    target[field.isaMapping.attribute] = value;
}

function updateProtocol(field, value) {
    set($isaObj, field.isaMapping.jsonPath, value);
}

function updateComment(field, value) {
    let target;
    if (field.isaMapping.entity === 'investigation') {
        target = $isaObj;
    } else if (field.isaMapping.entity === 'study') {
        target = $isaObj.studies[0];
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