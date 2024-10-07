<script lang="ts">
	// IMPORTED CONSTANTS
	import { TABLE_LIMIT_OPTIONS } from '$lib/constants';
	// IMPORTED DEP-MODULES
	import { onMount } from 'svelte';
	// IMPORTED DEP-COMPONENTS
	import { SelectField, Button } from 'svelte-ux';

	// -- REQUIRED PROPS -- //

	export let limit: number;
	export let page: number;
	export let start: number;
	export let end: number;
	export let sortedLength: number;
	export let finalItemsLength: number;

	// -- STATES -- //

	let mounted = false;

	// -- UTILS -- //

	const next = () => page++;

	const prev = () => page--;

	// -- LIFECYLCES -- //

	onMount(() => {
		mounted = true;
		return () => (mounted = false);
	});
</script>

<!-- PLACEHOLDER -->
<div class="h-[86px]"></div>

<!-- TABLE FOOTER -->
<div class="absolute bottom-0 flex h-[86px] w-full flex-col items-stretch gap-4 bg-surface-100 p-4 text-xs sm:flex-row">
	<div class="flex items-center gap-4">
		{#if mounted}
			<!-- LIMIT -->
			<SelectField label="Items per page:" options={TABLE_LIMIT_OPTIONS} clearable={false} bind:value={limit} />
		{/if}
	</div>

	<div class="hidden border-r sm:block" />

	<div class="flex w-full items-center gap-4">
		<!-- HINT -->
		<p class="flex flex-grow items-center">
			{finalItemsLength ? start + 1 : 0}-{finalItemsLength < end ? start + finalItemsLength : end} of
			{sortedLength}
			items
		</p>

		<!-- PAGINATION -->
		<div class="flex gap-4">
			<!-- PREV -->
			<Button classes={{ root: 'w-[54px] h-[54]' }} variant="fill-light" size="lg" disabled={page === 0} on:click={prev}>
				<i class="ph-bold ph-caret-left" />
			</Button>

			<!-- NEXT -->
			<Button
				classes={{ root: 'w-[54px] h-[54px]' }}
				variant="fill-light"
				size="lg"
				disabled={end >= sortedLength}
				on:click={next}
			>
				<i class="ph-bold ph-caret-right" />
			</Button>
		</div>
	</div>
</div>
