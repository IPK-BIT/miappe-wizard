<script>
export let label = '';
export let isaLevel = null;
export let attr;
let date;
export { date as value };
export let showLabel = true;
export let focus = false;

if (!label) {
    label = attr;
}

import { explanationActionFactory } from '@/actions/explanation.js';
import { appstate } from '@/stores/appstate';
import { onMount, getContext, createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

let year = '';
let month = '';
let day = '';


if (!isaLevel) {
    isaLevel = getContext('isaLevel');
}

let explanationAction = explanationActionFactory(isaLevel);

function setFocus(el){
    if ($appstate==appstate.WIZARD && focus){
        el.focus();
    }
}

function onChange() {
    if (year == '') {
        year = new Date().getFullYear().toString();
    }
    if (month == '') {
        month = '01';
    }
    if (day == '') {
        day = '01';
    }
    date = year+'-'+month+'-'+day;
    dispatch('change');
}

const zeroPad = (num, places) => String(num).padStart(places, '0');

function init() {
    if (date && date.length == 10 && date.includes('-')) {
        let parts = date.split('-');
        year = parts[0];
        month = parts[1];
        day = parts[2];
    }

}

onMount(() => {
    init();
})

</script>


<section>

    <div class="attr pure-g v-center">
        <div class="pure-u-5-24">
            {#if showLabel}
            <label>{label}</label>
            {/if}
        </div>
        <div class="pure-u-19-24">
            <input type="number" min="2000" max="2050" bind:value={year} on:change={onChange} />

            <select bind:value={month} on:change={onChange}>
                <option value=""></option>
                {#each {length: 12} as _, i}
                <option value="{zeroPad(i+1, 2)}">{zeroPad(i+1, 2)}</option>
                {/each}
            </select>
    
            <select bind:value={day} on:change={onChange}>
                <option value=""></option>
                {#each {length: 31} as _, i}
                <option value="{zeroPad(i+1, 2)}">{zeroPad(i+1, 2)}</option>
                {/each}
            </select>
        </div>
    </div>

    <!--
    <div class="attr">
        {#if showLabel}
        <label>{label}:</label>
        {/if}
        
        <input type="number" min="2000" max="2050" bind:value={year} on:change={onChange} />

        <select bind:value={month} on:change={onChange}>
            <option value=""></option>
            {#each {length: 12} as _, i}
            <option value="{zeroPad(i+1, 2)}">{zeroPad(i+1, 2)}</option>
            {/each}
        </select>

        <select bind:value={day} on:change={onChange}>
            <option value=""></option>
            {#each {length: 31} as _, i}
            <option value="{zeroPad(i+1, 2)}">{zeroPad(i+1, 2)}</option>
            {/each}
        </select>

    </div>
    -->

</section>


<style>
.datepicker {
    padding: 4px;
    font-family: sans-serif;
    font-size: 100%;
}
</style>