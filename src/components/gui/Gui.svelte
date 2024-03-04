<script>
  import Gitlab from '../gitlab/Gitlab.svelte';

    import { gitlab_repsonse } from "@/stores/gitlab-api";
    import Investigation from "./Investigation.svelte";

</script>

<Investigation />

{#if $gitlab_repsonse.access_token}
<Gitlab/>
{/if}