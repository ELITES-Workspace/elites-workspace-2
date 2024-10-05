<script lang="ts">
	// IMPORTED MODULES
	import { cn } from '$lib/utils';

	// -- REQUIRED PROPS -- //

	export let icon: string;
	export let title: string;
</script>

<div class="flex-start-center gap-3">
	<div class="flex-center bg-surface-base bg- aspect-square w-10 rounded-md border shadow-sm">
		<i class={cn('text-2xl', icon)}></i>
	</div>

	<p class="mt-1 font-['Ultimate_Gear'] text-xl md:text-3xl">{title}</p>
</div>
