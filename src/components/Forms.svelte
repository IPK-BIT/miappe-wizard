<script>
    export let isaObj;
    export let level;

    import Studies from '@/components/isa/study/Studies.svelte';
</script>


<section>
    Forms<br />
    {level}<br />
    {isaObj}<br /><hr />

    {#if isaObj[level]}
    <svelte:component this={Studies} bind:value={isaObj[level]} />
    {/if}

</section>


<style>

</style>