<script>
    import String from "../isa/generic/String.svelte";
    import Select from "../isa/generic/Select.svelte";

    let investigation;
    export {investigation as value};
</script>

<String bind:value={investigation.license} attr="License" />
<!--<Select bind:value={investigation.miappeVersion} attr="MIAPPE version" />-->