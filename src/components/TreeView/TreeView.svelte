<script lang="ts">
    import TreeViewPeople from './TreeViewPeople.svelte';
    import TreeViewPublications from './TreeViewPublications.svelte';
    import TreeViewStudies from './TreeViewStudies.svelte';

    import { isaObj } from '@/stores/isa.js';

    let expanded = true;

    function toggle() {
        expanded = !expanded;
    }

    $: arrowDown = expanded;
</script>

<section>
    <ul>
        <li>
            <span on:click={toggle} class="arrow" class:arrowDown>&#x25b6</span>
            <a href="#">Investigation</a>
        </li>
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
    </ul>
</section>

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