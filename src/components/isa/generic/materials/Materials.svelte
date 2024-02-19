<script lang="ts">
    import { DataFrame } from 'dataframe-js';

    export let attr;
    let materials: Array<Object>;

    let study;
    export { study as value };  
    materials = study.materials;

    import { appstate } from '@/stores/appstate';

    import Schemas from '@/lib/schemas.js';
    import TableLoader from '../TableLoader.svelte';
    import { isaObj } from '@/stores/isa';
    import { growthProtocols } from '@/stores/growthProtocols.js';
    import { cons } from '@nfdi4plants/arctrl/fable_modules/fable-library.4.5.0/List';

    let template_mapping = {
        variety: 'source.name',
        year: 'source.characteristics.year',
        location: 'source.characteristics.location',
    }

    let primary_key = 'StufenNrFak1,StufenNrFak2,Wdh,Sorte'
    
    let template = new Blob(["Material Name,Organism,Observation Unit Type,Variety Name,Variety Reference,Latitude,Longitude,Original Coding,Sample Name,Year,Location,Repetition,Block"], { type: 'text/csv;charset=utf-8,' });

    function updateTemplate(growthProtocols) {
        console.log(growthProtocols);
        if(growthProtocols.has(study)) {
            template = createCSV(growthProtocols.get(study));
        }
    }

    $: updateTemplate($growthProtocols);


    function createCSV(growthProtocol) {
        // console.log(growthProtocol);
        let fixed_parameters = growthProtocol.fixed_parameters ? Object.keys(growthProtocol.fixed_parameters) : [];
        let parameters = growthProtocol.protocol.parameters.map((p) => p.parameterName.annotationValue);
        parameters = parameters.filter((p) => !fixed_parameters.includes(p));

        // console.log(parameters);

        let csv = "Material Name,Organism,Observation Unit Type,Variety Name,Variety Reference,Latitude,Longitude,Original Coding,Sample Name,Year,Location,Repetition,Block";
        for(let p of parameters)
            csv = csv + "," + p;
        csv += "\n";

        return(new Blob([csv], { type: 'text/csv;charset=utf-8,' }));
    }


    async function handleApprove(event) {
        let df = new DataFrame(event.detail.detail.rows, event.detail.detail.columns);

        // Falls Sample Name nicht vorhanden, dann gehe davon aus, dass das vertical template verwendet wird
        if (!event.detail.detail.columns.includes('Sample Name')) {
            console.log('Vertical template');

            const groupedDf = df.groupBy(...primary_key.split(','));
            console.log(groupedDf);
        }


        // const response = await fetch('data/templates/protocols/breedfides_growth.json');
        // let protocol = await response.json();
        // study.protocols = [...study.protocols, protocol]
        // let columnNames=Object.values(rows[0]);
        // rows.slice(1,rows.length).forEach(row => {
        //     let emptySource = Schemas.getObjectFromSchema('source');
        //     emptySource.name = row[columnNames.indexOf('Material Name')];
        //     emptySource.characteristics = [];
        //     emptySource.characteristics.push(Schemas.createCharacteristicObject('Organism', row[columnNames.indexOf('Organism')]));
        //     emptySource.characteristics.push(Schemas.createCharacteristicObject('Genus', row[columnNames.indexOf('Genus')]));
        //     emptySource.characteristics.push(Schemas.createCharacteristicObject('Species', row[columnNames.indexOf('Species')]));
        //     emptySource.characteristics.push(Schemas.createCharacteristicObject('Infraspecific_name', row[columnNames.indexOf('Infraspecific Name')]));
        //     emptySource.characteristics.push(Schemas.createCharacteristicObject('Biological_material_latitude', row[columnNames.indexOf('Latitude')]));
        //     emptySource.characteristics.push(Schemas.createCharacteristicObject('Biological_material_longitude', row[columnNames.indexOf('Longitude')]));
        //     emptySource.characteristics.push(Schemas.createCharacteristicObject('Variety_name', row[columnNames.indexOf('Variety Name')]));
        //     emptySource.characteristics.push(Schemas.createCharacteristicObject('Variety_database', row[columnNames.indexOf('Variety Reference')]));
        //     study.materials.sources.push(emptySource);

        //     let emptySample = Schemas.getObjectFromSchema('sample');
        //     emptySample.name = row[columnNames.indexOf('Sample Name')];
        //     study.materials.samples.push(emptySample)
        //     let emptyProcess = Schemas.getObjectFromSchema('process');
        //     emptyProcess.executesProtocol = protocol;
        //     emptyProcess.parameterValues = [];
        //     protocol.parameters.forEach(parameter => {
        //         let emptyParameter = Schemas.getObjectFromSchema('process_parameter_value');
        //         let emptyOntologyAnnotation = Schemas.getObjectFromSchema('ontology_annotation');
        //         emptyOntologyAnnotation.annotationValue="";
        //         emptyParameter.category = parameter;
        //         emptyParameter.value = row[columnNames.indexOf(parameter.parameterName.annotationValue)];
        //         emptyParameter.unit = emptyOntologyAnnotation;
        //         emptyProcess.parameterValues.push(emptyParameter);
        //         emptyProcess.outputs = [];
        //         emptyProcess.inputs = [];
        //         emptyProcess.inputs.push(emptySource);
        //         emptyProcess.outputs.push(emptySample);
        //     });
        //     study.processSequence = [...study.processSequence,emptyProcess];
        // });
        // //@ts-ignore
        // $isaObj.studies = [...$isaObj.studies];
    }
</script>

<section>

    <div class="attr">

        {#if $appstate !== appstate.WIZARD}
        <h3>Materials</h3>
        {/if}
        <div class="material-info">
            <TableLoader template={template} on:approve={handleApprove} />
            {#if study.materials.sources.length > 0}
            <br />Number of materials: {study.materials.sources.length}<br />
            Number of samples: {study.materials.samples.length}
            {/if}
        </div>
    </div>

</section>

<style>
    h3 {
        display: inline;
        margin: 0 0 10px 0;
        font-style: italic;
    }
    .material-info {
        font-style: bold;
    }
</style>
