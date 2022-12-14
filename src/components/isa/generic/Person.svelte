<script>
    export let person;

    import Comments from '@/components/isa/generic/Comments.svelte';

    import OntologyAnnotations from '@/components/isa/generic/OntologyAnnotations.svelte';
</script>

<section>

    <div class="attr" style="background: rgb(240,240,240); margin-bottom: 30px;">
        <h4>Person</h4>
        <input type="text" bind:value={person.firstName} placeholder="first name" style="margin-right: 20px;"> 
        <input type="text" bind:value={person.lastName} placeholder="last name"> <br />
        <input type="text" bind:value={person.address} placeholder="address" style="width: 100%;"> <br />
        <input type="text" bind:value={person.affiliation} placeholder="affiliation" style="width: 100%;"> <br />

        <OntologyAnnotations bind:ontologyAnnotations={person.roles} />

        <Comments bind:comments={person.comments} />

    </div>

</section>


<style>
input {
    margin-bottom: 10px;
}
</style>