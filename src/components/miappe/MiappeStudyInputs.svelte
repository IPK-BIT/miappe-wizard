<script>
    import String from '@/components/isa/generic/String.svelte';
    import Date from '../isa/generic/Date.svelte';

    let study;
    export {study as value};
</script>

<Date bind:value={study.startDate} attr="startDate" />
<Date bind:value={study.endDate} attr="endDate" />
<String bind:value={study.contactInstitution} attr="contactInstitution" />
<String bind:value={study.country} attr="country" />
<String bind:value={study.latitude} attr="latitude" />
<String bind:value={study.longitude} attr="longitude" />
<String bind:value={study.altitude} attr="altitude" />
<String bind:value={study.dataFileLink} attr="dataFileLink" />
<String bind:value={study.dataFileDescription} attr="dataFileDescription" />
<String bind:value={study.dataFileVersion} attr="dataFileVersion" />

<String bind:value={study.designDescription} attr="designDescription" />
<String bind:value={study.designType} attr="designType" />
<String bind:value={study.observationUnitLevelHierarchy} attr="observationUnitLevelHierarchy" />
<String bind:value={study.observationUnitDescription} attr="observationUnitDescription" />
<String bind:value={study.descriptionOfGrowthFacility} attr="descriptionOfGrowthFacility" />
<String bind:value={study.typeOfGrowthFacility} attr="typeOfGrowthFacility" />
<String bind:value={study.mapOfExperimentalDesign} attr="mapOfExperimentalDesign" />