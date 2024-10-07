<script lang="ts">
	// IMPORTED DEP-TYPES
	import type { Writable } from 'svelte/store';
	// IMPORTED TYPES
	import type { Column, FilterGroup, RowItem } from './types';
	// IMPORTED DEP-MODULES
	import { orderBy, type Order } from 'natural-orderby';
	// IMPORTED MODULES
	import {
		cn,
		formatDateDisplay,
		formatDateTimeDisplay,
		formatNumberWithCommaSeparator,
		formatTimeDisplay,
		PHDate,
	} from '$lib/utils';
	// IMPORTED DEP-COMPONENTS
	import { DropdownMenu } from '$lib/shadcn';
	import { Tooltip, Button } from 'svelte-ux';
	// IMPORTED COMPONENTS
	import TableFooter from './TableFooter.svelte';

	// -- REQUICYAN PROPS -- //

	export let limit: number;
	export let search: string;
	export let columns: Column[];
	export let rowItems: RowItem[];
	export let filterGroups: FilterGroup[];
	export let finalItems: Writable<RowItem[]>;
	export let initializing: boolean;

	// -- STATES --//

	let page = 0;

	let loading = false;

	// -- REACTIVE STATES -- //

	$: start = limit === 0 ? 0 : page * limit;

	$: end = limit === 0 ? rowItems.length : (page + 1) * limit;

	$: visibleColumns = columns.filter(({ visible }) => visible).map(({ label }) => label);

	$: filtered = (() => {
		if (!filterGroups.length) return rowItems;

		let result: RowItem[] = [...rowItems];

		filterGroups.forEach(({ label, items }) => {
			const shouldSelectAll = items.some((item) => !item.match && item.active);

			if (!shouldSelectAll) {
				result = result.filter(
					({ columnItems }) =>
						!columnItems.some(
							(columnItem) =>
								columnItem.label === label &&
								!items
									.map((item) => (item.active ? item.match.toLowerCase() : null))
									.includes((columnItem.value || '').toLowerCase()),
						),
				);
			}
		});

		return result;
	})();

	$: searched = (() => {
		if (!search) return filtered;

		const result: RowItem[] = [];

		for (let i = 0; i < filtered.length; i++) {
			const rowItem = filtered[i];
			const searchKey = rowItem.columnItems
				.map(({ value, isDateTime }) => (isDateTime ? formatDateTimeDisplay(new Date(value)) : value))
				.toString();

			if (searchKey.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1) {
				result.push(rowItem);
			}
		}

		return result;
	})();

	$: sorted = (() => {
		let result: RowItem[] = [...searched];

		if (!searched.length) return result;

		for (let i = 0; i < columns.length; i++) {
			const { sorting } = columns[i];

			if (sorting === 'none') continue;

			result = orderBy(result, [(v) => v.columnItems[i].value], [sorting as Order]);

			break;
		}

		return result;
	})();

	// -- REACTIVE STATEMENTS -- //

	$: finalItems.set(sorted.slice(start, end));

	$: {
		limit;
		search;
		page = 0;
	}
</script>

