<script lang="ts">
    export let study;

    import Comments from '@/components/generic/Comments.svelte';
</script>

<section>

    <div class="attr entity">
        <h4>Study</h4>
        <input type="text" bind:value={study.title} placeholder="Study title">

        <Comments bind:comments={study.comments} />

    </div>

</section>


<style>
    input {
        margin: 0 20px 0 0;
    }
    div.entity {
        background: rgb(240,240,240);
        margin-bottom: 30px;
    }
</style>