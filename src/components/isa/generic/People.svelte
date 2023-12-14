<script>
    export let attr = '';
    let people;
    export { people as value };

    import Schemas from '@/lib/schemas.js';
    import Person from '@/components/isa/generic/Person.svelte';

    const addPerson = async () => {
        let emptyPerson = await Schemas.getObjectFromSchema('person');
        people = [...people, emptyPerson];
    }

</script>

<section>

    <div class="attr">
        <h3>People</h3>

        <button class="add" on:click|preventDefault={() => addPerson()}>add person</button>

        {#each people as person}
        <Person bind:person />
        {/each}
    </div>

</section>


<style>
    section {
        background: rgba(0,0,0,0.05);
        margin-bottom: 10px;
    }
    h3 {
        display: inline;
        margin: 0 0 10px 0;
        font-weight: 500;
    }
    button {
        margin-left: 8px;
        margin-bottom: 10px;
    }
</style>