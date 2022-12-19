<script>
    //export let isaObj;
    export let level;

    import { isaObj } from '@/stores/isa.js';

    import Investigation from '@/components/isa/investigation/Investigation.svelte';
    import Publications from '@/components/isa/generic/Publications.svelte';
    import People from '@/components/isa/generic/People.svelte';
    import Studies from '@/components/isa/study/Studies.svelte';
    import Study from '@/components/isa/study/Study.svelte';

    let value;
    let component;

    let levelToComponentMapping = {
        'investigation': {
            component: Investigation,
            value: isaObj
        },
        'investigation.publication': {
            component: Publications,
            //value: () => isaObj['publications']
            //value: derived(isaObj, $isaObj => $isaObj.publications),
            //value: isaObj.derived('publications')
            value: isaObj.keyed('publications')
        },
        'investigation.people': {
            component: People,
            value: isaObj.keyed('people')
        },
        'investigation.studies': {
            component: Studies,
            value: isaObj.keyed('studies')
        },
        'investigation.studies.0': {
            component: Study,
            value: isaObj.keyed('studies[0]')
        },
        'investigation.study.0.publication': null,
        'investigation.study.0.people': null,
    };

    $: console.log(level);

    let lastValue;
    $: lastValue = level.split('.');
    $: console.warn(lastValue);


    $: component = levelToComponentMapping?.[level]?.component;
    $: value = levelToComponentMapping?.[level]?.value;
    $: console.log($value);

</script>


<section>
    
    {#if value}
    <svelte:component this={component} bind:value={$value} />
    {/if}

</section>


<style>

</style>