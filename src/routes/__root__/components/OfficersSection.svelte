<script lang="ts">
	// IMPORTED ASSETS
	import officersPNG from '$lib/assets/images/officers.png';
	// IMPORTED COMPONENTS
	import { Heading } from '$lib/components';
</script>

<section class="flex flex-col gap-4">
	<Heading icon="ph-fill ph-identification-badge" title="Officers" />

	<img class="aspect-[752/279] rounded-md border bg-surface-200" src={officersPNG} alt="ELITES Officers (2024-2025)" />
</section>
