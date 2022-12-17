<script>
    export let isaObj;
    export let viewportMode;

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import Schemas from '@/lib/schemas.js';



    function startWizardMode() {
        if (Object.keys($isaObj).length == 0) {
            addInvestigation();
        }
		dispatch('menuAction', {
            action: 'startWizardMode'
		});
    }

    async function loadISA() {
        const response = await fetch('data/minimal_1.json');
        const json = await response.json();
        $isaObj = json;
    }

    async function addInvestigation() {
        let emptyInvestigation = await Schemas.getObjectFromSchema('investigation');
        $isaObj = emptyInvestigation;
    }

    function saveIsaAsJson() {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([JSON.stringify($isaObj, null, 2)], {
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
        input.onchange = () => {

            let fileLoaded = (e) => {
                let lines = e.target.result;
                let json = JSON.parse(lines);
                $isaObj = json;
            }

            let fr = new FileReader();
            fr.onload = fileLoaded;
            fr.readAsText(input.files[0]);
        };
        input.click();
    }

    function sendToArc() {
        // localhost:8000/arc/import
        fetch('http://localhost:8080/arc/import', {
            headers: {
                'Accept': 'application/octet-stream',
                'Content-Type': 'application/text'
            },
            method: 'POST',
            body: JSON.stringify(isaObj)
        })
        .then(function(res){ console.log(res) })
        .catch(function(res){ console.log(res) })
    }
</script>


<header class="flex-container">
    <div class="flex-items" style="vertical-align: top;">
        <img src="data/logo.png" alt="MIAPPE Wizard" />
        <h1>MIAPPE Wizard</h1>
    </div>

    <div class="flex-items">
        {#if viewportMode == 'main'}
        <!--<button on:click|preventDefault={() => loadISA()}>Load minimal example</button> -->
        <button on:click|preventDefault={() => addInvestigation()}>Add new Investigation</button>
        <button on:click|preventDefault={() => saveIsaAsJson()}>Save ISA-JSON as file</button>
        <button on:click|preventDefault={() => loadIsaFromJson()}>Load ISA-JSON from file</button>
        <button on:click|preventDefault={() => startWizardMode()}>Start Wizard mode</button>
        <!--<button on:click|preventDefault={() => sendToArc()}>Send JSON to ARC</button>-->
        {/if}
    </div>
</header>


<style>
header {
    color: white;
    padding: 10px 15px;
    /*box-shadow: 0px 5px 10px rgba(0,0,0,0.2);*/
    margin-bottom: 0px;
    
}

h1 {
    margin: 7px 0 0 15px;
    padding: 0;
    display: inline-block;
    font-size: 150%;
    font-weight: normal;
    float: left;
}

img {
    width: 40px;
    float: left;
}

.flex-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: normal;
    align-content: normal;
}

.flex-items:nth-child(1) {
    display: block;
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: auto;
    align-self: auto;
    order: 0;
    padding-right: 100px;
}

.flex-items:nth-child(2) {
    display: block;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    align-self: center;
    order: 0;
}

button {
    margin-right: 7px;
}
</style>