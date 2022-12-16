<script lang="ts">
    export let roles: Array<Object>;

    import Comment from '@/components/isa/generic/Comment.svelte';

    const addRole = () => {
        roles = [...roles, {name: '', value: ''}];
    }

</script>

<section>

    {#each roles as role, index}
    {role}
    {/each}

    <button on:click|preventDefault={() => addRole()}>add role</button>

</section>


<style>
    section {
        margin-top: 10px;
    }
</style>