<script lang="ts">
    import TableLoader from "./TableLoader.svelte";
    import { DataFrame } from "dataframe-js";
    import Schema from "@/lib/schemas.js";
    import String from "./String.svelte";
    import { split } from "@nfdi4plants/arctrl/fable_modules/fable-library.4.5.0/String";
    
    let study;
    export { study as value };
    export let jsonPath;
    
    
    //TODO: Add to config
    let template = new Blob(["Art_calc,Jahr_calc,Sortiment_calc,BKR_Nr,BKR_Bezeichnung,Anbaugebiet_Nr,Anbaugebiete,Standort_calc,Bundeslandkuerzel,DATUM,BBCH_VON,BBCH,BBCH_BIS,Termin,Merkmal,MerkmalsBez,StufenNrFak1,StufenNrFak2,Wdh,Sorte,Status,KennNr,Wert"], { type: 'text/csv;charset=utf-8,' });
    let mode: 'long'|'wide' = 'long';
    let sample_key = 'Sorte,StufenNrFak1,StufenNrFak2,Wdh'
    let source_key = 'Sorte';
    let dataframe_keys = 'DATUM,BBCH_VON,BBCH,BBCH_BIS,Merkmal,Wert'
    let characterisitcs = 'Anbaugebiete,Standort_calc,Jahr_calc,Art_calc';
    let previewSize = 5;
    
    function writeStudy(groupedDF){
        study.materials.sources = [];
        study.materials.samples = [];
        study.processSequence = [];
        groupedDF.forEach((group) => {
            let source = Schema.getSource(
            group.group.select(source_key).toArray()[0][0],
            group.group.select(...characterisitcs.split(',')).toCollection()[0]
            );
            if (!study.materials.sources.find(s => s.name === source.name)) {
                study.materials.sources = [...study.materials.sources, source];
            }
            
            let sample = Schema.getObjectFromSchema('sample');
            sample.name = Object.values(group.groupKey).join('-');
            study.materials.samples = [...study.materials.samples, sample];
            //FIXME: if the comment is removed the double binding is not working for the parameter declaration. 
            //TODO: Switch to @id use for less repetition?
            let growth_protocol = study.protocols.find(protocol => protocol.name === 'Growth');
            let process = Schema.getObjectFromSchema('process')
            process.inputs = [source];
            process.executesProtocol = growth_protocol;
            process.parameterValues = growth_protocol.parameters.map(parameter => {
                let value = parameter.comments[0].value;
                let process_parameter_value = Schema.getObjectFromSchema('process_parameter_value');
                process_parameter_value.category = parameter;
                process_parameter_value.value = value
                return process_parameter_value;
            });
            process.outputs = [sample];
            study.processSequence = [...study.processSequence, process];
        });
    }
    
    function writeAssay(groupedDF) {
        study.protocols = [study.protocols[0]];
        groupedDF[0].group.unique('Merkmal').toCollection().map(obj=>obj['Merkmal']).forEach(
        variable => {
            let protocol = Schema.getObjectFromSchema('protocol');
            protocol.name = variable;
            study.protocols = [...study.protocols, protocol];
        }
        );
        
        //TODO: Streamline
        let tmp = [];
        groupedDF.forEach(group => {
            tmp = [...tmp, group.group.select(...sample_key.split(','),...dataframe_keys.split(',')).toCollection()];
        });
        let df = new DataFrame(tmp.flat(),[...sample_key.split(','),...dataframe_keys.split(',')]).toCollection();
        const addSampleNameKey = (objects, keysString) => {
            const keysArray = keysString.split(',');
            return objects.map(obj => {
                let sampleNameValue = '';
                keysArray.forEach((key, index) => {
                    if (obj.hasOwnProperty(key)) {
                        sampleNameValue += obj[key];
                        if (index < keysArray.length -  1) {
                            sampleNameValue += '-';
                        }
                    }
                });
                obj['Sample Name'] = sampleNameValue;
                return obj;
            });
        };        
        df = addSampleNameKey(df, sample_key);
        df = new DataFrame(df).select('Sample Name', ...dataframe_keys.split(',')).toCollection();

        study.assays = [];
        
        let assay = Schema.getObjectFromSchema('assay');
        assay.materials.samples = study.materials.samples;
        let dataFile = Schema.getObjectFromSchema('data');
        dataFile.type = 'Raw Data File';
        dataFile.name = 'datasets/phenotyping-results.csv';
        dataFile.comments = [{
            name: 'Content',
            value: JSON.stringify(df)
        }];
        assay.dataFiles = [dataFile];
        assay.processSequence = [];
        for (let i=1; i<study.protocols.length; i++) {
            study.materials.samples.forEach( sample => {
                let process = Schema.getObjectFromSchema('process');
                process.executesProtocol = study.protocols[i];
                process.inputs = sample;
                process.outputs = [dataFile];
                assay.processSequence = [...assay.processSequence, process];
            });
        }
        study.assays = [...study.assays, assay];
    }
    
    function handleApprove(event) {
        let groupedDF = new DataFrame(event.detail.detail.rows, event.detail.detail.columns).groupBy(...sample_key.split(',')).toCollection();
        
        writeStudy(groupedDF);
        writeAssay(groupedDF);
    }

</script>

<section>
    <div class="attr">
        <TableLoader bind:template on:approve={handleApprove}/>
        {#if study.processSequence.length > 0}
        <h3>Materials</h3>
        <table>
            <thead>
                <th>Source Name</th>
                {#each study.materials.sources[0].characteristics as characteristic}
                <th>{characteristic.category.characteristicType.annotationValue}</th>
                {/each}
                {#each study.protocols[0].parameters as parameter}
                <th>{parameter.parameterName.annotationValue}</th>
                {/each}
                <th>Sample Name</th>
            </thead>
            <tbody>
                {#each study.processSequence.slice(0,previewSize) as process}
                <tr>
                    <td>{process.inputs[0].name}</td>
                    {#each process.inputs[0].characteristics as characteristic}
                    <td>{characteristic.value}</td>
                    {/each}
                    {#each process.parameterValues as process_parameter_value}
                    <td>{process_parameter_value.value}</td>
                    {/each}
                    <td>{process.outputs[0].name}</td>
                </tr>
                {/each}
            </tbody>
        </table> 
        {#if study.processSequence.length > previewSize}
        <p class="info-box">
            Only the first {previewSize} of {study.processSequence.length} rows are shown here.
        </p>
        {/if}
        <h3>Samples</h3>
        <table>
            <thead>
                <th>Sample Name</th>
                <th>Protocol</th>
                <th>Data File</th>
            </thead>
            <tbody>
                {#each study.assays[0].materials.samples.slice(0,previewSize) as _,idx}
                <tr>
                    <td>{study.assays[0].materials.samples[idx].name}</td>
                    <td>D_GREI1</td>
                    <td>datasets/phenotyping-results.csv</td>
                </tr>
                {/each}
            </tbody>
        </table> 
        {#if study.assays[0].processSequence.length > previewSize}
        <p class="info-box">
            Only the first {previewSize} of {study.assays[0].processSequence.length} rows are shown here.
        </p>
        {/if}
        {/if}
    </div>
</section>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
        overflow: auto;
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
        background-color: #e9e9e9;
    }
    
    td {
        padding: 10px;
    }
    p.info-box {
        margin-top: 1em;
        background-color: #f2f2f2;
        padding: 1em;
        text-align: center;
    }    
</style>