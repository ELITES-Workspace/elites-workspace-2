<script lang="ts">
	// IMPORTED MODULES
	import { membership } from '$lib/stores';
	// IMPORTED COMPONENTS
	import { Heading } from '$lib/components';
	import RegisterView from './components/RegisterView.svelte';
	import SubmittedView from './components/SubmittedView.svelte';
</script>

<section class="flex flex-col gap-4">
	<Heading icon="ph-fill ph-handshake" title="Membership" />

	{#if !$membership}
		<RegisterView />
	{:else}
		<SubmittedView />
	{/if}
</section>
