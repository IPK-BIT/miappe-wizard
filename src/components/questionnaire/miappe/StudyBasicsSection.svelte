<script>
    let study;
    export {study as value};

    import String from '@/components/isa/generic/String.svelte';
    import Date from '@/components//isa/generic/Date.svelte';

    import { setContext } from 'svelte';
    setContext('isaLevel', 'Study');
</script>

<!--<p>Basic information about your experiment</p>-->

<!--<String bind:value={study.filename} label="Filename" attr="filename"/>-->
<String bind:value={study.identifier} label="Unique Identifier" attr="identifier" focus={true} />
<String bind:value={study.title} label="Title" attr="title" />
<String bind:value={study.description} label="Description" attr="description" />

<!-- <Date bind:value={study.submissionDate} attr="submissionDate" />
<Date bind:value={study.publicReleaseDate} attr="publicReleaseDate" /> -->