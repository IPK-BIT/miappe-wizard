<script>
export let parameter;

import String from "../generic/String.svelte";
import Comments from "../generic/Comments.svelte";

</script>

<section>
    <h4>Protocol Parameter</h4>

    <String bind:value={parameter.parameterName.annotationValue} attr="name" label="Parameter Name" />

    <Comments bind:value={parameter.comments} />

</section>

<style>

</style>