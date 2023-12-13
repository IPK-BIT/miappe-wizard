<script>
    import { isaObj } from '@/stores/isa';
    import DataFrame from 'dataframe-js';
    import Schemas from '@/lib/schemas';
    const previewSize = 5;
    
    let study;
    export {study as value};
    
    let fileUploaded = false;
    let rows = [];
    let columns = [];

    function handleDownload() {
        //TODO: make template selection dynamic
        const templatePath = 'data/study_template_breedfides.csv';
        const link = document.createElement('a');
        link.href = templatePath;
        link.download = 'study_template.csv';
        link.click();
    }
    
    function handleFileDrop(event) {
        console.log(event);
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        loadFile(file);
    }

    function handleFileSelection() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.csv'; // Specify the accepted file type(s) here
        input.addEventListener('change', ()=>{loadFile(input.files[0])});
        input.click();
    }

    /**
     * @param {File} file
     */
    async function loadFile(file) {
        fileUploaded = true;
        let df = await DataFrame.fromCSV(file).then(df => df);
        //TODO: check for compliance with template
        columns = df.listColumns();
        rows = df.toCollection();
    }
    
    async function handleApprove() {
        const response = await fetch('data/breedfides.json');
        let protocol = await response.json();
        study.protocols = [...study.protocols, protocol]
        
        rows.forEach(row => {
            let emptySource = Schemas.getObjectFromSchema('source');
            emptySource.name = row['Material'];
            emptySource.characteristics = [];
            emptySource.characteristics.push({
                Organism: row['Organism'], 
                Genus: row['Genus'], 
                Species: row['Species'], 
                Infraspecific_name: row['Infraspecific Name'],
                Biological_material_latitude: row['Latitude'],
                Biological_material_longitude: row['Longitude'],
                Variety_name: row['Variety Name'],
                Variety_database: row['Variety Reference'],
            });
            study.materials.sources.push(emptySource);
            let emptyProcess = Schemas.getObjectFromSchema('process');
            emptyProcess.executesProtocol = {'name': protocol.name};
            emptyProcess.parameters = [];
            emptyProcess.parameterValues = [];
            protocol.parameters.forEach(parameter => {
                emptyProcess.parameterValues.push(row[parameter.parameterName.annotationValue])
            });
            study.processSequence.push(
                emptyProcess
            )
            let emptySample = Schemas.getObjectFromSchema('sample');
            emptySample.name = row['Sample'];
            study.materials.samples.push(emptySample)
        });
        //@ts-ignore
        $isaObj.studies = [...$isaObj.studies];
        fileUploaded = false;
    }
</script>

<section>
    {#if !fileUploaded}
    <button on:click={handleDownload}>Download Template</button>
    <div class="drag-drop-area" role="button" tabindex="0" on:drop={handleFileDrop} on:dragover={(event) => event.preventDefault()}>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <p on:click={handleFileSelection}>Drag and drop your filled sample file here</p>
    </div>
    {:else}
    <div style="overflow-x: auto">
        <table>
            <thead>
                <tr>
                    {#each columns as column}
                    <th>{column}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each rows.slice(0,previewSize) as row}
                <tr>
                    {#each Object.keys(row) as key}
                    <td>{row[key]}</td>
                    {/each}
                </tr>
                {/each}
            </tbody>
        </table>
    </div>    
    {#if rows.length > previewSize}
    <p class="info-box">
        Only the first {previewSize} rows are shown here.
    </p>
    {/if}
    <button style="float: right" on:click={handleApprove}>Approve and Load</button>
    <button style="float: left" on:click={()=>{fileUploaded=false;}}>Go back</button>
    {/if}
    <br/>
</section>

<style>
    .drag-drop-area {
        margin-top: .5em;
        border: 2px dashed #ccc;
        padding: 1em;
        text-align: center;
    }
    table {
        width: 100%;
        border-collapse: collapse;
    }
    
    thead {
        background-color: #f2f2f2;
    }
    
    th {
        padding: 10px;
        text-align: left;
        font-weight: bold;
    }
    
    tbody tr:nth-child(even) {
        background-color: #f9f9f9;
    }
    
    tbody tr:hover {
        background-color: #e6e6e6;
    }
    
    td {
        padding: 10px;
    }
    .info-box {
        margin-top: 1em;
        background-color: #f2f2f2;
        padding: 1em;
        text-align: center;
    }
</style>