<script lang="ts">
    export let studies;

    import TreeViewStudy from "./TreeViewStudy.svelte";
    import { partialview } from '@/stores/partialview';

    import { getContext, setContext } from 'svelte';

    let context = getContext('isaLevel');
    setContext('isaLevel', context+'.studies');
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
    <a on:click|preventDefault={sendTreeViewAction} href="#">Studies</a> ({studies.length})
    {#if expanded}
    <ul>
        {#each studies as study, index}
            <li>
                <TreeViewStudy {index} bind:study={study}/>
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