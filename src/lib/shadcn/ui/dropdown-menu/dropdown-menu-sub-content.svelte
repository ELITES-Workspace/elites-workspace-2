<script lang="ts">
	import { cn, flyAndScale } from '$lib/utils';
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

	type $$Props = DropdownMenuPrimitive.SubContentProps;
	type $$Events = DropdownMenuPrimitive.SubContentEvents;

	let className: $$Props['class'] = undefined;
	export let transition: $$Props['transition'] = flyAndScale;
	export let transitionConfig: $$Props['transitionConfig'] = {
		x: -10,
		y: 0,
	};
	export { className as class };
</script>

<DropdownMenuPrimitive.SubContent
	{transition}
	{transitionConfig}
	class={cn(
		'text-popover-foreground z-50 min-w-[8rem] rounded-md border bg-surface-100 p-1 shadow-lg focus:outline-none',
		className,
	)}
	{...$$restProps}
	on:keydown
	on:focusout
	on:pointermove
>
	<slot />
</DropdownMenuPrimitive.SubContent>
