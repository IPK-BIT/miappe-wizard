<script lang="ts">
    let study;
    export { study as value };

    export let idx;

    import Comments from '@/components/isa/generic/Comments.svelte';
    import Date from '@/components/isa/generic/Date.svelte';
    import String from '@/components/isa/generic/String.svelte';

    import People from '@/components/isa/generic/People.svelte';
    import Materials from '@/components/isa/generic/materials/Materials.svelte';
    import Assays from '@/components/isa/assay/Assays.svelte';

    import { explanationActionFactory } from '@/actions/explanation.js';
    import { getContext, setContext } from 'svelte';
    import Publications from '../generic/Publications.svelte';

    import MiappeStudyInputs from '@/components/miappe/MiappeStudyInputs.svelte';
    import StudyTemplateGenerator from '@/components/StudyTemplateGenerator.svelte';
    const isaLevel = getContext('isaLevel');

    let explanationAction = explanationActionFactory(isaLevel);
    setContext('studyIdx', idx);
</script>

<section>
    <div class="attr ">
        <h4>Study</h4>
        
        <String bind:value={study.filename} attr="filename"/>
        <String bind:value={study.identifier} attr="identifier" />
        <String bind:value={study.title} attr="title" />
        <String bind:value={study.description} attr="description" />
        
        <!-- <Date bind:value={study.submissionDate} attr="submissionDate" />
        <Date bind:value={study.publicReleaseDate} attr="publicReleaseDate" /> -->

        <MiappeStudyInputs bind:value={study} />

        <Comments bind:value={study.comments} />

        <Publications bind:value={study.publications} attr="publications" />

        <People bind:value={study.people} attr="people" />

        <StudyTemplateGenerator bind:value={study} />
        <Materials bind:value={study} attr="materials" />

        <div class="assays">
            <Assays bind:value={study.assays} />
        </div>

    </div>

</section>


<style>
    section {
        background: rgba(0,0,0,0.05);
        margin-bottom: 10px;
    }
    div.assays {
        margin-top: 15px;
    }
</style>