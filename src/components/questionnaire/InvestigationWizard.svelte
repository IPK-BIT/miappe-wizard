<script>
    export let isa;

    import { setContext } from 'svelte';
    setContext('isaLevel', 'Investigation');

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import { questionnaire } from '@/stores/questionnaire';

    import Date from '@/components/isa/generic/Date.svelte';
    import People from '@/components/isa/generic/People.svelte';
    import Studies from '@/components/isa/study/Studies.svelte';
    import String from '@/components/isa/generic/String.svelte';

    import MultipleChoice from '@/components/questionnaire/MultipleChoice.svelte';

    import miappe from '@/lib/miappe/miappeChecklist';
    import wording from '@/lib/wording';

    let options = {};

    options['phenotypingExperimentType'] = [
        {
            'value': questionnaire.PhenotypingExperimentType.singleOrganismSingleSample,
            'label': 'One organism with a single sample per each accession.',
            'example': 'From 100 seeds of barley you have grown 100 plants.' //  All plants treated equally.
        },
        {
            'value': questionnaire.PhenotypingExperimentType.singleOrganismMultiSample,
            'label': 'One organism with multiple samples per each accession.',
            'example': 'From 100 different accessions of barley you derived 5 seeds per accessions. From these 5 seeds per accession you have grown 5 plants per accession resulting in 500 plants totally.'
        },
        {
            'value': questionnaire.PhenotypingExperimentType.multiOrganismSingleSample,
            'label': 'Multiple organisms with a single samples per each accession.',
            'example': 'N/A'
        },
        {
            'value': questionnaire.PhenotypingExperimentType.multiOrganismMultiSample,
            'label': 'Multiple organisms with multiple samples per each accession.',
            'example': 'N/A'
        }
    ];

    options['growthFacilityType'] = [
        {
            'value': questionnaire.GrowthFacilityType.outdoor,
            'label': 'Outdoor / acre'
        },
        {
            'value': questionnaire.GrowthFacilityType.greenhouse,
            'label': 'Greenhouse'
        },
        {
            'value': questionnaire.GrowthFacilityType.phytochamber,
            'label': 'Phytochamber'
        },
        {
            'value': questionnaire.GrowthFacilityType.lemnatecFacility,
            'label': 'Lemnatec facility'
        }
    ];



    let currentStep = 0;

    let steps = [
        // {
        //     question: 'What type of plant phenotyping experiment did you perform?',
        //     key: null,
        //     component: MultipleChoice,
        //     questionId: 'phenotypingExperimentType'
        // },
        // {
        //     question: 'In which environment or technical facility did the plants grow up?',
        //     key: null,
        //     component: MultipleChoice,
        //     questionId: 'growthFacilityType'
        // },
        {
            question: 'What is the title of your plant phenotyping project?', // miappe['DM-3'].question, //
            key: 'title',
            label: 'Title',
            component: String,

        },
        {
            question: 'What is the description of your plant phenotyping project?',
            key: 'description',
            label: 'Description',
            component: String
        },
        {
            question: 'What is the submission date of your plant phenotyping project?',
            key: 'submissionDate',
            label: 'Date of submission',
            component: Date
        },
        {
            question: 'What is the public release date of your plant phenotyping project?',
            key: 'publicReleaseDate',
            label: 'Date of public release',
            component: Date
        },
        /*{
            question: 'You can add one or multiple authors:',
            key: 'people',
            component: People
        },*/
        {
            question: 'You can add one or multiple '+wording.studies+':',
            key: 'studies',
            component: Studies
        },
        { // <String bind:value={study.contactInstitution} attr="contactInstitution" />
            question: 'What is the contact of your institution?',
            level: 'Study',
            key: 'contactInstitution',
            label: 'Contact of institute',
            component: String
        },
    ];

    function prev() {
        currentStep = currentStep - 1;
        executeStepHooks(currentStep);
    }

    function next() {
        /*if (typeof(steps[currentStep].saveSelectedValue) === 'function') {
            steps[currentStep].saveSelectedValue();
        }*/
        currentStep = currentStep + 1;
        executeStepHooks(currentStep);
    }

    function executeStepHooks() {

    }

    function handleKeypress(event) {
        if (event.keyCode === 13) { // ENTER / RETURN
            next();
        }
    }

</script>


<section>
    {#if Object.keys(isa).length > 0}
    
            <p id="question">{steps[currentStep].question}</p>

            <div class="input-wrapper">

            <div on:keypress={handleKeypress} role="button" tabindex="0" aria-pressed="false">

                {#if steps[currentStep].key === null}

                    {#if steps[currentStep].questionId !== undefined && steps[currentStep].questionId != ''}
                    <svelte:component this={steps[currentStep].component} options={options[steps[currentStep].questionId]} questionId={steps[currentStep].questionId} />
                    {:else}
                    <svelte:component this={steps[currentStep].component} />
                    {/if}

                {:else}

                    {#if steps[currentStep].level === 'Study'}
                    <svelte:component this={steps[currentStep].component} bind:value={isa['studies'][0][steps[currentStep].key]} showLabel={false} label={steps[currentStep].label} attr={steps[currentStep].key} />
                    {:else}
                    <svelte:component this={steps[currentStep].component} bind:value={isa[steps[currentStep].key]} showLabel={false} label={steps[currentStep].label} attr={steps[currentStep].key} />
                    {/if}

                {/if}

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
        

    {/if}

    <!--<pre>{JSON.stringify($questionnaire)}</pre>-->

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