<div class="relative overflow-hidden rounded-md border bg-surface-100 shadow-sm">
	<div class="table-wrapper {initializing || !$finalItems.length ? 'overflow-hidden' : 'overflow-x-auto'}">
		<table>
			<thead class="bg-cyan-700 text-sm [&_*]:text-white">
				<tr class="[&>th]:p-4">
					<!-- NUMBERING -->
					<th class="font-semibold" style="width: calc(50%/{columns.length})">#</th>

					<!-- COLUMNS -->
					{#each columns as column}
						{#if column.visible}
							{@const toggleSort = () => {
								if (column.disableSorting) return;
								for (let _column of columns) if (column.label !== _column.label) _column.sorting = 'none';
								column.sorting = column.sorting === 'none' ? 'asc' : column.sorting === 'desc' ? 'asc' : 'desc';
							}}

							<th
								class={cn(
									'select-none whitespace-nowrap font-semibold',
									!column.disableSorting && 'cursor-pointer hover:bg-cyan-800/50',
								)}
								style="width: calc(100%/{columns.length})"
								on:click={toggleSort}
							>
								<div class="flex-start-center gap-2">
									{column.label}

									{#if column.sorting !== 'none'}
										<i
											class="ph-bold ph-arrow-{column.sorting === 'asc' ? 'up' : 'down'} text-sm opacity-50"
										/>
									{/if}
								</div>
							</th>
						{/if}
					{/each}

					<!-- TOOLS -->
					<td class="sticky right-0 w-fit bg-cyan-800 p-0 shadow">
						<div class="flex-center h-[55.5px] border-l border-cyan-800/25">
							<strong>Tools</strong>
						</div>
					</td>
				</tr>
			</thead>

			<tbody class="text-xs [&>tr:nth-child(even)]:bg-surface-200">
				<!-- DISPLAY DATA ROWS -->
				{#if $finalItems.length && !initializing}
					{#each $finalItems as rowItem, i}
						<tr
							class={cn('group bg-surface-100', rowItem.onClick && 'group cursor-pointer hover:!bg-surface-300')}
							on:click={rowItem.onClick}
						>
							<!-- NUMBERING -->
							<td>{start + i + 1}</td>

							<!-- COLUMNS -->
							{#each rowItem.columnItems as columnItem}
								{#if visibleColumns.includes(columnItem.label)}
									<td>
										<div
											class={cn(
												'flex-start-center max-w-[800px] gap-[6px] whitespace-nowrap [&_i]:text-lg',
												columnItem.classname,
											)}
										>
											{#if columnItem.isArchivedStatus}
												<i class="ph-bold ph-archive text-sm"></i>
											{/if}

											{#if columnItem.isStatusBadge}
												<!-- STATUS BADGE -->
												<span
													class="w-full min-w-[100px] rounded-sm px-4 py-1 text-center text-xs {columnItem.status}"
												>
													{columnItem.value}
												</span>
											{:else}
												{#if !!columnItem.value && columnItem.value !== 'N/A'}
													{#if columnItem.icon}
														<i class={columnItem.icon}></i>
													{:else if columnItem.isPhone}
														<i class="ph-bold ph-phone"></i>
													{:else if columnItem.isEmail}
														<i class="ph-bold ph-envelope"></i>
													{:else if columnItem.isLocation}
														<i class="ph-bold ph-map-pin"></i>
													{:else if columnItem.isPerson}
														<i class="ph-bold ph-user-circle"></i>
													{:else if columnItem.isUsername}
														<i class="ph-bold ph-identification-badge"></i>
													{:else if columnItem.isID}
														<i class="ph-bold ph-identification-card"></i>
													{:else if columnItem.isPrincipal}
														<i class="ph-bold ph-building-office"></i>
													{:else if columnItem.isDesignation}
														<i class="ph-bold ph-suitcase-simple"></i>
													{:else if columnItem.isEmployees}
														<i class="ph-bold ph-users-three"></i>
													{:else if columnItem.isDate || columnItem.isDateIconOnly || columnItem.isDateTime || columnItem.isDateTimeIconOnly}
														<i class="ph-bold ph-calendar"></i>
													{:else if columnItem.isTime || columnItem.isTimeIconOnly}
														<i class="ph-bold ph-clock"></i>
													{:else if columnItem.isMessage}
														<i class="ph-bold ph-chat-centered-text"></i>
													{:else if columnItem.isTag}
														<i class="ph-bold ph-tag"></i>
													{:else if columnItem.isStats}
														<i class="ph-bold ph-chart-line"></i>
													{:else if columnItem.isColor}
														<span
															class="h-4 w-4 rounded-sm"
															style="background-color: {columnItem.value}"
														></span>
													{/if}
												{/if}

												<p
													class={cn(
														'overflow-hidden text-ellipsis',
														columnItem.isArchivedStatus && 'text-cyan-700',
													)}
												>
													{#if columnItem.isDate && !!columnItem.value}
														{formatDateDisplay(new PHDate(columnItem.value))}
													{:else if columnItem.isTime && !!columnItem.value}
														{columnItem.value ? formatTimeDisplay(columnItem.value) : '-'}
													{:else if columnItem.isDateTime && !!columnItem.value}
														{formatDateTimeDisplay(new PHDate(columnItem.value))}
													{:else if columnItem.isCurrency && columnItem.value !== ''}
														₱
														{formatNumberWithCommaSeparator(columnItem.value || '') || '-'}
													{:else}
														{columnItem.value && columnItem.value !== 'N/A' ? columnItem.value : '-'}
													{/if}
												</p>
											{/if}
										</div>
									</td>
								{/if}
							{/each}

							<!-- TOOLS -->
							<td class="sticky right-0 bg-inherit !p-0" on:click|stopPropagation>
								<DropdownMenu.Root>
									<div class="flex-center border-border/50 h-[74px] border-l">
										<!-- TRIGGER -->
										<DropdownMenu.Trigger>
											<Button
												classes={{ root: 'w-[54px] h-[54px]' }}
												variant="fill-light"
												iconOnly
												disabled={loading}
											>
												<i class="ph-bold ph-dots-three text-base" />
											</Button>
										</DropdownMenu.Trigger>
									</div>

									<!-- CONTENT -->
									<DropdownMenu.Content>
										<DropdownMenu.Group>
											<DropdownMenu.Label class="text-center">Tools</DropdownMenu.Label>
											<DropdownMenu.Separator />
											{#if rowItem.tools.some((tool) => !tool.hidden)}
												{#each rowItem.tools as tool}
													{#if !tool.hidden}
														<a href={tool.href}>
															<DropdownMenu.Item
																disabled={tool.disabled}
																on:click={() => tool.onClick && tool.onClick()}
															>
																<i class={tool.icon} />
																{tool.label}
															</DropdownMenu.Item>
														</a>
													{/if}
												{/each}
											{:else}
												<DropdownMenu.Item disabled>
													<i class="ph-bold ph-x-circle" />
													No Action Available
												</DropdownMenu.Item>
											{/if}
										</DropdownMenu.Group>
									</DropdownMenu.Content>
								</DropdownMenu.Root>
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>

	<!-- NO RESULTS -->
	{#if !$finalItems.length && !initializing}
		<div class="flex-center h-[72px] w-full">
			<small>No results found.</small>
		</div>
	{/if}

	<!-- DIVIDER -->
	{#if !($finalItems.length === 1 && !initializing)}
		<hr class="border-border" />
	{/if}

	<TableFooter bind:page bind:limit {start} {end} sortedLength={sorted.length} finalItemsLength={$finalItems.length} />
</div>

<style lang="postcss">
	.table-wrapper::-webkit-scrollbar {
		@apply h-2;
	}
	table td,
	table th {
		@apply px-6;
	}
</style>
