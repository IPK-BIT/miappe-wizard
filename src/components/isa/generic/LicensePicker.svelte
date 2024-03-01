<script>
    import Svelecte from "svelecte";
    import { createEventDispatcher, onMount } from "svelte";
    
    export let label = '';
    export let value;
    export let showLabel = true;
    
    let license;
    const dispatch = createEventDispatcher();
    
    async function handleFetch() {
        const response = await fetch('https://raw.githubusercontent.com/spdx/license-list-data/main/json/licenses.json');
        const data = await response.json();
        console.log(data);
        return data.licenses.map(license => {
            return {
                value: license.licenseId,
                label: license.name,
                url: license.reference
            }
        });
    }
    
    function onChange() {
        value = license.value;
        dispatch('change');
    }
    
    function remove() {
        license=undefined;
        value=undefined;
        dispatch('change');
    }
    
    onMount(()=>{
        if (value) {
            license = {
                value: value
            };
        }
    });
    
</script>


<section>
    
    <div class="attr pure-g v-center">
        <div class="pure-u-5-24">
            {#if showLabel}
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>{label}</label>
            {/if}
        </div>
        <div class="pure-u-19-24">
            {#if license}
            <div style="border: 1px solid black; height: 40px; padding: 9px; display: flow-root;">
                <a target="_blank" href={license.url}>{license.value}</a> <button on:click|preventDefault={() => remove()} class="btn btn-warning" style="float:right;">Remove</button>
            </div>
            {:else}
            <Svelecte
            style="border: 1px solid black; height: 40px;"
            bind:value={license}
            valueAsObject={true}
            placeholder="Search for license of your dataset..."
            fetch={handleFetch}
            on:change={onChange}/>
            {/if}
        </div>
    </div>
    
</section>

<style>
    
</style>