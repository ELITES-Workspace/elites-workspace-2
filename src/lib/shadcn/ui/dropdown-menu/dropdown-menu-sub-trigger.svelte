<script lang="ts">
	import { cn } from '$lib/utils';
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

	type $$Props = DropdownMenuPrimitive.SubTriggerProps & {
		inset?: boolean;
		iconType?: 'hover' | 'click';
	};
	type $$Events = DropdownMenuPrimitive.SubTriggerEvents;

	let className: $$Props['class'] = undefined;
	export let inset: $$Props['inset'] = undefined;
	export let iconType: $$Props['iconType'] = 'hover';
	export { className as class };
</script>

<DropdownMenuPrimitive.SubTrigger
	class={cn(
		'flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-accent data-[state=open]:bg-accent',
		'flex-start-center gap-2',
		inset && 'pl-8',
		className,
	)}
	{...$$restProps}
	on:click
	on:keydown
	on:focusin
	on:focusout
	on:pointerleave
	on:pointermove
>
	<slot />
	<i class="ph {iconType === 'hover' ? 'ph-caret-right' : 'ph-dots-three'} ml-auto" />
</DropdownMenuPrimitive.SubTrigger>
