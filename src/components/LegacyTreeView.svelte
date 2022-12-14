<script lang="ts">
    const _expandableState = {
        "investigation": true,
        "publications": true,
        "people": true,
        "studies": false
    }
    import { isaObj } from '@/stores/isa.js';
    
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    
    let treeComponents = [
    "investigation",
    "people",
    "studies",
    "publications"
    ]
    
    function jumpTo(value:any){
        console.log(value);
    }
    
    function firstUpper(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    function expand(elem: MouseEvent) {
        _expandableState[elem.target.classList[0]] = !_expandableState[elem.target.classList[0]];
        if (_expandableState[elem.target.classList[0]]) {
            elem.target.classList.add("arrowDown");
        } else {
            elem.target.classList.remove("arrowDown");
        }        
        console.log(_expandableState);
    }
</script>

<section>
    <ul>
        {#if Object.keys($isaObj).length > 0}
        <li>
            <!--<span class="no-arrow"/>-->
            <a href="#" on:click={jumpTo({'type': 'investigation'})}>
                Investigation
            </a>
        </li>
        <ul>
            {#each Object.entries($isaObj) as [entry, value]}
            {#if treeComponents.includes(entry)}
            <li>
                <span on:click={expand} class="{entry} arrow" class:arrowDown={_expandableState[entry]}>&#x25b6</span>
                <a href="#" on:click={jumpTo(value)}>
                    {firstUpper(entry)}
                </a>
                ({value.length})
                {#if value.length > 0 && _expandableState[entry]}
                <ul>
                    {#each value as val}
                    {#if entry === 'people'}
                        {#if val.firstName.length > 0 || val.lastName.length > 0}
                        <li>
                            <span class="no-arrow"></span>
                            <a>
                                {val.firstName+" "+val.lastName}
                            </a>
                        </li>
                        {/if}
                    {:else if entry === 'studies'}
                    {#if val.title.length > 0}
                    <li>
                        <!--{#if val.assays.length > 0}
                            <span on:click={expand} class="{val.title.replace(/\s/g, "")} arrow" class:arrowDown={_expandableState[val.title.replace(/\s/g, "")]}>&#x25b6</span>
                            <a href="#" on:click={jumpTo(val)}>
                                {val.title}
                            </a>
                            ({val.assays.length})
                            {#if _expandableState[val.title.replace(/\s/g, "")]}
                            <ul>
                                {#each val.assays as assay}
                                    <li>
                                        <a>{assay.title}</a>
                                    </li>
                                {/each}
                            </ul>
                            {/if}
                        {:else}
                            <span class="no-arrow"></span>
                            <a href="#" on:click={jumpTo(val)}>
                                {val.title}
                            </a>
                            ({val.assays.length})
                        {/if}-->
                        <span on:click={expand} class="{val.title.replace(/\s/g, "")} arrow" class:arrowDown={_expandableState[val.title.replace(/\s/g, "")]}>&#x25b6</span>
                        <a href="#">{val.title}</a>
                        {#if _expandableState[val.title.replace(/\s/g, "")]}
                            <ul>
                                <!--Publications-->
                                <li>
                                    <span on:click={expand} class="{val.title.replace(/\s/g, "")+"Publications"} arrow" class:arrowDown={_expandableState[val.title.replace(/\s/g, "")+"Publications"]}>&#x25b6</span>
                                    <a href="#">Publications</a> ({val.publications.length})
                                    {#if val.publications.length > 0 && _expandableState[val.title.replace(/\s/g, "")+"Publications"]}
                                        <ul>
                                            {#each val.publications as publication}
                                                {#if publication.title}
                                                    <li>
                                                        <span class="no-arrow"></span>
                                                        {#if publication.title.length > 15}
                                                            <a>{publication.title.substring(0, 12)+"..."}</a>
                                                        {:else}
                                                            <a>{publication.title}</a>
                                                        {/if}
                                                    </li>
                                                {/if}
                                            {/each}
                                        </ul>
                                    {/if}
                                </li>
                                <!--People-->
                                <li>
                                    <span on:click={expand} class="{val.title.replace(/\s/g, "")+"People"} arrow" class:arrowDown={_expandableState[val.title.replace(/\s/g, "")+"People"]}>&#x25b6</span>
                                    <a href="#">People</a> ({val.people.length})
                                    {#if val.people.length > 0 && _expandableState[val.title.replace(/\s/g, "")+"People"]}
                                        <ul>
                                            {#each val.people as person}
                                                {#if person.firstName.length > 0 || person.lastName.length > 0}
                                                    <li>
                                                        <span class="no-arrow"></span>
                                                        <a>{person.firstName+" "+person.lastName}</a>
                                                    </li>
                                                {/if}
                                            {/each}
                                        </ul>
                                    {/if}
                                </li>
                                <!--Assays-->
                                <li>
                                    <span on:click={expand} class="{val.title.replace(/\s/g, "")+"Assays"} arrow" class:arrowDown={_expandableState[val.title.replace(/\s/g, "")+"Assays"]}>&#x25b6</span>
                                    <a href="#">Assays</a> ({val.assays.length})
                                    {#if val.assays.length > 0 && _expandableState[val.title.replace(/\s/g, "")+"Assays"]}
                                        <ul>
                                            {#each val.assays as assay}
                                                {#if assay.title}
                                                    <li>
                                                        <span class="no-arrow"></span>
                                                        <a>{assay.title}</a>
                                                    </li>
                                                {/if}
                                            {/each}
                                        </ul>
                                    {/if}
                                </li>
                            </ul>
                        {/if}
                    </li>
                    {/if}
                    {:else}
                        {#if val.title.length > 0}
                            <li>
                                <span class="no-arrow"></span>
                                <!--<a>
                                    {val.title}
                                </a>-->
                                {#if val.title.length > 15}
                                    <a>{val.title.substring(0, 12)+"..."}</a>
                                {:else}
                                    <a>{val.title}</a>
                                {/if}
                            </li>
                        {/if}
                    {/if}
                    {/each}
                </ul>
                {/if}
            </li>
            {/if}
            {/each}
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
        .no-arrow { padding-left: 1.0rem; }
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