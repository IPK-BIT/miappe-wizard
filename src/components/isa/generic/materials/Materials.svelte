<script lang="ts">
    export let attr;
    let materials: Array<Object>;
    export { materials as value };

    import readXlsxFile from 'read-excel-file';
    import Grid from 'gridjs-svelte';

    import Schemas from '@/lib/schemas.js';
    //import Assay from '@/components/isa/assay/Assay.svelte';

    const addSources = async (materialIds) => {
        let emptySource = await Schemas.getObjectFromSchema('source');

        for (let materialId of materialIds) {
            let _emptySource = Object.assign({}, emptySource);
            _emptySource.name = materialId;
            console.log(_emptySource);
            materials.sources = [...materials.sources, _emptySource];
            console.log(materials.sources);
        }
        
    }

    let materialsInput = '';

    let materialIds: Array<String>;
    $: materialIds = materialsInput.split(/\r?\n/).filter(item => item != '');
    $: addSources(materialIds);
    $: console.log(materialIds);

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

</script>

<section>

    <div class="attr">
        <h3>Materials</h3><br /><br />

        <button on:click|preventDefault={() => loadXLSX()}>Load material sources from Excel file (*.xlsx)</button>

        
        <!--<textarea bind:value={materialsInput} ></textarea>-->
        <br />

        <!--<button on:click|preventDefault={() => addStudy()}>add material source</button>-->

        <!--{#each assays as assay}
        <Assay bind:assay />
        {/each}-->

        {#if data.length > 0}
        <Grid {data} {columns} />
        {/if}
    </div>

</section>

<style>
    @import "https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css";

    textarea {
        width: 100%;
        height: 100px;
    }
    button {
        margin: 0 0 10px 8px;
    }
    h3 {
        display: inline;
        margin: 0 0 10px 0;
        font-style: italic;
    }
</style>