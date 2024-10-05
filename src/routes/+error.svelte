<script lang="ts">
	// IMPORTED ASSETS
	import bugFixingBroPng from '$lib/assets/storysets/Bug fixing-bro.png';
	// IMPORTED DEP-MODULES
	import { page } from '$app/stores';
	// IMPORTED DEP-COMPONENTS
	import { Button } from 'svelte-ux';
</script>

<div class="flex flex-col items-center gap-4 p-6 text-center">
	<img class="bg-primary-glass w-full max-w-[500px] rounded-md border" src={bugFixingBroPng} alt={$page.error?.message} />

	<h1 class="text-2xl">{$page.error?.message}</h1>

	<!-- GO BACK -->
	<Button variant="fill" color="primary" href="/">Go back</Button>
</div>
