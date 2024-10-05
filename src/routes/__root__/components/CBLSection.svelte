<script lang="ts">
	// IMPORTED DEP-COMPONENTS
	import { Tooltip } from 'svelte-ux';
	// IMPORTED COMPONENTS
	import { Heading } from '$lib/components';
</script>

<section class="flex flex-col gap-4">
	<Heading icon="ph-fill ph-gavel" title="CBL" />

	<div class="flex-center bg-primary-secondary-gradient-glass rounded-md border border-dashed p-4 shadow-sm md:p-6">
		<div class="flex-start-center w-fit overflow-hidden rounded-sm border bg-surface-100 shadow-sm">
			<small class="overflow-hidden text-ellipsis whitespace-nowrap px-4">ELITES - Constitution and By-Laws (2024-2025).pdf</small>

			<!-- DOWNLOAD -->
			<Tooltip title="Download">
				<a
					class="flex-center aspect-square min-w-10 max-w-10 border-l bg-zinc-800 text-white hover:bg-zinc-800/80"
					href="/pdfs/ELITES - Constitution and By-Laws (2024-2025).pdf"
					download
				>
					<i class="ph-bold ph-download-simple mr-[1px] text-lg"></i>
				</a>
			</Tooltip>
		</div>
	</div>
</section>
