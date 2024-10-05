<script lang="ts">
	// IMPORTED DEP-COMPONENTS
	import { SimpleCounter } from 'svelte-simple-counter';
	// IMPORTED COMPONENTS
	import { Heading } from '$lib/components';

	// -- STATES -- //

	let registered = 0;
	let preOrdered = 0;
	let loading = true;
</script>

<section class="flex flex-col gap-4">
	<Heading icon="ph-fill ph-chart-line" title="Stats" />

	<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
		<!-- MEMBERSHIP -->
		<div class="bg-secondary-glass w-full rounded-md border p-4 shadow-sm">
			<p class="flex-center mb-2 gap-2 text-center">
				<i class="ph-bold ph-handshake"></i>
				Membership
			</p>
			<div class="flex">
				<div class="flex-center relative min-w-[120px] rounded-l-md border bg-surface-100 p-4">
					<strong class="whitespace-nowrap text-sm">Registered</strong>
				</div>
				<div class="flex-start-center relative w-full rounded-r-md border border-l-0 bg-yellow-50/75 dark:bg-yellow-700/50">
					<div
						class="h-[56px] min-w-[56px] max-w-[100%] rounded-r-full bg-yellow-400 transition-[width] duration-1000 ease-in-out"
						style="width: calc({registered / 10}% + 56px); transition-delay: 200ms"
					/>
					<div class="flex-center relative ml-[-56px] h-[56px] w-[56px] rounded-full bg-yellow-600 text-white ring-[8px] ring-yellow-300 ring-opacity-50">
						<p class="text-sm font-semibold">
							{#if loading}
								...
							{:else}
								<SimpleCounter value={registered} transitionDuration={1000} transitionTiming="ease-in-out" prefersCSS={true} />
							{/if}
						</p>
					</div>
					<p class="absolute right-[8px] text-xs text-yellow-400">1000</p>
				</div>
			</div>
		</div>

		<!-- MERCHANDISE -->
		<div class="bg-secondary-glass w-full rounded-md border p-4 shadow-sm">
			<p class="flex-center mb-2 gap-2 text-center">
				<i class="ph-bold ph-storefront"></i>
				Merchandise
			</p>
			<div class="flex">
				<div class="flex-center relative min-w-[120px] whitespace-nowrap rounded-l-md border bg-surface-100 p-4">
					<strong class="text-sm">Pre-ordered</strong>
				</div>
				<div class="flex-start-center relative w-full rounded-r-md border border-l-0 bg-yellow-50/75 dark:bg-yellow-700/50">
					<div
						class="h-[56px] min-w-[56px] max-w-[100%] rounded-r-full bg-yellow-400 transition-[width] duration-1000 ease-in-out"
						style="width: calc({preOrdered / 10}% + 56px); transition-delay: 200ms"
					/>
					<div class="flex-center relative ml-[-56px] h-[56px] w-[56px] rounded-full bg-yellow-600 text-white ring-[8px] ring-yellow-300 ring-opacity-50">
						<p class="text-sm font-semibold">
							{#if loading}
								...
							{:else}
								<SimpleCounter value={preOrdered} transitionDuration={1000} transitionTiming="ease-in-out" prefersCSS={true} />
							{/if}
						</p>
					</div>
					<p class="absolute right-[8px] text-xs text-yellow-400">1000</p>
				</div>
			</div>
		</div>
	</div>
</section>
