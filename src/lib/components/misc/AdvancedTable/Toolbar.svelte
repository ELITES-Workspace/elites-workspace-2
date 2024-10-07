<script lang="ts">
	// IMPORTED ASSETS
	import MagnifyingGlassSVG from '$lib/assets/svgs/magnifying-glass.svg?raw';
	// IMPORTED TYPES
	import type { Column, FilterGroup, RowTool, TableTool } from './types';
	// IMPORTED MODULES
	import { sleep } from '$lib/utils';
	// IMPORTED DEP-COMPONENTS
	import { Button, TextField, Tooltip } from 'svelte-ux';
	// IMPORTED COMPONENTS
	import ColumnVisibility from './ColumnVisibility.svelte';
	import CustomAction from './CustomAction.svelte';
	import RowFilter from './RowFilter.svelte';

	// -- REQUIRED PROPS -- //

	export let search: string;
	export let columns: Column[];
	export let filterGroups: FilterGroup[] = [];
	export let tableTools: TableTool[] = [];
	export let moreTools: RowTool[] = [];
	export let loading: boolean;
	export let initializing: boolean;
	export let refreshCallback: () => Promise<void>;
</script>

<div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
	<!-- SEARCH -->
	{#await sleep(0)}
		<TextField
			classes={{ root: 'order-2 xl:order-1', container: 'px-4', input: 'mr-2' }}
			label="Filter"
			labelPlacement="float"
			placeholder="Filter items..."
			iconRight={MagnifyingGlassSVG}
			disabled={initializing}
		/>
	{:then _}
		<TextField
			classes={{ root: 'order-2 xl:order-1', container: 'px-4', input: 'mr-2' }}
			label="Filter"
			labelPlacement="float"
			placeholder="Filter items..."
			iconRight={MagnifyingGlassSVG}
			disabled={initializing}
			bind:value={search}
		/>
	{/await}

	<div class="flex-end-center order-1 gap-4 xl:order-2">
		<!-- REFRESH -->
		<Tooltip title="Refresh">
			<Button
				classes={{ root: 'w-[54px] h-[54px]' }}
				variant="fill-light"
				iconOnly
				disabled={loading || initializing}
				on:click={() => refreshCallback()}
			>
				<i class="ph-bold ph-arrow-clockwise text-lg" />
			</Button>
		</Tooltip>

		<span class="hidden flex-grow md:block" />

		<!-- TABLE TOOLS -->
		{#each tableTools as tableTool}
			{#if !tableTool.hidden}
				<CustomAction {tableTool} {loading} {initializing} />
			{/if}
		{/each}

		<!-- MORE TOOLS -->
		<CustomAction
			tableTool={{
				label: 'More Tools',
				icon: 'ph-bold ph-caret-down',
				items: moreTools.filter((tool) => !tool.hidden),
			}}
			{loading}
			{initializing}
		/>

		{#if filterGroups.length}
			<!-- FILTER -->
			<RowFilter bind:filterGroups {initializing} />
		{/if}

		<!-- COLUMN VISIBILITY -->
		<ColumnVisibility bind:columns {initializing} />
	</div>
</div>
