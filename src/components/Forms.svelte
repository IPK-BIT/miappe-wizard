<script>
    export let isaObj;
    export let level;

    import Investigation from '@/components/isa/investigation/Investigation.svelte';
    import Publications from '@/components/isa/generic/Publications.svelte';
    import People from '@/components/isa/generic/People.svelte';
    import Studies from '@/components/isa/study/Studies.svelte';
    import Study from '@/components/isa/study/Study.svelte';

    let value;
    let component;

    /*let levelToComponentMapping = {
        'investigation': {
            component: Investigation,
            //value: isaObj
        },
        'investigation.publication': {
            component: Publications,
            //value: isaObj['publications']
        },
        'investigation.study': null,
        'investigation.study.0': null,
        'investigation.study.0.publication': null,
        'investigation.study.0.people': null,
    };*/

    $: console.log(level);
</script>


<section>

    {#if level == 'investigation'}
    <svelte:component this={Investigation} bind:value={isaObj} />
    {/if}

    {#if level == 'investigation.publication'}
    <svelte:component this={Publications} bind:value={isaObj['publications']} />
    {/if}

    {#if level == 'investigation.people'}
    <svelte:component this={People} bind:value={isaObj['people']} />
    {/if}

    {#if level == 'investigation.study'}
    <svelte:component this={Studies} bind:value={isaObj['studies']} />
    {/if}




    <!--
    {#if value}
    <svelte:component this={component} bind:value={value} />
    {JSON.stringify(value)}
    {/if}
    -->
    

</section>


<style>

</style>