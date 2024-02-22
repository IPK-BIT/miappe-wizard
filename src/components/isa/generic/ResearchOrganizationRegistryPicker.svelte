<script lang="ts">
//export let comments: Array<Object>;
export let label = '';
export let value;
export let showLabel = true;

import { onMount, createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

import Svelecte from 'svelecte';

let rorid;

async function handleFetch(query) {
    const url = 'https://api.ror.org/organizations?query='+query;

    let postOptions = {
        method: 'GET',
        mode: "cors",
        headers: {
            'Content-Type': 'application/vnd.orcid+json'
        },
    }

    let response = await fetch(url, postOptions);
    let resultJson = await response.json();

    let result = resultJson['items'].map(item => {

        let searchResultItem = [];

        searchResultItem.push(item.name);
        if (item.addresses) {
            searchResultItem.push(item.addresses[0].city);
        }
        searchResultItem.push(item.country.country_name);

        let newItem = {
            id: item.id,
            name: searchResultItem.join(', ')
        }

        return newItem;
    });

    return result;
}

function onChange() {
    value = rorid;
    dispatch('change');
}

function remove() {
    rorid = '';
    value = '';
    dispatch('change');
}

function init() {
    rorid = value;
}

onMount(() => {
    init();
});

</script>

<section>

    <div class="attr pure-g v-center">
        <div class="pure-u-5-24">
            {#if showLabel}
            <label>{label}</label>
            {/if}
        </div>
        <div class="pure-u-19-24">
            {#if rorid}
            <div style="border: 1px solid black; height: 40px; padding: 9px;">
                <a target="_blank" href="{rorid}">{rorid}</a> <button on:click|preventDefault={() => remove()} class="btn btn-warning" style="margin-left: 20px;">Remove</button>
            </div>
            {:else}
            <Svelecte name="selection"
                bind:value={rorid}
                valueAsObject={false}
                placeholder="Search for your institute by its name..."
                fetch={handleFetch}
                on:change={onChange}
            />
            {/if}
        </div>
    </div>


</section>


<style>

</style>