<script lang="ts">
    import { createEventDispatcher, getContext, setContext } from 'svelte';
    const dispatch = createEventDispatcher();

    let context = getContext('isaLevel');
    setContext('isaLevel', context+".publication");
    context = getContext('isaLevel');

    export let publications;

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
    <a on:click|preventDefault={sendTreeViewAction} href="#">Publications</a> ({publications.length})
    {#if expanded}
    <ul>
        {#each publications as publication}
        <li>
            <span class="no-arrow"></span>
            {#if publication.title}
                {#if publication.title.length > 20}
                    <a>{publication.title.substring(0,15)}...</a>
                {:else}
                    <a>{publication.title}</a>
                {/if}
            {:else}
                <a>unnamed</a>
            {/if}
        </li>
        {/each}
    </ul>
    {/if}
</li>

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
        text-decoration: none;
    }
</style>