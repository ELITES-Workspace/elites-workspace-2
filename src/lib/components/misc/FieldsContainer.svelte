<script lang="ts">
	// IMPORTED DEP-TYPES
	import type { HTMLBaseAttributes } from 'svelte/elements';

	// -- TYPES -- //

	type $$Props = HTMLBaseAttributes & {
		label?: string;
	};

	// -- OPTIONAL PROPS -- //

	export let label: string = '';

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<div class="rounded-sm border p-2 pt-0">
	{#if label}
		<small class="mb-2 truncate text-xs text-surface-content/50">
			{label}
		</small>
	{/if}

	<div class={className}>
		<slot />
	</div>
</div>
