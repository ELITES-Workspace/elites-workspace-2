<script lang="ts">
	// IMPORTED ASSETS
	import choiceBroPNG from '$lib/assets/storysets/Choice-bro.png';
	import thinkingFaceBroPNG from '$lib/assets/storysets/Thinking face-bro.png';
	// IMPORTED DEP-MODULES
	import { onMount } from 'svelte';
	import Swiper from 'swiper';
	import { Pagination } from 'swiper/modules';
	// IMPORTED MODULES
	import { isLG, isLGUp, isLoggedIn, isMD, isMember, isSMDown, openCustomDialog } from '$lib/stores';
	import { cn } from '$lib/utils';
	// IMPORTED DEP-COMPONENTS
	import { Tooltip } from 'svelte-ux';
	// IMPORTED COMPONENTS
	import { Heading } from '$lib/components';
	// IMPORTED STYLES
	import 'swiper/css/bundle';

	// -- STATES -- //

	let swiper: Swiper;

	let slideHeight = 0;

	$: items = [
		...($isMember
			? [
					{
						name: 'ELITES Shirt',
						note: 'for Members',
						seller: 'ELITES Organization',
						thumbnail: '/images/merch/TNEBLACKmember.png',
						logo: '/images/logos/elites-logo.png',
						price: '450.00',
						sold: 0,
						isPreview: true,
					},
					{
						name: 'ELITES Lanyard',
						note: 'for Members',
						seller: 'ELITES Organization',
						thumbnail: '/images/merch/LANYARDmember.png',
						logo: '/images/logos/elites-logo.png',
						price: '120.00',
						sold: 0,
						isPreview: true,
					},
					...Array($isLG ? 1 : $isLGUp ? 2 : 0).fill(null),
				]
			: [
					{
						name: 'ELITES Shirt',
						note: 'for Non-members',
						seller: 'ELITES Organization',
						thumbnail: '/images/merch/TNEBLACKnonmember.png',
						logo: '/images/logos/elites-logo.png',
						price: '520.00',
						sold: 0,
						isPreview: true,
					},
					{
						name: 'ELITES Lanyard',
						note: 'for Non-members',
						seller: 'ELITES Organization',
						thumbnail: '/images/merch/LANYARDnonmember.png',
						logo: '/images/logos/elites-logo.png',
						price: '150.00',
						sold: 0,
						isPreview: true,
					},
					...Array($isLG ? 1 : $isLGUp ? 2 : 0).fill(null),
				]),
	];

	// -- REACTIVE STATES -- //

	$: slidesPerView = (() => {
		if ($isMD) return 2;
		if ($isLG) return 3;
		if ($isSMDown) return 1;
		return 4;
	})();

	// -- REACTIVE STATEMENTS -- //

	$: if (swiper) swiper.params.slidesPerView = slidesPerView;

	// LIFECYCLES
	onMount(() => {
		swiper = new Swiper('#swiper-merchandise', {
			modules: [Pagination],
			slidesPerView,
			spaceBetween: 16,
			pagination: {
				el: '.swiper-pagination',
				dynamicBullets: true,
				clickable: true,
			},
		});

		return () => swiper && swiper.destroy();
	});
</script>

<section class="flex flex-col gap-4">
	<Heading icon="ph-fill ph-shopping-cart" title="Merchandise" reflectHeadTitle={false} />

	<div class="relative">
		<div id="swiper-merchandise" class="swiper">
			<!-- SLIDER -->
			<div class="swiper-wrapper">
				{#each items as item, i (i)}
					{#if item}
						<a
							class={cn(
								'swiper-slide relative flex flex-col overflow-hidden rounded-md border bg-surface-100 shadow-sm',
								!item.isPreview && 'hover:bg-accent',
							)}
							href={!$isLoggedIn || item.isPreview ? undefined : '/merchandise'}
							on:click={$isLoggedIn ? undefined : () => openCustomDialog('login')}
							bind:clientHeight={slideHeight}
						>
							<!-- PREVIEW -->
							{#if item.isPreview}
								<div class="flex-center absolute inset-0 z-10 bg-black/50">
									<small class="font-['Ultimate_Gear'] text-sm text-white">Coming Soon!</small>
								</div>
							{/if}

							<!-- IMAGE -->
							<div
								class="group relative aspect-square w-full border-b bg-slate-50 bg-cover bg-center dark:bg-slate-950"
								style="background-image: url('{item.thumbnail}')"
							/>

							<!-- DETAILS -->
							<div class="flex flex-col gap-2 p-3">
								<span class="flex-start-center gap-2">
									<strong class="text-lg">{item.name}</strong>
									<small class="text-muted-foreground text-xs">({item.note})</small>
								</span>
								<p class="leading-none text-secondary">₱{item.price}</p>
								<div class="flex items-end justify-between">
									<small class="text-muted-foreground text-xs">{item.seller}</small>
									<small class="text-muted-foreground text-xs">{item.sold} sold</small>
								</div>
							</div>
						</a>
					{:else}
						<div
							class="swiper-slide relative flex items-stretch rounded-md border bg-surface-100 bg-contain bg-center bg-no-repeat p-4 opacity-50 shadow-sm grayscale"
							style="
                                min-height: {slideHeight}px;
                                background-image: url('{i === 2 ? thinkingFaceBroPNG : choiceBroPNG}');
                            "
						>
							<Tooltip title="Coming soon!" autoPlacement>
								<div class="absolute inset-0 cursor-help"></div>
							</Tooltip>
						</div>
					{/if}
				{/each}
			</div>

			<!-- PAGINATION -->
			<div class="swiper-pagination [&>.swiper-pagination-bullet]:dark:bg-white" />
		</div>
	</div>
</section>

<style lang="postcss">
	:global(#swiper-merchandise .swiper-pagination-bullet-active) {
		@apply bg-secondary;
	}
</style>
