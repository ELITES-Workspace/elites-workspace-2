<script lang="ts">
	// IMPORTED MODULES
	import { headerHeight } from '$lib/components/layouts/Header.svelte';
	// IMPORTED COMPONENTS
	import { Footer, Header, NProgressWrapper, StatusWrapper } from '$lib/components';
	// IMPORTED STYLES
	import '$lib/styles/index.css';
</script>

<Header />

<main class="prose-zinc fixed inset-0 min-h-full min-w-[365px] overflow-x-auto dark:prose-invert" style="padding-top: {$headerHeight}px">
	<div class="bg-pattern-light dark:bg-pattern-dark flex min-h-full flex-col">
		<div class="container mx-auto flex flex-col gap-4 px-4 pb-10 pt-4">
			<slot />
		</div>

		<Footer />
	</div>
</main>

<!-- WRAPPERS -->
<StatusWrapper />
<NProgressWrapper />
