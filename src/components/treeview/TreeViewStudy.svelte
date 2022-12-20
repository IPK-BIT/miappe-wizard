<script lang="ts">
    export let study;
    export let index;

    import { partialview } from '@/stores/partialview';

    import TreeViewAssays from "./TreeViewAssays.svelte";
    import TreeViewPeople from "./TreeViewPeople.svelte";
    import TreeViewPublication from "./TreeViewPublications.svelte";

    import { getContext, setContext } from 'svelte';

    let context = getContext('isaLevel');
    setContext('isaLevel', context+'['+index+']');
    context = getContext('isaLevel');

    let expanded = true;

    function toggle() {
        expanded = !expanded;
    }

    function sendTreeViewAction() {
        $partialview.path = context;
    }

</script>

    <li>
        <span on:click={toggle} class="arrow" class:arrowDown={expanded}>&#x25b6</span>
        {#if study.title}
            <a on:click|preventDefault={sendTreeViewAction} href="#">{study.title}</a>
        {:else}
            <a>unnamed</a>
        {/if}
    </li>
    {#if expanded}
        <ul>
            <TreeViewPublication bind:publications={study.publications}/>
            <TreeViewPeople bind:people={study.people}/>
            <TreeViewAssays bind:assays={study.assays}/>
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