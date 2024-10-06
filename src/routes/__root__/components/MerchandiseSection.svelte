<script lang="ts">
	// IMPORTED ASSETS
	import thinkingFaceBroPNG from '$lib/assets/storysets/Thinking face-bro.png';
	import choiceBroPNG from '$lib/assets/storysets/Choice-bro.png';
	// IMPORTED DEP-MODULES
	import Swiper from 'swiper';
	import { Pagination } from 'swiper/modules';
	import { onMount } from 'svelte';
	// IMPORTED MODULES
	import { isSMDown, isMD, isMDDown, isLG } from '$lib/stores';
	// IMPORTED DEP-COMPONENTS
	import { Tooltip, Gooey } from 'svelte-ux';
	// IMPORTED COMPONENTS
	import { Heading } from '$lib/components';
	// IMPORTED STYLES
	import 'swiper/css/bundle';

	// -- STATES -- //

	let swiper: Swiper;

	let slideHeight = 0;

	let items = [
		{
			name: 'ELITES Shirt',
			note: 'for Members',
			seller: 'ELITES Organization',
			thumbnail: '/images/merch/TNEBLACKmember.png',
			logo: '/images/logos/elites-logo.png',
			price: '450.00',
			sold: 0,
		},
		{
			name: 'ELITES Lanyard',
			note: 'for Members',
			seller: 'ELITES Organization',
			thumbnail: '/images/merch/LANYARDmember.png',
			logo: '/images/logos/elites-logo.png',
			price: '120.00',
			sold: 0,
		},
		{
			name: 'ELITES Shirt',
			note: 'for Non-members',
			seller: 'ELITES Organization',
			thumbnail: '/images/merch/TNEBLACKnonmember.png',
			logo: '/images/logos/elites-logo.png',
			price: '520.00',
			sold: 0,
		},
		{
			name: 'ELITES Lanyard',
			note: 'for Non-members',
			seller: 'ELITES Organization',
			thumbnail: '/images/merch/LANYARDnonmember.png',
			logo: '/images/logos/elites-logo.png',
			price: '150.00',
			sold: 0,
		},
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
	<Heading icon="ph-fill ph-shopping-cart" title="Merchandise" />

	<div class="relative">
		<div id="swiper-merchandise" class="swiper">
			<!-- SLIDER -->
			<div class="swiper-wrapper">
				{#each items as item, i (i)}
					{#if item}
						<a
							class="swiper-slide flex flex-col overflow-hidden rounded-md border bg-surface-100 shadow-sm hover:bg-accent"
							href="/"
							bind:clientHeight={slideHeight}
						>
							<!-- IMAGE -->
							<div
								class="group relative aspect-square w-full border-b bg-gray-50 bg-cover bg-center dark:bg-gray-950"
								style="background-image: url('{item.thumbnail}')"
							>
								<div
									class="absolute left-0 top-0 h-[50%] w-full bg-gradient-to-b from-primary to-transparent opacity-35 transition-opacity group-hover:opacity-0"
								/>
								<div class="absolute left-0 top-0 z-10 p-2 transition-opacity group-hover:opacity-0">
									<img
										class="mr-1 inline aspect-square h-fit w-[15%] rounded-full"
										src={item.logo}
										alt={item.name}
									/>
								</div>
							</div>
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
					{:else if !$isMDDown}
						<div
							class="swiper-slide relative flex items-stretch rounded-md border bg-surface-100 bg-contain bg-center bg-no-repeat p-4 opacity-75 shadow-sm grayscale"
							style="
                                min-height: {slideHeight}px;
                                background-image: url('{i === 2 ? thinkingFaceBroPNG : choiceBroPNG}');
                            "
						>
							<Tooltip title="Coming soon..." autoPlacement>
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
