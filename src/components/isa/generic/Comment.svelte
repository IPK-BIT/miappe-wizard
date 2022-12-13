<script lang="ts">
    export let comment;
</script>

<section>

    <div class="attr comment">Comment: 
        <input type="text" bind:value={comment.name} placeholder="name" />
        <input type="text" bind:value={comment.value} placeholder="value" />
    </div>

</section>


<style>
div.comment {
    margin-top: 10px;
}
</style>