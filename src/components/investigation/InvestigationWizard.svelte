<script>
    export let isa;

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import Date from '@/components/generic/Date.svelte';
    import People from '@/components/generic/People.svelte';
    import Studies from '@/components/study/Studies.svelte';
    import String from '@/components/generic/String.svelte';

    let componentMapper = {
        'submissionDate': Date,
        'people': People,
        'studies': Studies
    };

    let currentStep = 0;

    let steps = [
        {
            question: 'What is the title of your investigation?',
            key: 'title',
            component: String
        },
        {
            question: 'What is the description of your investigation?',
            key: 'description',
            component: String
        },
        {
            question: 'What is the submission date of your investigation?',
            key: 'submissionDate',
            component: Date
        },
        {
            question: 'What is the public release date of your investigation?',
            key: 'publicReleaseDate',
            component: Date
        },
        {
            question: 'You can add one or multiple authors:',
            key: 'people',
            component: People
        },
    ];

    let components = Object.keys(componentMapper);

    function next() {
        currentStep = currentStep + 1;
        console.log(currentStep);
        console.log(steps.length);
    }

    function closeWizard() {
        console.log('CLOSE');
		dispatch('closeWizard', {
			text: 'Hello!'
		});
	}
</script>


<section>
    {#if Object.keys(isa).length > 0}
    <h2>New Investigation (Wizard-style)</h2>

        <div style="background: rgb(240,240,240); padding: 20px;">
            <p>{steps[currentStep].question}</p>

            <svelte:component this={steps[currentStep].component} bind:value={isa[steps[currentStep].key]} attr={steps[currentStep].key} />

            <div style="margin-top: 45px; text-align: right;">
                {#if currentStep < (steps.length-1)}
                <button on:click={() => next()}>Next</button>
                {:else}
                <button on:click={() => closeWizard()}>Close wizard</button>
                {/if}
            </div>
        </div>

    {/if}
</section>


<style>

</style>