<script lang="ts">
	// IMPORTED DEP-TYPES
	import type { Writable } from 'svelte/store';
	// IMPORTED TYPES
	import type { SelectionAction, Selections } from './types';
	// IMPORTED DEP-COMPONENTS
	import { Checkbox } from 'svelte-ux';

	// -- REQUIRED PROPS -- //

	export let loading: boolean;
	export let initializing: boolean;
	export let selectionActions: SelectionAction[];
	export let selections: Writable<Selections>;
	export let shouldSelectAll: Writable<boolean>;

	// -- UTILS -- //

	const selectAll = () =>
		selections.update((selections) => {
			Object.keys(selections).forEach((key) => (selections[key as any] = true));
			return selections;
		});

	const unselectAll = () =>
		selections.update((selections) => {
			Object.keys(selections).forEach((key) => (selections[key as any] = false));
			return selections;
		});

	function toggleSelection() {
		if ($shouldSelectAll) return selectAll();
		else unselectAll();
	}
</script>

{#if selectionActions.length}
	<td class="sticky left-0 z-10 w-fit p-0">
		<div
			class="flex-center h-[55px] w-[55px] border-r border-red-950/25 bg-red-900 text-white"
			on:click={() => setTimeout(toggleSelection)}
		>
			<Checkbox
				classes={{
					checkbox: 'hover:!border-white !border-2 !border-border cursor-pointer',
				}}
				size="md"
				disabled={loading || initializing}
				bind:checked={$shouldSelectAll}
			/>
		</div>
	</td>
{/if}
