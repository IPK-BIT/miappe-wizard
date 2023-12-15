<script lang="ts">
    export let assay;

    import Comments from '@/components/isa/generic/Comments.svelte';

    import { explanationActionFactory } from '@/actions/explanation.js';
    import { getContext } from 'svelte';
    import TableLoader from '../generic/TableLoader.svelte';
    import Schemas from '@/lib/schemas';
    import { isaObj } from '@/stores/isa';
    const isaLevel = getContext('isaLevel');

    let explanationAction = explanationActionFactory(isaLevel);

    let idx = getContext('studyIdx');
    async function handleApprove(event) {
        //TODO: check that samples are listed in study materials
        let rows = event.detail.detail.rows;
        // let emptyAssay = Schemas.getObjectFromSchema('assay');
        let columnNames=Object.values(rows[0]);
        const response = await fetch('data/templates/protocols/breedfides_phenotyping.json');
        let protocol = await response.json();
        // @ts-ignore
        $isaObj.studies[idx].protocols= [...$isaObj.studies[idx].protocols, protocol];
        rows.slice(1,rows.length).forEach(row => {
            let emptySample = Schemas.getObjectFromSchema('sample');
            emptySample.name = row[columnNames.indexOf('Sample Name')];
            assay.materials.samples = [...assay.materials.samples, emptySample];
            let emptyProcess = Schemas.getObjectFromSchema('process');
            emptyProcess.executesProtocol = protocol;
            protocol.parameters.forEach(parameter => {
                // emptyProcess.parameterValues.push(row[columnNames.indexOf(parameter.parameterName.annotationValue)])
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
                console.log(emptyParameter);
                emptyProcess.parameterValues.push(emptyParameter);
                emptyProcess.inputs = [];
                emptyProcess.outputs = [];
                emptyProcess.inputs.push(emptySample);
                let emptyOutput = Schemas.getObjectFromSchema('sample');
                emptyOutput.name = row[columnNames.indexOf('Assay Name')];
                emptyProcess.outputs.push(emptyOutput   );
            });
            assay.processSequence = [...assay.processSequence,emptyProcess];
        });
    }
</script>

<section>
    <div class="attr entity">
        <h4>Assay</h4>
        <input type="text" use:explanationAction data-attr="title" bind:value={assay.title} placeholder="Assay title">
        <TableLoader templatePath={"data/templates/uploads/breedfides_assay.csv"} on:approve={handleApprove}/>
        Number of samples: {assay.materials.samples.length}
        <Comments bind:value={assay.comments} />
    </div>
</section>


<style>
    input {
        margin: 0 20px 0 0;
    }
    div.entity {
        background: rgb(240,240,240);
        margin-bottom: 30px;
    }
</style>