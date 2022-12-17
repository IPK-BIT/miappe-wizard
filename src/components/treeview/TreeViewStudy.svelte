<script lang="ts">
    import TreeViewAssays from "./TreeViewAssays.svelte";
    import TreeViewPeople from "./TreeViewPeople.svelte";
    import TreeViewPublication from "./TreeViewPublications.svelte";

    export let study;
    export let index;
    import { createEventDispatcher, getContext, setContext } from 'svelte';
    const dispatch = createEventDispatcher();

    let context = getContext('isaLevel');
    setContext('isaLevel', context+"."+index);
    context = getContext('isaLevel');


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
        {#if study.title}
            <a on:click|preventDefault={sendTreeViewAction} href="#">{study.title}</a>
        {:else}
            <a>unnamed</a>
        {/if}
    </li>
    {#if expanded}
        <ul>
            <TreeViewPublication on:treeViewAction bind:publications={study.publications}/>
            <TreeViewPeople on:treeViewAction bind:people={study.people}/>
            <TreeViewAssays on:treeViewAction bind:assays={study.assays}/>
        </ul>    
    {/if}

<style>
    ul {
            margin: 0;
            list-style: none;
            padding-left: 1.2rem; 
            user-select: none;
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