<script lang="ts">
    import TreeViewPeople from './TreeViewPeople.svelte';
    import TreeViewPublications from './TreeViewPublications.svelte';
    import TreeViewStudies from './TreeViewStudies.svelte';

    import { isaObj } from '@/stores/isa.js';

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import { setContext } from 'svelte';
    setContext('isaLevel', 'investigation');

    let expanded = true;

    function toggle() {
        expanded = !expanded;
    }

    function sendTreeViewAction(level) {
        dispatch('treeViewAction', {
            action: 'showIsaLevel',
            level
        });
    }

    $: arrowDown = expanded;
</script>

<section>
    <ul id="tree-root">
        <li>
            <span on:click={toggle} class="arrow" class:arrowDown>&#x25b6</span>
            <a on:click={()=>sendTreeViewAction("investigation")} href="#">Investigation</a>
            {#if expanded}
            <ul>
                {#if $isaObj.publications}
                    <TreeViewPublications on:treeViewAction bind:publications={$isaObj.publications}/>
                {/if}
                {#if $isaObj.people}
                    <TreeViewPeople on:treeViewAction bind:people={$isaObj.people}/>    
                {/if}
                {#if $isaObj.studies}
                    <TreeViewStudies on:treeViewAction bind:studies={$isaObj.studies}/>
                {/if}
            </ul>
        {/if}
        </li>
    </ul>
</section>

<style>
    section {
        font-size: 100%;
    }
    ul {
            margin: 0;
            list-style: none;
            padding-left: 1rem; 
            user-select: none;
    }

    ul#tree-root {
        padding-left: 0.3rem;
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