<script>
export let protocol;

import String from "../generic/String.svelte";
import Textarea from "../generic/Textarea.svelte";
import ProtocolParameters from "./ProtocolParameters.svelte";
import Comments from "../generic/Comments.svelte";

</script>

<section>
    <h4>Protocol</h4>

    <String bind:value={protocol.name} attr="name" label="Protocol Name" />
    <String bind:value={protocol.protocolType.annotationValue} attr="uri" label="Protocol Type" />
    <Textarea bind:value={protocol.description} attr="description" label="Protocol Description" />
    <String bind:value={protocol.version} attr="version" label="Protocol Version" />
    <String bind:value={protocol.uri} attr="uri" label="Protocol URI" />

    <Comments bind:value={protocol.comments} />

    <ProtocolParameters bind:value={protocol.parameters} />
    
</section>

<style>

</style>