<script lang="ts">
    export let comment;
    export let index;

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
</script>

<section>

    <div class="attr comment">Comment: 
        <input type="text" bind:value={comment.name} placeholder="name" />
        <input type="text" bind:value={comment.value} placeholder="value" />
        <button on:click={() => dispatch('removeComment', {index} )}>X</button>
    </div>

</section>


<style>
div.comment {
    margin-top: 10px;
}
</style>