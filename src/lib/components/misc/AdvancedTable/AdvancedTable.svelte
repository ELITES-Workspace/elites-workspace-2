<script lang="ts">
	// IMPORTED TYPES
	import type { Column, FilterGroup, RowItem, RowTool, TableTool } from './types';
	// IMPORTED DEP-MODULES
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	// IMPORTED COMPONENTS
	import Table from './Table.svelte';
	import Toolbar from './Toolbar.svelte';

	// -- REQUIRED PROPS -- //

	export let key: string;
	export let columns: Column[];
	export let rowItems: RowItem[];
	export let loading: boolean;
	export let refreshCallback: () => Promise<void>;

	// -- OPTIONAL PROPS -- //

	export let version: number = 1.1;
	export let search: string = '';
	export let limit: number = 25;
	export let initializing: boolean = false;
	export let filterGroups: FilterGroup[] = [];
	export let tableTools: TableTool[] = [];
	export let moreTools: RowTool[] = [];

	// -- STORES -- //

	const finalItems = writable<RowItem[]>([]);

	// -- STATES -- //

	let loaded = false;
	let reloading = false;

	// -- REACTIVITIES -- //

	$: columns = columns.map((column) => {
		if (typeof column.visible !== 'boolean') column.visible = true;
		if (typeof column.sorting !== 'string') column.sorting = 'none';
		if (typeof column.disableSorting !== 'boolean') column.disableSorting = false;
		return column;
	});

	$: if (loaded) {
		search;
		limit;
		columns;
		filterGroups;
		saveData();
	}

	// -- UTILS -- //

	function saveData() {
		if (typeof localStorage === 'undefined' || !loaded) return;

		if (!reloading) localStorage.setItem(key, JSON.stringify({ version, search, limit, columns, filterGroups }));
	}

	function loadData() {
		try {
			if (typeof localStorage === 'undefined' || loaded) throw new Error();

			const data = localStorage.getItem(key);

			if (!data) return;

			const config = JSON.parse(data);

			if (config && config.version !== version) {
				reloading = true;
				localStorage.clear();
				location.reload();
				return;
			}

			search = config.search;

			limit = config.limit;

			columns = columns.map((column) => {
				for (let _column of config.columns as Column[]) {
					if (_column.label !== column.label) continue;
					column = _column;
					break;
				}
				return column;
			});

			filterGroups = filterGroups.map((filterGroup) => {
				for (let _filterGroup of config.filterGroups as FilterGroup[]) {
					if (_filterGroup.label !== filterGroup.label) continue;
					filterGroup = _filterGroup;
					break;
				}
				return filterGroup;
			});
		} catch {
		} finally {
			loaded = true;
		}
	}

	// -- LIFECYCLES -- //

	onMount(loadData);
</script>

<div class="flex flex-col gap-4 pt-0">
	<Toolbar bind:search bind:columns bind:filterGroups {tableTools} {moreTools} {initializing} {loading} {refreshCallback} />

	<Table bind:search bind:limit bind:columns bind:filterGroups {rowItems} {finalItems} {initializing} />
</div>
