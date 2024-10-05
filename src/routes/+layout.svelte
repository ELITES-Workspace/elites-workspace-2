<script lang="ts">
	// IMPORTED MODULES
	import { headerHeight } from '$lib/components/layouts/Header.svelte';
	// IMPORTED COMPONENTS
	import { Footer, Header, NProgressWrapper } from '$lib/components';
	// IMPORTED STYLES
	import '$lib/styles/index.css';
</script>

<Header />

<main class="prose-zinc fixed inset-0 min-h-screen min-w-[365px] overflow-x-auto dark:prose-invert" style="padding-top: {$headerHeight}px">
	<div class="bg-pattern-light dark:bg-pattern-dark min-h-full">
		<div class="container mx-auto flex flex-col gap-4 p-4">
			<slot />

			<Footer />
		</div>
	</div>
</main>

<!-- WRAPPERS -->
<NProgressWrapper />
