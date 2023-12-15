<script>
    let study;
    export {study as value};

    import String from '@/components/isa/generic/String.svelte';
    import Date from '@/components//isa/generic/Date.svelte';

    import { setContext } from 'svelte';
    setContext('isaLevel', 'Study');
</script>

<p>Basic information about your experiment</p>

<String bind:value={study.filename} attr="filename"/>
<String bind:value={study.identifier} attr="identifier" />
<String bind:value={study.title} attr="title" />
<String bind:value={study.description} attr="description" />

<!-- <Date bind:value={study.submissionDate} attr="submissionDate" />
<Date bind:value={study.publicReleaseDate} attr="publicReleaseDate" /> -->