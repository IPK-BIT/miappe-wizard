<script lang="ts">
    export let publications;

    let expanded = false;

    function toggle() {
        expanded = !expanded;
    }

    $: arrowDown = expanded;
</script>

<li>
    <span on:click={toggle} class="arrow" class:arrowDown>&#x25b6</span>
    <a href="#">Publications</a> ({publications.length})
</li>
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