<script lang="ts">
	// IMPORTED COMPONENTS
	import { Heading } from '$lib/components';
	import AccountInfoSection from './components/AccountInfoSection.svelte';
	import AvatarSection from './components/AvatarSection.svelte';
</script>

<section class="flex flex-col gap-4">
	<Heading icon="ph-fill ph-user-circle" title="Profile" />

	<div class="grid grid-cols-1 rounded-md border bg-surface-100 shadow-sm md:grid-cols-2">
		<AvatarSection />

		<AccountInfoSection />
	</div>
</section>
