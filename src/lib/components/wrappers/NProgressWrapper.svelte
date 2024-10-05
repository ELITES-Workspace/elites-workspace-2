<script lang="ts">
	// IMPORTED DEP-MODULES
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import NProgress from 'nprogress';

	// -- LIFECYCLES -- //

	beforeNavigate(() => NProgress.start());

	afterNavigate(() => NProgress.done());
</script>
