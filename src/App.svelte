<script>
    import { onMount } from 'svelte';

    import Schemas from '@/lib/schemas.js';

    import Header from '@/components/Header.svelte';
    import Explanation from '@/components/Explanation.svelte';

    import Date from '@/components/generic/Date.svelte';
    import People from '@/components/generic/People.svelte';
    import Studies from '@/components/study/Studies.svelte';

    import Investigation from '@/components/investigation/Investigation.svelte';
    import InvestigationWizard from '@/components/investigation/InvestigationWizard.svelte';


    let dataLoaded = false;
    let isa = {};
    let isaAsString = '';

    let mode = 'form'; // ['form', 'wizard']

    let componentMapper = {
        'submissionDate': Date,
        'people': People,
        'studies': Studies
    };

    let components = Object.keys(componentMapper);

    function parseISA(isaAsString) {
        if (isaAsString !== '') {
            isa = JSON.parse(isaAsString);
            dataLoaded = true;
        }
    }

    function populateTextarea(isa) {
        isaAsString = JSON.stringify(isa, null, 2);
    }

    async function loadISA() {
        const response = await fetch('data/minimal_1.json');
        const json = await response.json();
        populateTextarea(json);
        dataLoaded = true;
    }

    async function addInvestigation() {
        let emptyInvestigation = await Schemas.getObjectFromSchema('investigation');
        populateTextarea(emptyInvestigation);
        dataLoaded = true;
    }

    function startWizardMode() {
        if (Object.keys(isa).length == 0) {
            addInvestigation();
        }
        mode = 'wizard';
    }


    $: parseISA(isaAsString);
    $: if (dataLoaded) populateTextarea(isa);


    function saveIsaAsJson() {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([JSON.stringify(isa, null, 2)], {
            type: 'application/json'
        }));
        a.setAttribute('download', 'isa.json');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    function loadIsaFromJson() {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json,application/json';
        input.onchange = _ => {

            let fileLoaded = (e) => {
                let lines = e.target.result;
                let json = JSON.parse(lines);
                populateTextarea(json);
            }

            let fr = new FileReader();
            fr.onload = fileLoaded;
            fr.readAsText(input.files[0]);
        };
        input.click();
    }


    onMount(() => {
        //loadISA();
    });

    function handleAction(event) {
        let map = {
            'loadISA': loadISA,
            'addInvestigation': addInvestigation,
            'saveIsaAsJson': saveIsaAsJson,
            'loadIsaFromJson': loadIsaFromJson,
            'startWizardMode': startWizardMode,
        }
        map[event.detail.action]();
    }

</script>

<main>

    <Header on:action={handleAction} />

    <div class="content">

        <div class="leftcol">

        </div>

        <div class="middlecol">

            {#if mode === 'form'}
            <Investigation bind:isa={isa} />
            {:else if mode === 'wizard'}
            <InvestigationWizard on:closeWizard={() => {mode = 'form'}} bind:isa={isa} />
            {/if}

        </div>

        <div class="rightcol">
            <Explanation />

            <br />
            <strong>ISA-JSON:</strong>
            <textarea bind:value={isaAsString}></textarea>
        </div>
    </div>

</main>

<style>

:global(body) {
	padding: 0;
    margin: 0;
}

main {
    font-family: sans-serif;
}


.content {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 50px;
    grid-row-gap: 0px;
    padding: 10px 30px;
    border: 0px solid blue;
    min-height: 100%;
    height: 100%;
}

.leftcol {
    grid-area: 1 / 1 / 2 / 2;
    background: rgb(230,230,230);
    align-self: stretch;
}
.middlecol {
    grid-area: 1 / 2 / 2 / 3;
}
.rightcol {
    grid-area: 1 / 3 / 2 / 4;
}

textarea {
    width: 100%;
    height: 100%;
    background: lightgoldenrodyellow;
    padding: 2px;
    color: rgb(30,30,30);
    overflow-x: scroll;
    white-space: pre;
}


:global(div.attr) {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid grey;
    box-sizing: border-box;
}

:global(div.attr > h4) {
    margin: 0 0 5px 0;
    
    color: darkslateblue;
}

:global(input) {
    padding: 4px 8px;
    font-size: 100%;
    border: 1px solid rgb(80,80,80);
    border-radius: 5px;
    box-sizing: border-box;
}

:global(button) {
    background: rgb(210,210,210);
    border: 0;
    border-radius: 5px;
    padding: 3px 6px;
    cursor: pointer;
    border: 1px solid transparent;
}

:global(button:hover) {
    background: rgb(230, 230, 152);
    border: 1px solid rgb(70,70,70);
}

button {
    margin-top: 3px;
}

</style>
