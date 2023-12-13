<script>
    import { isaObj } from '@/stores/isa';
    import DataFrame from 'dataframe-js';
    import Schemas from '@/lib/schemas';
    import { onMount } from 'svelte';
    import { appstate } from '@/stores/appstate';
    const previewSize = 5;
    
    let study;
    
    onMount(() => {
        //FIXME: this is a hack to ensure the studies array is not empty
        study = Schemas.getObjectFromSchema('study');
        study.title='Breedfides Study';
    });
    
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
    
    async function handleFileDrop(event) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        fileUploaded = true;
        let df = await DataFrame.fromCSV(file).then(df => df);
        //TODO: check for compliance with template
        columns = df.listColumns();
        rows = df.toCollection();
    }
    
    function handleApprove() {
        //FIXME: Needs refactoring when proxy is available
        let protocol = Schemas.getObjectFromSchema('protocol');
        //TODO: store protocol somewhere else
        protocol.name = 'Breedfides';
        protocol.parameters = [
            {'@id': "", 'parameterName': 'Year'}, 
            {'@id': "", 'parameterName': 'Location'}, 
            {'@id': "", 'parameterName': 'Repetition'}, 
            {'@id': "", 'parameterName': 'Block'}
        ];
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
                emptyProcess.parameterValues.push(row[parameter.parameterName])
            });
            study.processSequence.push(
                emptyProcess
            )
            let emptySample = Schemas.getObjectFromSchema('sample');
            emptySample.name = row['Sample'];
            study.materials.samples.push(emptySample)
        });
        //@ts-ignore
        $isaObj.studies = [...$isaObj.studies, study]
        $appstate = appstate.FORM;  
    }
</script>

<section>
    {#if !fileUploaded}
    <button on:click={handleDownload}>Download Template</button>
    <div class="drag-drop-area" role="button" tabindex="0" on:drop={handleFileDrop} on:dragover={(event) => event.preventDefault()}>
        <p>Drag and drop your filled sample file here</p>
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