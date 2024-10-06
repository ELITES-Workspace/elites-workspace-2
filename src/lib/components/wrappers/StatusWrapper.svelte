<script lang="ts">
	// IMPORTED ASSETS
	import tinyHouseBroPNG from '$lib/assets/storysets/Tiny house-bro.png';
	// IMPORTED TYPES
	import type { Notice } from '$lib/types';
	// IMPORTED DEP-MODULES
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	// IMPORTED MODULES
	import { isSMUp, windowWidth } from '$lib/stores';
	// IMPORTED DEP-COMPONENTS
	import { Toaster, type ToastPosition } from 'svelte-french-toast';

	// -- STATES -- //

	let isMounted = false;

	// -- REACTIVE STATES -- //

	$: noticeRaw = $page.url.searchParams.get('notice');

	$: toastPosition = ($isSMUp ? 'bottom-right' : 'top-center') as ToastPosition;

	// -- REACTIVE STATEMENTS -- //

	$: if (noticeRaw && isMounted) handleNotice(noticeRaw);

	// -- FUNCTIONS -- //

	const handleOffline = () => toast.error('Your device is offline!');

	const handleOnline = () => toast.success('Your connection was restored!');

	function handleResize() {
		if (typeof window === 'undefined') return;

		windowWidth.set(window.innerWidth);
	}

	function handleNotice(raw: string) {
		const notice = JSON.parse(raw) as Notice;
		const noticesRaw = sessionStorage.getItem('notices') || '[]';

		let notices = JSON.parse(noticesRaw) as Notice[];

		if (notices.some(({ id }) => id === notice.id)) return;

		notices.unshift(notice);
		notices = notices.slice(0, 9);

		toast.error(notice.message);

		sessionStorage.setItem('notices', JSON.stringify(notices));
	}

	function scanCompatibility() {
		try {
			if (typeof sessionStorage === 'undefined') throw new Error('Compatibility issue with Local Storage!');
		} catch (error: any) {
			toast.error(error.message);
		}
	}

	// -- LIFECYCLES --//

	onMount(() => {
		scanCompatibility();
		handleResize();

		// FINISH LOADING STATE
		document.body.classList.remove('pointer-events-none');
		document.body.classList.remove('blur-lg');

		isMounted = true;
		return () => (isMounted = false);
	});
</script>

<svelte:window on:resize={handleResize} on:offline={handleOffline} on:online={handleOnline} />

{#if isMounted && $windowWidth < 340}
	<div class="flex-center pointer-events-none fixed inset-0 z-[1000] bg-surface-100">
		<div class="flex flex-col gap-2 p-4">
			<img src={tinyHouseBroPNG} alt="Tiny House" />
			<small class="text-center"
				>This device is incompatible because the screen width is too small to render properly.</small
			>
		</div>
	</div>
{/if}

<!-- TOAST WRAPPER -->
<Toaster position={toastPosition} toastOptions={{ duration: 2500 }} />
