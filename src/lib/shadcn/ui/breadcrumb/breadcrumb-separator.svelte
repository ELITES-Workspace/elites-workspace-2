<script lang="ts">
	import type { HTMLLiAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type $$Props = HTMLLiAttributes & {
		el?: HTMLLIElement;
	};

	export let el: $$Props['el'] = undefined;
	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<li role="presentation" aria-hidden="true" class={cn('[&>svg]:size-3.5', className)} bind:this={el} {...$$restProps}>
	<slot>
		<i class="ph-bold ph-caret-right text-xs"></i>
	</slot>
</li>
