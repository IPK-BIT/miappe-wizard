<script>
export let person;
export let wording = 'person';
export let countPeople = 1;
export let componentConfig = {};

import Comments from '@/components/isa/generic/Comments.svelte';

import OntologyAnnotations from '@/components/isa/generic/OntologyAnnotations.svelte';
import PersonRoles from './PersonRoles.svelte';
import PersonOrcid from './PersonOrcid.svelte';

import ontologyMapping from '@/lib/ontologyMapping';
</script>

<section>

    <div class="attr">
        <div style="display: flow-root;">
            <h4 style="float: left; border: 0px solid red; margin: 0;">{wording}</h4>
            {#if countPeople > 1}
            <button class="btn btn-warning" style="float: left; margin-left: 20px;">Remove</button>
            {/if}
        </div>

        <input on:change type="text" bind:value={person.firstName} placeholder="first name" style="margin-right: 20px;"> 
        <input on:change type="text" bind:value={person.lastName} placeholder="last name"> <br />
        <input on:change type="text" bind:value={person.address} placeholder="address" style="width: 100%;"> <br />
        <input on:change type="text" bind:value={person.affiliation} placeholder="affiliation" style="width: 100%;"> <br />

        <!--<OntologyAnnotations on:change bind:ontologyAnnotations={person.roles} ontology={ontologyMapping['Person.role']} />-->

        <PersonOrcid on:change bind:comments={person.comments} />

        <PersonRoles on:change bind:roles={person.roles} ontology={ontologyMapping['Person.role']} />

        {#if componentConfig.showComments}
        <Comments on:change bind:value={person.comments} />
        {/if}

    </div>

</section>


<style>
h4 {
    margin-bottom: 20px !important;
}
section {
    /*background: rgba(0,0,0,0.05);*/
    border: 1px solid rgb(150,150,150);
    padding: 10px;
}
input {
    margin-bottom: 10px;
}
</style>