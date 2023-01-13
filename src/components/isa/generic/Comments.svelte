<script lang="ts">
    let comments: Array<Object>;
    export { comments as value };
    export let attr = '';

    if (!comments) {
        comments = [];
    }

    import Schemas from '@/lib/schemas.js';
    import Comment from '@/components/isa/generic/Comment.svelte';

    const addComment = () => {
        let emptyComment = Schemas.getObjectFromSchema('comment');
        comments = [...comments, emptyComment];
    }

    function handleRemoveComment(event) {
        comments.splice(event.detail.index, 1);
        comments = [...comments];
    }

</script>

<section>

    <div class="attr">
        <h3>Comments</h3>

        <button class="add" on:click|preventDefault={() => addComment()}>add comment</button>

        {#each comments as comment, index}
        <Comment on:removeComment={handleRemoveComment} bind:comment {index} />
        {/each}
    </div>

</section>


<style>
    section {
        margin-top: 10px;
        margin-bottom: 10px;
        background: rgba(0,0,0,0.05);
    }
    h3 {
        display: inline;
        margin: 0 10px 10px 0;
        font-style: italic;
    }
</style>