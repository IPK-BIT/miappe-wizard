<script lang="ts">
    export let publications;

    import { partialview } from '@/stores/partialview';

    import { getContext, setContext } from 'svelte';

    let context = getContext('isaLevel');
    setContext('isaLevel', context+".publications");
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