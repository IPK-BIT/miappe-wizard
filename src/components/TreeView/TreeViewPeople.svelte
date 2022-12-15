<script lang="ts">
    export let people;

    let expanded = true;

    function toggle() {
        expanded = !expanded;
    }

    $: arrowDown = expanded;
</script>

<li>
    <span on:click={toggle} class="arrow" class:arrowDown>&#x25b6</span>
    <a href="#">People</a> ({people.length})
</li>
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