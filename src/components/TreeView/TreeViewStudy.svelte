<script lang="ts">
    import TreeViewAssays from "./TreeViewAssays.svelte";
    import TreeViewPeople from "./TreeViewPeople.svelte";
    import TreeViewPublication from "./TreeViewPublications.svelte";

    export let study;

    let expanded = true;

    function toggle() {
        expanded = !expanded;
    }

    $: arrowDown = expanded;
</script>

    <li>
        <span on:click={toggle} class="arrow" class:arrowDown>&#x25b6</span>
        {#if study.title}
            <a href="#">{study.title}</a>
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