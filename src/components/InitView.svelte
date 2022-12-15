<script>
    export let isaObj;

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import Schemas from '@/lib/schemas.js';


    function startWizardMode() {
        if (Object.keys($isaObj).length == 0) {
            addInvestigation();
        }
		dispatch('initViewAction', {
            action: 'startWizardMode'
		});
    }

    async function addInvestigation() {
        let emptyInvestigation = await Schemas.getObjectFromSchema('investigation');
        $isaObj = emptyInvestigation;

		dispatch('initViewAction', {
            action: 'addInvestigation'
		});
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
</script>


<section>
    <div class="box">
        <div>
            <img width=200 src="/data/logo.png"/>
            <h1>Welcome to the MIAPPE Wizard</h1>
            <button on:click|preventDefault={() => startWizardMode()}>Start Wizard mode</button> <br />
            <button on:click|preventDefault={() => addInvestigation()}>Add new Investigation</button> <br />
            <button on:click|preventDefault={() => loadIsaFromJson()}>Load ISA-JSON from file</button>
        </div>
    </div>
</section>


<style>
    section {
        height: 90%;
    }
    .box {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .box div {
        width: 400px;
        border-radius: 5%;
        text-align: center;
        padding: 50px;
        background: rgb(240,240,240);
        border: 1px solid rgb(230,230,230);
    }
    h1 {
        font-weight: normal;
        font-size: 200%;
        margin-bottom: 4rem;
        font-family: Georgia;
    }
    button {
        display: block;
        width: 100%;
        border: none;
        background-color: rgb(80, 80, 100);
        padding: 14px 28px;
        font-size: 16px;
        cursor: pointer;
        text-align: center;
        color: white;
    }
</style>