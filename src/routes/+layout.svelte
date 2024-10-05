<script lang="ts">
	// IMPORTED COMPONENTS
	import { Header, NProgressWrapper } from '$lib/components';
	// IMPORTED STYLES
	import '$lib/styles/index.css';
</script>

<div class="fix inset-0 min-h-screen">
	<Header />

	<div class="container mx-auto">
		<slot />
	</div>
</div>

<!-- WRAPPERS -->
<NProgressWrapper />
