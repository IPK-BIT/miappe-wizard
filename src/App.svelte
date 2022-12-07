<script>
    import { onMount } from 'svelte';

    import Schemas from '@/lib/schemas.js';

    import { isaStore } from '@/lib/isa_store.js';

    import Date from '@/components/generic/Date.svelte';
    import People from '@/components/generic/People.svelte';
    import Studies from '@/components/study/Studies.svelte';


    let dataLoaded = false;
    let isa = {};
    let isaAsString = '';

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
        console.log('populateTextarea');
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

</script>

<main>

    <div class="header">
        <h1>MIAPPE-Wizard <span style="font-weight: normal; font-size: 80%;">(technical demo using two-way data binding feature of Svelte)</span></h1>
    </div>

    <div class="content">

        <div class="leftcol">

            <button on:click|preventDefault={() => loadISA()}>Load minimal example</button> 
            <button on:click|preventDefault={() => addInvestigation()}>Add new Investigation</button>
            <button on:click|preventDefault={() => saveIsaAsJson()}>Save ISA-JSON as file</button>
            <button on:click|preventDefault={() => loadIsaFromJson()}>Load ISA-JSON from file</button>

            {#if Object.keys(isa).length > 0}
                <h2>Investigation</h2>
                {#each Object.entries(isa) as [attr, value]}

                    {#if components.includes(attr)}
                        <svelte:component this={componentMapper[attr]} {attr} bind:value={isa[attr]} />
                    {/if}

                {/each}
            {/if}
        </div>

        <div class="rightcol">
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

.header {
    background: rgb(100,100,100);
    color: white;
    padding: 10px 15px;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.2);
}

h1 {
    margin: 0;
    padding: 0;
    font-size: 150%;
}

.content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 50px;
    grid-row-gap: 0px;
    padding: 10px 30px;
}

.leftcol { grid-area: 1 / 1 / 2 / 2; }
.rightcol { grid-area: 1 / 2 / 2 / 3;  }

textarea {
    width: 100%;
    height: 100%;
    background: lightgoldenrodyellow;
    padding: 2px;
    color: rgb(30,30,30);
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
