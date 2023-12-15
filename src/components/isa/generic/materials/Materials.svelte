<script lang="ts">
    export let attr;
    let materials: Array<Object>;
    // export { materials as value };

    import readXlsxFile from 'read-excel-file';
    import Grid from 'gridjs-svelte';

    import Schemas from '@/lib/schemas.js';
    import TableLoader from '../TableLoader.svelte';
    import { isaObj } from '@/stores/isa';
    import { growthProtocols } from '@/stores/growthProtocols.js';

    let study;
    let template = new Blob([""], { type: 'text/csv;charset=utf-8,' });
    export { study as value };  
    materials = study.materials;

    $: {
        if($growthProtocols.has(study))
            template = createCSV($growthProtocols.get(study));
    }

    function createCSV(growthProtocol) {
        console.log(growthProtocol);
        let fixed_parameters = growthProtocol.fixed_parameters ? Object.keys(growthProtocol.fixed_parameters) : [];
        let parameters = growthProtocol.protocol.parameters.map((p) => p.parameterName.annotationValue);
        parameters = parameters.filter((p) => !fixed_parameters.includes(p));

        let csv = "Material Name,Organism,Observation Unit Type,Variety Name,Variety Reference,Latitude,Longitude,Original Coding,Sample Name,Year,Location,Repetition,Block";
        for(let p of parameters)
            csv = csv + "," + p;
        csv += "\n";

        return(new Blob([csv], { type: 'text/csv;charset=utf-8,' }));
    }

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
            emptySource.characteristics.push(Schemas.createCharacteristicObject('Organism', row[columnNames.indexOf('Organism')]));
            emptySource.characteristics.push(Schemas.createCharacteristicObject('Genus', row[columnNames.indexOf('Genus')]));
            emptySource.characteristics.push(Schemas.createCharacteristicObject('Species', row[columnNames.indexOf('Species')]));
            emptySource.characteristics.push(Schemas.createCharacteristicObject('Infraspecific_name', row[columnNames.indexOf('Infraspecific Name')]));
            emptySource.characteristics.push(Schemas.createCharacteristicObject('Biological_material_latitude', row[columnNames.indexOf('Latitude')]));
            emptySource.characteristics.push(Schemas.createCharacteristicObject('Biological_material_longitude', row[columnNames.indexOf('Longitude')]));
            emptySource.characteristics.push(Schemas.createCharacteristicObject('Variety_name', row[columnNames.indexOf('Variety Name')]));
            emptySource.characteristics.push(Schemas.createCharacteristicObject('Variety_database', row[columnNames.indexOf('Variety Database')]));
            study.materials.sources.push(emptySource);
            let emptySample = Schemas.getObjectFromSchema('sample');
            emptySample.name = row[columnNames.indexOf('Sample Name')];
            // console.log(emptySample);
            study.materials.samples.push(emptySample)
            let emptyProcess = Schemas.getObjectFromSchema('process');
            emptyProcess.executesProtocol = protocol;
            // emptyProcess.parameters = [];
            emptyProcess.parameterValues = [];
            protocol.parameters.forEach(parameter => {
                let emptyParameter = Schemas.getObjectFromSchema('process_parameter_value');
                // let emptyCategory = Schemas.getObjectFromSchema('protocol_parameter');
                let emptyOntologyAnnotation = Schemas.getObjectFromSchema('ontology_annotation');
                emptyOntologyAnnotation.annotationValue="";
                // emptyOntologyAnnotation.annotationValue = parameter.parameterName.annotationValue;
                // emptyCategory.parameterName = parameter.parameterName.annotationValue;
                emptyParameter.category = parameter;
                emptyParameter.value = row[columnNames.indexOf(parameter.parameterName.annotationValue)];
                emptyParameter.unit = emptyOntologyAnnotation;
                // emptyProcess.parameterValues.push(row[columnNames.indexOf(parameter.parameterName.annotationValue)])
                emptyProcess.parameterValues.push(emptyParameter);
                emptyProcess.outputs = [];
                emptyProcess.inputs = [];
                emptyProcess.inputs.push(emptySource);
                emptyProcess.outputs.push(emptySample);
            });
            study.processSequence = [...study.processSequence,emptyProcess];
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
            <TableLoader template={template} on:approve={handleApprove} />
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
