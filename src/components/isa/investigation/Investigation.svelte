<script>
    export let isa;

    import { setContext } from 'svelte';
    setContext('isaLevel', 'Investigation');

    import Date from '@/components/isa/generic/Date.svelte';
    import People from '@/components/isa/generic/People.svelte';
    import Publications from '@/components/isa/generic/Publications.svelte';

    import Studies from '@/components/isa/study/Studies.svelte';

    import String from '@/components/isa/generic/String.svelte';

    let componentMapper = {
        'title': String,
        'description': String,
        'submissionDate': Date,
        'publicReleaseDate': Date,
        'publications': Publications,
        'people': People,
        'studies': Studies
    };

    let components = Object.keys(componentMapper);
</script>


<section>
    {#if Object.keys(isa).length > 0}
    <h2>Investigation</h2>
        {#each Object.entries(isa) as [attr, value]}

            {#if components.includes(attr)}
                <svelte:component this={componentMapper[attr]} {attr} bind:value={isa[attr]} />
            {/if}

        {/each}
    {/if}
</section>


<style>

</style>