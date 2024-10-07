<script lang="ts">
	// IMPORTED DEP-MODULES
	import { navigating } from '$app/stores';
	// IMPORTED MODULES
	import { headerHeight } from '$lib/components/layouts/Header.svelte';
	import { initializeAuth } from '$lib/stores/auth';
	// IMPORTED COMPONENTS
	import { DialogWrapper, Footer, Header, NProgressWrapper, StatusWrapper } from '$lib/components';
	// IMPORTED STYLES
	import '$lib/styles/index.css';

	// -- PROPS -- //

	export let data;

	if (data.user) initializeAuth(data.user);

	// -- REFS -- //

	let mainEl: HTMLElement | null = null;

	// -- REACTIVE STATEMENTS -- //

	$: if ($navigating && mainEl) mainEl.scrollTo(0, 0);
</script>

<Header />

<main
	class="prose-zinc fixed inset-0 min-h-full overflow-auto dark:prose-invert"
	style="padding-top: {$headerHeight}px"
	bind:this={mainEl}
>
	<div class="bg-pattern-light dark:bg-pattern-dark flex min-h-full flex-col">
		<div class="container mx-auto flex flex-col gap-10 px-4 pb-8 pt-4 md:pb-10 md:pt-8">
			<slot />
		</div>

		<Footer />
	</div>
</main>

<!-- WRAPPERS -->
<StatusWrapper />
<NProgressWrapper />
<DialogWrapper />
