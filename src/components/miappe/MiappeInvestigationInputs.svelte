<script>
    import String from "../isa/generic/String.svelte";

    let investigation;
    export {investigation as value};
</script>

<String bind:value={investigation.license} attr="License" />
<String bind:value={investigation.miappeVersion} attr="MIAPPE version" />