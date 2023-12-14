<script>
    export let isaObj;

    import { appstate } from '@/stores/appstate';
    import Schemas from '@/lib/schemas.js';
    import { getIsaTab } from '@/lib/getIsaTab';

    import { ARC } from '@nfdi4plants/arctrl';
    import { ArcInvestigation_toJsonString, ArcInvestigation_fromJsonString } from "@nfdi4plants/arctrl/ISA/ISA.Json/Investigation.js"
    //import { Validation_validateInvestigation } from '@nfdi4plants/arctrl/ISA/ISA.Json/Validation/JsonSchemaValidation.js';

    // node_modules\@nfdi4plants\arctrl\ISA\ISA.Json\Validation\JsonSchemaValidation.js

    import { Xlsx } from '@fslab/fsspreadsheet';
    import {toFsWorkbook, fromFsWorkbook} from "@nfdi4plants/arctrl/ISA/ISA.Spreadsheet/ArcInvestigation.js";



    import { downloadZip } from 'client-zip';

    


    function startWizardMode() {
        if (Object.keys($isaObj).length == 0) {
            addInvestigation();
        }

        $appstate = appstate.WIZARD;
    }

    async function loadISA() {
        const response = await fetch('data/minimal_1.json');
        const json = await response.json();
        $isaObj = json;
    }

    async function addInvestigation() {
        let emptyInvestigation = Schemas.getMiappeInvestigation();
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

    async function validateIsaJson() {
        const investigation = ArcInvestigation_fromJsonString(JSON.stringify($isaObj, null, 2));
        //let arc = new ARC(investigation);

        let validationResult = Validation_validateInvestigation(investigation);
        console.log(validationResult);
    }

    async function toArc() {
        const investigation = ArcInvestigation_fromJsonString(JSON.stringify($isaObj, null, 2));
        console.log(investigation);
        let fswb = toFsWorkbook(investigation);

        let arc = new ARC(investigation);
        arc.UpdateFileSystem();
        let contracts = arc.GetWriteContracts();
        console.log(contracts);

        fulfillWriteContracts(contracts);
        return true;

        let xlsxBytes = await Xlsx.toBytes(fswb);
        console.log(xlsxBytes);

        /*const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([xlsxBytes], {
            type: 'application/json'
        }));
        a.setAttribute('download', 'test.isa.investigation.xlsx');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);*/


        const isaInvestigationXlsx = {
            name: 'test.isa.investigation.xlsx',
            lastModified: new Date(),
            input: xlsxBytes
        }

        // get the ZIP stream in a Blob
        const blob = await downloadZip([isaInvestigationXlsx]).blob()

        // make and click a temporary link to download the Blob
        const link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.download = "arc.zip"
        link.click()
        link.remove()

    }


    async function fulfillWriteContracts(contracts) {
        /*function ensureDirectory (filePath) {
            let dirPath = path.dirname(filePath)
            if (!fs.existsSync(dirPath)){
                fs.mkdirSync(dirPath, { recursive: true });
            }
        }*/
        //const p = path.join(basePath,contract.Path)

        let filesInZip = [];

        for (const contract of contracts) {

            if (contract.Operation = "CREATE") {
                if (contract.DTO == undefined) {
                    //ensureDirectory(p)
                    //fs.writeFileSync(p, "")
                } else if (contract.DTOType == "ISA_Assay" || contract.DTOType == "ISA_Study" || contract.DTOType == "ISA_Investigation") {
                    //ensureDirectory(p)
                    //await Xlsx.toFile(p, contract.DTO)
                    //console.log("ISA", p)

                    let xlsxBytes = await Xlsx.toBytes(contract.DTO);

                    filesInZip.push({
                        name: contract.Path, //'test.isa.investigation.xlsx',
                        lastModified: new Date(),
                        input: xlsxBytes
                    });
                } else if (contract.DTOType == "PlainText") {
                    //ensureDirectory(p)
                    //fs.writeFileSync(p, contract.DTO)
                } else {
                    console.log("Warning: The given contract is not a correct ARC write contract: ", contract)
                }
            }
        }

        console.log(filesInZip);

        // get the ZIP stream in a Blob
        const blob = await downloadZip(filesInZip).blob();

        const link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.download = "arc.zip"
        link.click()
        link.remove()
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

    function convertToIsaTabArchive() {
        getIsaTab($isaObj);
    }

</script>


<header class="flex-container">
    <div class="flex-items" style="vertical-align: top;">
        <img src="data/logo.png" alt="MIAPPE Wizard" />
        <h1>MIAPPE Wizard</h1>
    </div>

    <div class="flex-items">

        {#if $appstate !== appstate.WIZARD}
        <!--<button on:click|preventDefault={() => loadISA()}>Load minimal example</button> -->
        <!--<button on:click|preventDefault={() => addInvestigation()}>Add new Investigation</button>-->
        <!--<button on:click|preventDefault={() => validateIsaJson()}>Validate ISA-JSON</button>-->
        <button on:click|preventDefault={() => toArc()}>Convert to ARC</button>
        <button on:click|preventDefault={() => saveIsaAsJson()}>Save ISA-JSON as file</button>
        <!--<button on:click|preventDefault={() => loadIsaFromJson()}>Load ISA-JSON from file</button>-->
        <button on:click|preventDefault={() => startWizardMode()}>Start Wizard mode</button>
        <!--<button on:click|preventDefault={() => sendToArc()}>Send JSON to ARC</button>-->

        <button on:click|preventDefault={() => convertToIsaTabArchive()}>Convert to ISA-TAB</button>
        
        {/if}

    </div>
</header>


<style>
header {
    /*color: white;*/
    color: black;
    padding: 10px 15px;
    /*box-shadow: 0px 5px 10px rgba(0,0,0,0.2);*/
    margin-bottom: 0px;
    
}

h1 {
    margin: 7px 0 0 15px;
    padding: 0;
    display: inline-block;
    font-size: 150%;
    font-weight: 500;
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