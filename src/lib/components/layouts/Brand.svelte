<script lang="ts">
	// IMPORTED ASSETS
	import elitesLogoPNG from '$lib/assets/logos/elites-logo.png';
	// IMPORTED DEP-COMPONENTS
	import { Tooltip } from 'svelte-ux';
</script>

<Tooltip title="Click to go to Home Page">
	<a class="flex-start-center gap-1 lg:gap-2" href="/">
		<img class="w-12" src={elitesLogoPNG} alt="Elites Logo" />
		<strong class="text-lg text-primary lg:text-xl">ELITES</strong>
		<span class="rounded-sm bg-primary px-2 py-[1px] text-xs text-white lg:py-0 lg:text-sm">Workspace</span>
	</a>
</Tooltip>
