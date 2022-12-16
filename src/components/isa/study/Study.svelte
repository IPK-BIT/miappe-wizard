<script lang="ts">
    export let study;

    import Comments from '@/components/isa/generic/Comments.svelte';
    import Date from '@/components/isa/generic/Date.svelte';
    import String from '@/components/isa/generic/String.svelte';

    import People from '@/components/isa/generic/People.svelte';
    import Materials from '@/components/isa/generic/materials/Materials.svelte';
    import Assays from '@/components/isa/assay/Assays.svelte';

    import { explanationActionFactory } from '@/actions/explanation.js';
    import { getContext } from 'svelte';
    import Publications from '../generic/Publications.svelte';
    const isaLevel = getContext('isaLevel');

    let explanationAction = explanationActionFactory(isaLevel);
</script>

<section>

    <div class="attr entity">
        <h4>Study</h4>

        <String bind:value={study.filename} attr="filename" />
        <String bind:value={study.identifier} attr="identifier" />
        <String bind:value={study.title} attr="title" />
        <String bind:value={study.description} attr="description" />
        
        <Date bind:value={study.submissionDate} attr="submissionDate" />
        <Date bind:value={study.publicReleaseDate} attr="publicReleaseDate" />

        <Comments bind:comments={study.comments} />

        <Publications bind:value={study.publications} attr="publications" />

        <People bind:value={study.people} attr="people" />

        <Materials bind:value={study.materials} attr="materials" />

        <div class="assays">
            <Assays bind:assays={study.assays} />
        </div>

    </div>

</section>


<style>
    div.assays {
        margin-top: 15px;
    }
    input {
        margin: 5px 20px 0 0;
    }
    div.entity {
        background: rgb(240,240,240);
        margin-bottom: 30px;
    }
</style>