<script lang="ts">
    export let comments: Array<Object>;

    //import Comment from './Comment_useforms.svelte';
    import Comment from '@/components/generic/Comment.svelte';

    const addComment = () => {
        comments = [...comments, {name: '', value: ''}];
    }

</script>

<section>

    {#each comments as comment}
    <Comment bind:comment />
    {/each}

    <button on:click|preventDefault={() => addComment()}>add comment</button>

</section>


<style>
    section {
        margin-top: 10px;
    }
</style>