<script lang="ts">
    import { isaObj } from "@/stores/isa";
    import TableLoader from "./TableLoader.svelte";
    import { DataFrame } from "dataframe-js";
    import Schema from "@/lib/schemas.js";
    
    let study;
    export { study as value };
    export let jsonPath;
    
    let template = new Blob(["Material Name,Organism,Observation Unit Type,Variety Name,Variety Reference,Latitude,Longitude,Original Coding,Sample Name,Year,Location,Repetition,Block"], { type: 'text/csv;charset=utf-8,' });
    
    //TODO: Add to config
    let mode: 'long'|'wide' = 'long';
    let primary_key = 'Sorte,StufenNrFak1,StufenNrFak2,Wdh'
    
    function handleApprove(event) {
        study.materials.samples = [];
        
        let df = new DataFrame(event.detail.detail.rows, event.detail.detail.columns);
        //TODO: make this configurable
        let materials = df.select(...primary_key.split(',')).toArray()
        .filter((s, index, self) => self.findIndex(item => item.join('-') === s.join('-')) === index);
        //TODO: add configurable characterisitcs e.g. Anbaugebiete, Standort, Jahr, etc.
        study.materials.sources = [];
        materials.forEach(source => {
            study.materials.sources.push(Schema.getSource(source[0], {
                'Anbaugebiete': 'Tertiärhügelland, bayerisches Gäu',
                'Standort': 'Eiselau',
            }));
        });
        study.materials.samples = materials.map((s) => { return { name: s.join('-') } });
    }
    
    let previewSize = 5;
</script>

<section>
    <div class="attr">
        <TableLoader bind:template on:approve={handleApprove}/>
        {#if study.materials.sources.length > 0}
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
                {#each study.materials.sources.slice(0,previewSize) as _,idx}
                <tr>
                    <td>{study.materials.sources[idx].name}</td>
                    {#each study.materials.sources[idx].characteristics as characteristic}
                    <td>{characteristic.value}</td>
                    {/each}
                    {#each study.protocols[0].parameters as parameter}
                    <td>{parameter.comments[0].value}</td>
                    {/each}
                    <td>{study.materials.samples[idx].name}</td>
                </tr>
                {/each}</tbody>
            </table> 
            {#if study.materials.sources.length > previewSize}
            <p class="info-box">
                Only the first {previewSize} of {study.materials.sources.length} rows are shown here.
            </p>
            {/if}
            <h3>Samples</h3>
            <table>
                <thead>
                    <th>Sample Name</th>
                    <th>Merkmal</th>
                    <th>Wert</th>
                </thead>
                <tbody>
                    {#each study.materials.sources.slice(0,previewSize) as _,idx}
                    <tr>
                        <td>{study.materials.samples[idx].name}</td>
                        <td>D_GREI1</td>
                        <td>18.07.2023</td>
                    </tr>
                    {/each}</tbody>
                </table> 
                {#if study.materials.sources.length > previewSize}
                <p class="info-box">
                    Only the first {previewSize} of 1520 rows are shown here.
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