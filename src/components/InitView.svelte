<script>
    export let isaObj;

    import { appstate } from '@/stores/appstate';

    import Schemas from '@/lib/schemas.js';


    async function startWizardMode() {
        if (Object.keys($isaObj).length == 0) {
            let emptyInvestigation = await Schemas.getObjectFromSchema('investigation');
            $isaObj = emptyInvestigation;
        }

        $appstate.mode = appstate.WIZARD;
    }

    async function addInvestigation() {
        let emptyInvestigation = await Schemas.getObjectFromSchema('investigation');
        $isaObj = emptyInvestigation;

        $appstate.mode = appstate.FORM;
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
                $appstate.mode = appstate.FORM;
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
            <img id="logo" src="data/logo.png" alt="MIAPPE Wizard Logo" />
            <h1>Welcome to the MIAPPE Wizard</h1>
            <p>A biologist-friendly application for creating MIAPPE-compliant metadata for plant phenotyping experiments.</p>
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
        width: 600px;
        border-radius: 3%;
        text-align: center;
        padding: 50px;
        background: rgb(240,240,240);
        border: 1px solid rgb(200,200,200);
        box-shadow: 0px 0px 10px rgba(0,0,0,0.08);
    }
    #logo {
        width: 200px;
        height: 200px;
    }
    h1 {
        font-weight: normal;
        font-size: 200%;
        margin-bottom: 1rem;
    }
    p {
        font-style: italic;
        color: rgb(120,120,120);
        margin-bottom: 4rem;
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

    button:hover {
        background-color: rgb(50, 75, 150);
    }
</style>