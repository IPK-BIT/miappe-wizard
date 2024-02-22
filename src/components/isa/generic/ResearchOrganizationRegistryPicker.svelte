<script lang="ts">
//export let comments: Array<Object>;
export let label = '';
export let value;
export let showLabel = true;

import { onMount, createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

import Svelecte from 'svelecte';

import Schemas from '@/lib/schemas.js';

let rorid;

async function getAccessToken() {
    let url = 'https://pub.orcid.org/oauth/token';

    let postOptions = {
        method: 'POST',
        cache: "no-cache",
        mode: "no-cors",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization' : 'client_id:APP-ON4H0IG0Z62ABQQB, client_secret:25708c62-db57-450e-8d2f-b95fd796319b'
        },
        redirect: 'follow'
    }

    let response = await fetch(url, postOptions);
    console.log(response.json());
}

async function handleFetch(query) {
    const url = 'https://api.ror.org/organizations?query='+query;

    let postOptions = {
        method: 'GET',
        //cache: "no-cache",
        mode: "cors",
        headers: {
            'Content-Type': 'application/vnd.orcid+json'
        },
        //redirect: 'follow'
    }

    let response = await fetch(url, postOptions);
    let resultJson = await response.json();

    //resultJson['expanded-result'] = resultJson['expanded-result'].filter(item => item['institution-name'].length > 0 ? true : false);

    let result = resultJson['items'].map(item => {

        let searchResultItem = [];

        searchResultItem.push(item.name);
        if (item.addresses) {
            searchResultItem.push(item.addresses[0].city);
        }
        searchResultItem.push(item.country.country_name);

        let newItem = {
            //id: 'https://orcid.org/'+item['orcid-id'],
            id: item.id,
            name: searchResultItem.join(', ')
            //id: item.id,
            //name: item.name
        }

        return newItem;
    });

    console.log(result);

    return result;
}

function onChange() {
    //comments = [...comments, {name:'Person ID', value: orcid}];
    value = rorid;
    dispatch('change');
}

function remove() {
    //comments = comments.filter(comment => comment.value !== rorid);
    rorid = '';
    value = '';
    dispatch('change');
}

function init() {
    rorid = value;
}

onMount(() => {
    //getAccessToken();
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

div.sv-control {
    border: 1px solid black;
}

h5 {
    padding: 0;
    margin: 0;
    font-size: 100%;
    color: black;
    font-weight: 500;
}
section {
    /*margin-top: 10px;*/
    /*border: 1px solid rgb(0,0,0);*/
    /*background: rgb(235,235,235);*/
    padding: 0px;
}
</style>