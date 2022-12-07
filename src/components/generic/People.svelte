<script>
    export let attr;
    let people;
    export { people as value };

    import Schemas from '@/lib/schemas.js';
    import Person from '@/components/generic/Person.svelte';

    const addPerson = async () => {
        let emptyPerson = await Schemas.getObjectFromSchema('person');
        people = [...people, emptyPerson];
    }

</script>

<section>

    <div class="attr">
        <h3>People</h3>

        <button on:click|preventDefault={() => addPerson()}>add person</button>

        {#each people as person}
        <Person bind:person />
        {/each}
    </div>

</section>


<style>
h3 {
    display: inline;
    margin: 0 0 10px 0;
    font-style: italic;
}
button {
    margin-left: 8px;
    margin-bottom: 10px;
}
</style>