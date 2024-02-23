<script>
export let attr = '';
export let componentConfig = {};
let people;
export { people as value };
export let label = 'People';

import Schemas from '@/lib/schemas.js';
import Person from '@/components/isa/generic/Person.svelte';

const addPerson = async () => {
    let emptyPerson = await Schemas.getObjectFromSchema('person');
    people = [...people, emptyPerson];
}

let __person__ = 'person';
if (label === 'Authors') {
    __person__ = 'Author';
}

function onRemovePerson(event) {
    people.splice(event.detail.index, 1);
    people = [...people];
    //dispatch('change');
}

</script>

<section>

    <div class="attr">
        <h3>{label}</h3>

        {#each people as person, index}
        <Person on:change on:removePerson={onRemovePerson} bind:person wording={__person__} countPeople={people.length} {componentConfig} {index} />
        {/each}

        <button class="btn" on:click|preventDefault={() => addPerson()}>Add {__person__}</button>
    </div>

</section>


<style>
section {
    /*background: rgba(0,0,0,0.05);*/
    margin-bottom: 10px;
}
h3 {
    margin: 0 0 10px 0;
    font-weight: 500;
}
</style>