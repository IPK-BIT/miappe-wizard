<script lang="ts">
    export let attr;
    let materials: Array<Object>;
    // export { materials as value };

    import readXlsxFile from 'read-excel-file';
    import Grid from 'gridjs-svelte';

    import Schemas from '@/lib/schemas.js';
    import TableLoader from '../TableLoader.svelte';
    import { isaObj } from '@/stores/isa';

    let study;
    export { study as value };  
    materials = study.materials;

    const addSources = async (materialIds) => {
        let emptySource = await Schemas.getObjectFromSchema('source');

        for (let materialId of materialIds) {
            let _emptySource = Object.assign({}, emptySource);
            _emptySource.name = materialId;
            materials.sources = [...materials.sources, _emptySource];
        }
        
    }

    let materialsInput = '';

    /*
    let materialIds: Array<String>;
    $: materialIds = materialsInput.split(/\r?\n/).filter(item => item != '');
    $: addSources(materialIds);
    $: console.log(materialIds);
    */

    let data = [];
    let columns = [];

    function loadXLSX() {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = '.xlsx';
        input.onchange = () => {

            let fileLoaded = (e) => {
                let lines = e.target.result;
                console.log(lines);
                readXlsxFile(lines).then((rows) => {
                    console.log(rows);
                    columns = rows.shift();
                    data = rows.slice();
                });
            }

            let fr = new FileReader();
            fr.onload = fileLoaded;
            fr.readAsArrayBuffer(input.files[0]);
        };
        input.click();
    }

    const testdata = [
        { name: "John", email: "john@example.com" },
        { name: "Mark", email: "mark@gmail.com" },
    ];
    async function handleApprove(event) {
        let rows = event.detail.detail.rows;
        const response = await fetch('data/templates/protocols/breedfides_growth.json');
        let protocol = await response.json();
        study.protocols = [...study.protocols, protocol]
        let columnNames=Object.values(rows[0]);
        rows.slice(1,rows.length).forEach(row => {
            let emptySource = Schemas.getObjectFromSchema('source');
            emptySource.name = row[columnNames.indexOf('Material Name')];
            emptySource.characteristics = [];
            emptySource.characteristics.push({
                Organism: row[columnNames.indexOf('Organism')], 
                Genus: row[columnNames.indexOf('Genus')], 
                Species: row[columnNames.indexOf('Species')],
                Infraspecific_name: row[columnNames.indexOf('Infraspecific Name')],
                Biological_material_latitude: row[columnNames.indexOf('Latitude')],
                Biological_material_longitude: row[columnNames.indexOf('Longitude')],
                Variety_name: row[columnNames.indexOf('Variety Name')],
                Variety_database: row[columnNames.indexOf('Variety Database')],
            });
            study.materials.sources.push(emptySource);
            let emptyProcess = Schemas.getObjectFromSchema('process');
            emptyProcess.executesProtocol = protocol;
            // emptyProcess.parameters = [];
            emptyProcess.parameterValues = [];
            protocol.parameters.forEach(parameter => {
                let emptyParameter = Schemas.getObjectFromSchema('process_parameter_value');
                console.log(emptyParameter);
                emptyParameter.unit = {};
                emptyParameter.category = {};
                emptyParameter.value = row[columnNames.indexOf(parameter.parameterName.annotationValue)];
                // emptyProcess.parameterValues.push(row[columnNames.indexOf(parameter.parameterName.annotationValue)])
                emptyProcess.parameterValues.push(emptyParameter);
            });
            study.processSequence = [...study.processSequence,emptyProcess];
            let emptySample = Schemas.getObjectFromSchema('sample');
            emptySample.name = row[columnNames.indexOf('Sample Name')];
            study.materials.samples.push(emptySample)
        });
        //@ts-ignore
        $isaObj.studies = [...$isaObj.studies];
    }
</script>

<section>

    <div class="attr">
        <h3>Materials</h3>

        <!-- <button on:click|preventDefault={() => loadXLSX()}>Load material sources from Excel file (*.xlsx)</button> -->

        
        <!--<textarea bind:value={materialsInput} ></textarea>-->

        <!--<button on:click|preventDefault={() => addStudy()}>add material source</button>-->

        <!--{#each assays as assay}
        <Assay bind:assay />
        {/each}-->

        <!-- {#if data.length > 0}
        <Grid {data} {columns} />
        {/if} -->

        <!-- MY CODE FROM HERE -->
        <div class="material-info">
            <TableLoader templatePath={"data/templates/uploads/breedfides_study.csv"} on:approve={handleApprove}/>
            Number of materials: {study.materials.sources.length}<br />
            Number of samples: {study.materials.samples.length}
        </div>
    </div>

</section>

<style>
    @import "https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css";

    /* textarea {
        width: 100%;
        height: 100px;
    }
    button {
        margin: 0 0 10px 8px;
    } */
    h3 {
        display: inline;
        margin: 0 0 10px 0;
        font-style: italic;
    }
    .material-info {
        font-style: bold;
    }
</style>