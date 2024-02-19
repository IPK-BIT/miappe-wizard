<script lang="ts">
    export let comment;
    export let index;

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
</script>

<section>

    <div class="attr comment">
        Name: <input on:change type="text" bind:value={comment.name} placeholder="name" />
        &nbsp; Value: <input on:change type="text" bind:value={comment.value} placeholder="value" />
        <button on:click={() => dispatch('removeComment', {index} )}>X</button>
    </div>

</section>


<style>
div.comment {
    margin-top: 10px;
}
</style>