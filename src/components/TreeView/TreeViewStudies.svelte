<script lang="ts">
    import TreeViewStudy from "./TreeViewStudy.svelte";

    export let studies;

    let expanded = false;

    function toggle() {
        expanded = !expanded;
    }

    $: arrowDown = expanded;
</script>

<li>
    <span on:click={toggle} class="arrow" class:arrowDown>&#x25b6</span>
    <a href="#">Studies</a> ({studies.length})
</li>
{#if expanded}
    <ul>
        {#each studies as study}
            <li>
                <TreeViewStudy bind:study={study}/>
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