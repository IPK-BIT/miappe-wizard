<script>
    let study;
    export {study as value};

    import String from '@/components/isa/generic/String.svelte';

    import { setContext } from 'svelte';
    setContext('isaLevel', 'Study');
</script>

<!--<p>Contacts of your institute</p>-->

<String bind:value={study.contactInstitution} label="Contact" attr="contactInstitution" />
<String bind:value={study.country} label="Country" attr="country" />
<String bind:value={study.latitude} label="Latitude" attr="latitude" />
<String bind:value={study.longitude} label="Longitude" attr="longitude" />
<String bind:value={study.altitude} label="Altitude" attr="altitude" />