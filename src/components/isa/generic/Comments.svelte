<script lang="ts">
    export let comments: Array<Object>;

    import Comment from '@/components/isa/generic/Comment.svelte';

    const addComment = () => {
        comments = [...comments, {name: '', value: ''}];
    }

    function handleRemoveComment(event) {
        comments.splice(event.detail.index, 1);
        comments = [...comments];
    }

</script>

<section>

    {#each comments as comment, index}
    <Comment on:removeComment={handleRemoveComment} bind:comment {index} />
    {/each}

    <button on:click|preventDefault={() => addComment()}>add comment</button>

</section>


<style>
    section {
        margin-top: 10px;
    }
</style>