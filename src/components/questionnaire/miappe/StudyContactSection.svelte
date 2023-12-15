<script>
    let study;
    export {study as value};

    import String from '@/components/isa/generic/String.svelte';

    import { setContext } from 'svelte';
    setContext('isaLevel', 'Study');
</script>

<p>Contacts of your institute</p>

<String bind:value={study.contactInstitution} attr="contactInstitution" />
<String bind:value={study.country} attr="country" />
<String bind:value={study.latitude} attr="latitude" />
<String bind:value={study.longitude} attr="longitude" />
<String bind:value={study.altitude} attr="altitude" />