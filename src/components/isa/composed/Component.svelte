<script lang="ts">
	import OntologyAnnotation from '$components/isa/singleton/OntologyAnnotation.svelte';
	import String from '$components/isa/singleton/String.svelte';

	let {
		label = 'Protocol Component',
		attr,
		explanation = '',
		value: component = $bindable(),
		showLabel = true,
		onRemove
	} = $props();
</script>

<div
	class="rounded-lg border bg-base-200 p-4"
	style="border-color: color-mix(in oklab, var(--color-base-content) 20%, #0000);"
>
	<String
		label="Component Name"
		attr="name"
		explanation="The name of the component, e.g. 'temperature', 'duration', etc.'"
		bind:value={component.name}
		showLabel={true}
	/>

	<OntologyAnnotation
		label="Component Type"
		attr="componentType"
		explanation="The type of the component, e.g. 'temperature', 'duration', etc."
		bind:value={component.componentType}
		showLabel={true}
		{onRemove}
	/>
</div>
