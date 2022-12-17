<script lang="ts">
    import { createEventDispatcher, getContext, setContext } from 'svelte';
    const dispatch = createEventDispatcher();

    let context = getContext('isaLevel');
    setContext('isaLevel', context+".assay");
    context = getContext('isaLevel');
    
    export let assays;

    let expanded = true;

    function toggle() {
        expanded = !expanded;
    }

    function sendTreeViewAction() {
        dispatch('treeViewAction', {
            action: 'showIsaLevel',
            level: context
        });
    }

    $: arrowDown = expanded;
</script>

<li>
    <span on:click={toggle} class="arrow" class:arrowDown>&#x25b6</span>
    <a on:click|preventDefault={sendTreeViewAction} href="#">Assays</a> ({assays.length})
</li>
{#if expanded}
    <ul>
        {#each assays as assay}
            <li>
                <span class="no-arrow"></span>
                {#if assay.title}
                    <a>{assay.title}</a>
                {:else}
                    <a>unnamed</a>
                {/if}
            </li>
        {/each}
    </ul>
{/if}
    

<style>
    ul {
            margin: 0;
            list-style: none;
            padding-left: 1.2rem; 
            user-select: none;
    }

    .no-arrow { 
        padding-left: 1.0rem; 
    }

    .arrow {
        cursor: pointer;
        display: inline-block;
        transition: transform 250ms; 
    }
    
    .arrowDown { 
        transform: rotate(90deg); 
        transition: transform 250ms;
    }

    a {
        font-size: large;
        text-decoration: none;
    }
</style>