<script lang="ts">
	let {
		templates,
		heading = 'Add new',
		emptyMessage = 'No templates available',
		onSelect
	}: {
		templates: any[];
		heading?: string;
		emptyMessage?: string;
		onSelect: (template: any) => void;
	} = $props();
</script>

{#if templates.length === 0}
	<p class="text-sm text-base-content/75 italic">{emptyMessage}</p>
{:else}
	<h2 class="mb-2 font-semibold">{heading}</h2>
	<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
		{#each templates as template (template.metadata.code)}
			<button
				type="button"
				class="card-compact card border border-base-300 bg-base-100 text-left transition-all hover:border-primary hover:shadow-md focus:ring-2 focus:ring-primary/50 focus:outline-none"
				onclick={() => onSelect(template)}
			>
				<div class="card-body">
					<h3 class="card-title text-base">{template.metadata.label}</h3>
					{#if template.metadata.description}
						<p class="text-sm text-base-content/75">{template.metadata.description}</p>
					{/if}
					{#if template.metadata.code}
						<span class="mt-1 badge badge-ghost badge-sm">{template.metadata.code}</span>
					{/if}
				</div>
			</button>
		{/each}
	</div>
{/if}
