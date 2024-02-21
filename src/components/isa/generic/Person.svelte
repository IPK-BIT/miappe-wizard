<script>
export let person;
export let componentConfig = {};

import Comments from '@/components/isa/generic/Comments.svelte';

import OntologyAnnotations from '@/components/isa/generic/OntologyAnnotations.svelte';
import PersonRoles from './PersonRoles.svelte';
import PersonOrcid from './PersonOrcid.svelte';

import ontologyMapping from '@/lib/ontologyMapping';
</script>

<section>

    <div class="attr">
        <h4>Person</h4>
        <input on:change type="text" bind:value={person.firstName} placeholder="first name" style="margin-right: 20px;"> 
        <input on:change type="text" bind:value={person.lastName} placeholder="last name"> <br />
        <input on:change type="text" bind:value={person.address} placeholder="address" style="width: 100%;"> <br />
        <input on:change type="text" bind:value={person.affiliation} placeholder="affiliation" style="width: 100%;"> <br />

        <!--<OntologyAnnotations on:change bind:ontologyAnnotations={person.roles} ontology={ontologyMapping['Person.role']} />-->
        <PersonRoles on:change bind:roles={person.roles} ontology={ontologyMapping['Person.role']} />

        <PersonOrcid on:change bind:comments={person.comments} />

        {#if componentConfig.showComments}
        <Comments on:change bind:value={person.comments} />
        {/if}

    </div>

</section>


<style>
    section {
        background: rgba(0,0,0,0.05);
    }
    input {
        margin-bottom: 10px;
    }
</style>