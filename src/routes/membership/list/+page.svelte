<script lang="ts">
	// IMPORTED TYPES
	import type { Column, ColumnItem, FilterGroup, RowItem, RowTool, TableTool } from '$lib/components/misc/AdvancedTable';
	import type { Membership } from '$lib/types';
	// IMPORTED CONSTANTS
	import { createConfirmationDialog, MEMBERSHIP_STATUS } from '$lib/stores';
	// IMPORTED DEP-MODULES
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	// IMPORTED MODULES
	import { confirmMembership, listMemberships, undoMembership } from '$lib/db';
	import { formatFullName } from '$lib/utils';
	// IMPORTED COMPONENTS
	import { AdvancedTable, Heading } from '$lib/components';

	// -- STATES -- //

	let items: Membership[] = [];
	let initializing = true;
	let loading = false;
	let initialized = false;

	// -- TABLE STATES -- //

	let columns: Column[] = [
		{ label: 'Status' },
		{ label: 'Student Number' },
		{ label: 'Full Name' },
		{ label: 'Program' },
		{ label: 'Year' },
		{ label: 'Section' },
		{ label: 'Contact Number' },
		{ label: 'Email Address' },
		{ label: 'Confirmed At' },
		{ label: 'Created At' },
	];

	let filterGroups: FilterGroup[] = [
		{
			label: 'Status',
			items: [
				{ label: 'All', match: '', active: true },
				{ label: 'Registered', match: MEMBERSHIP_STATUS.REGISTERED, active: false },
				{ label: 'Pending', match: MEMBERSHIP_STATUS.PENDING, active: false },
			],
		},
		{
			label: 'Program',
			items: [
				{ label: 'All', match: '', active: true },
				{ label: 'BSIT', match: 'BSIT', active: false },
				{ label: 'BIT', match: 'BIT', active: false },
				{ label: 'BSDS', match: 'BSDS', active: false },
			],
		},
		{
			label: 'Year',
			items: [
				{ label: 'All', match: '', active: true },
				{ label: '1st', match: '1st', active: false },
				{ label: '2nd', match: '2nd', active: false },
				{ label: '3rd', match: '3rd', active: false },
				{ label: '4th', match: '4th', active: false },
			],
		},
		{
			label: 'Section',
			items: [
				{ label: 'All', match: '', active: true },
				{ label: 'A', match: 'A', active: false },
				{ label: 'B', match: 'B', active: false },
				{ label: 'C', match: 'C', active: false },
				{ label: 'D', match: 'D', active: false },
				{ label: 'E', match: 'E', active: false },
			],
		},
	];

	$: rowItems = items.map((item) => {
		const columnItems: ColumnItem[] = [
			{
				label: 'Status',
				value: item.isConfirmed ? MEMBERSHIP_STATUS.REGISTERED : MEMBERSHIP_STATUS.PENDING,
				status: item.isConfirmed ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white',
				isStatusBadge: true,
			},
			{ label: 'Student Number', value: item.studentNumber, isID: true },
			{ label: 'Full Name', value: formatFullName(item), isPerson: true },
			{ label: 'Program', value: item.program },
			{ label: 'Year', value: item.year },
			{ label: 'Section', value: item.section },
			{ label: 'Contact Number', value: item.contactNumber, isPhone: true },
			{ label: 'Email Address', value: item.emailAddress, isEmail: true },
			{ label: 'Confirmed At', value: item.isConfirmed ? item.confirmedAt : '', isDateTime: item.isConfirmed },
			{ label: 'Created At', value: item.createdAt, isDateTime: true },
		];

		const tools: RowTool[] = [
			{
				label: 'Confirm Registration',
				icon: 'ph-bold ph-check',
				hidden: item.isConfirmed,
				onClick: () =>
					createConfirmationDialog({
						description: `Are you sure you want to confirm the registration of (${formatFullName(item)})?`,
						callback: async () => {
							await toast.promise(
								(async () => {
									await confirmMembership(item.id);
									await refresh({ silent: true });
								})(),
								{
									loading: 'Confirming...',
									success: 'Confirmed successfully!',
									error: 'Failed to confirm!',
								},
							);
						},
					}),
			},
			{
				label: 'Undo Registration',
				icon: 'ph-bold ph-arrow-counter-clockwise',
				hidden: !item.isConfirmed,

				onClick: () =>
					createConfirmationDialog({
						description: `Are you sure you want to undo the registration of (${formatFullName(item)})?`,
						callback: async () => {
							await toast.promise(
								(async () => {
									await undoMembership(item.id);
									await refresh({ silent: true });
								})(),
								{
									loading: 'Undoing...',
									success: 'Undone successfully!',
									error: 'Failed to undo!',
								},
							);
						},
					}),
			},
		];

		const rowItem: RowItem = {
			id: item.id,
			columnItems,
			tools,
			onClick: () =>
				createConfirmationDialog({
					description: `Are you sure you want to ${item.isConfirmed ? 'undo' : 'confirm'} the registration of (${formatFullName(item)})?`,
					callback: async () => {
						await toast.promise(
							(async () => {
								if (item.isConfirmed) {
									await undoMembership(item.id);
								} else {
									await confirmMembership(item.id);
								}

								await refresh({ silent: true });
							})(),
							{
								loading: `${item.isConfirmed ? 'Undoing' : 'Confirming'}...`,
								success: `${item.isConfirmed ? 'Undone' : 'Confirmed'} successfully!`,
								error: `Failed to ${item.isConfirmed ? 'undo' : 'confirm'}!`,
							},
						);
					},
				}),
		};

		return rowItem;
	}) as RowItem[];

	const tableTools: TableTool[] = [];

	// -- UTILS -- //

	async function refresh({ silent } = { silent: false }) {
		try {
			loading = true;

			if (silent) {
				items = await listMemberships();
			} else {
				await toast.promise((async () => (items = await listMemberships()))(), {
					loading: 'Refreshing...',
					success: 'Refreshed successfully!',
					error: 'Failed to refresh!',
				});
			}
		} catch (e: any) {
			toast.error(e.message);
		} finally {
			loading = false;
		}
	}

	async function initialize() {
		try {
			await refresh({ silent: true });

			initializing = false;
		} finally {
			initialized = true;
		}
	}

	// -- LIFECYCLES -- //

	onMount(initialize);
</script>

<section class="flex flex-col gap-4">
	<Heading icon="ph-fill ph-users-four" title="Membership List" />

	<AdvancedTable
		key="membershipList"
		refreshCallback={refresh}
		bind:columns
		bind:filterGroups
		{loading}
		{initializing}
		{rowItems}
		{tableTools}
	/>
</section>
