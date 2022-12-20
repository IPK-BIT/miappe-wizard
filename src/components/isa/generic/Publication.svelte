<script lang="ts">
    export let publication;

    import Comments from '@/components/isa/generic/Comments.svelte';

    import { explanationActionFactory } from '@/actions/explanation.js';
    import { getContext } from 'svelte';
    const isaLevel = getContext('isaLevel');

    let explanationAction = explanationActionFactory(isaLevel);
</script>

<section>

    <div class="attr entity">
        <h4>Publication</h4>
        <input type="text" use:explanationAction data-attr="title" bind:value={publication.title} placeholder="Publication title"> <br />
        <input type="text" use:explanationAction data-attr="doi" bind:value={publication.doi} placeholder="DOI"> <br />
        <input type="text" use:explanationAction data-attr="pubMedID" bind:value={publication.pubMedID} placeholder="PubMed ID"> <br />
        <input type="text" use:explanationAction data-attr="authorList" bind:value={publication.authorList} placeholder="Author list"> <br />

        <Comments bind:value={publication.comments} />

    </div>

</section>


<style>
    input {
        margin: 0 20px 5px 0;
    }
    div.entity {
        background: rgba(0,0,0,0.05);
        margin-bottom: 30px;
    }
</style>