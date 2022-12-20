<script lang="ts">

    import { partialview } from '@/stores/partialview';

    import TreeViewPeople from './TreeViewPeople.svelte';
    import TreeViewPublications from './TreeViewPublications.svelte';
    import TreeViewStudies from './TreeViewStudies.svelte';

    import { isaObj } from '@/stores/isa.js';

    import { setContext } from 'svelte';
    setContext('isaLevel', 'investigation');

    let expanded = true;

    function toggle() {
        expanded = !expanded;
    }

    function sendTreeViewAction(level) {
        $partialview.path = 'investigation';
    }

</script>

<section>
    <ul id="tree-root">
        <li>
            <span on:click={toggle} class="arrow" class:arrowDown={expanded}>&#x25b6</span>
            <a on:click={()=>sendTreeViewAction("investigation")} href="#">Investigation</a>
            {#if expanded}
            <ul>
                {#if $isaObj.publications}
                    <TreeViewPublications bind:publications={$isaObj.publications}/>
                {/if}
                {#if $isaObj.people}
                    <TreeViewPeople bind:people={$isaObj.people}/>    
                {/if}
                {#if $isaObj.studies}
                    <TreeViewStudies bind:studies={$isaObj.studies}/>
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