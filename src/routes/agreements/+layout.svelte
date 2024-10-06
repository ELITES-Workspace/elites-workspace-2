<script lang="ts">
	// IMPORTED DEP-MODULES
	import { navigating } from '$app/stores';

	// -- REACTIVE STATEMENTS -- //

	$: if ($navigating && document) document.querySelector('main')?.scrollTo(0, 0);
</script>

<slot />
