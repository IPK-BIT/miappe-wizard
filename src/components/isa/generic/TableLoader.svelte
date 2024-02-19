<script>
    import DataFrame from 'dataframe-js';
    import { createEventDispatcher } from 'svelte';
    const previewSize = 5;
    
    export let template;
    
    let fileUploaded = false;
    let rows = [];
    let columns = [];

    function handleDownload() {
        //TODO: make template selection dynamic
        const link = document.createElement('a');
        link.href = URL.createObjectURL(template);
        link.download = 'template.csv';
        link.click();
    }
    
    function handleFileDrop(event) {
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
        let df = await DataFrame.fromCSV(file, true).then(df => df);
        //TODO: check for compliance with template
        columns = df.listColumns();
        rows = df.toCollection();
    }
    
    const dispatch = createEventDispatcher();
    function createEvent() {
        const event = new CustomEvent('approve', {
            detail: {
                rows: rows,
                columns: columns,
            }
        });
        fileUploaded = false;
        dispatch('approve', event);
    }
</script>

<section>
    {#if !fileUploaded}
    <p style="margin: 0 0 20px 0;">
    Please download the template file and fill it with your materials as rows according to the column names:
    &nbsp; <button on:click={handleDownload} class="add">Download Template</button>

    <p>
        Please then upload the list of materials by clicking the upload area below or by dragging and dropping the file onto the upload area.
    </p>
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
                    <th>{rows[0][column]}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each rows.slice(1,previewSize+1) as row}
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
    <button style="float: right" on:click={createEvent}>Approve and Load</button>
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