<script lang="ts">
    export let people;

    import { partialview } from '@/stores/partialview';

    import { getContext, setContext } from 'svelte';

    let context = getContext('isaLevel');
    setContext('isaLevel', context+".people");
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
    <a on:click|preventDefault={sendTreeViewAction} href="#">People</a> ({people.length})
    {#if expanded}
    <ul>
        {#each people as person}
            <li>
                <span class="no-arrow"></span>
            {#if person.firstName || person.lastName}
                <a>{person.firstName+" "+person.lastName}</a>
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