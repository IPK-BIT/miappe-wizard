<script>
  import Gitlab from '../gitlab/Gitlab.svelte';

    import { gitlab_response } from "@/stores/gitlab-api";
    import Investigation from "./Investigation.svelte";

</script>

<Investigation />

{#if $gitlab_response.access_token}
<Gitlab/>
{/if}