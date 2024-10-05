<script lang="ts">
	// IMPORTED COMPONENTS
	import { Footer, Header, NProgressWrapper } from '$lib/components';
	// IMPORTED STYLES
	import '$lib/styles/index.css';
</script>

<div class="fix prose-zinc inset-0 min-h-screen min-w-[365px] overflow-x-auto dark:prose-invert">
	<Header />

	<div class="container mx-auto flex flex-col gap-4 p-4">
		<slot />

		<Footer />
	</div>
</div>

<!-- WRAPPERS -->
<NProgressWrapper />
