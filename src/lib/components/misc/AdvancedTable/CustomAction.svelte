<script lang="ts">
	// IMPORTED TYPES
	import type { TableTool } from './types';
	// IMPORTED DEP-COMPONENTS
	import { DropdownMenu } from '$lib/shadcn';
	import { Tooltip } from 'svelte-ux';

	// -- REQUIRED PROPS --//

	export let tableTool: TableTool;
	export let loading: boolean;
	export let initializing: boolean;
</script>

<Tooltip title={tableTool.label}>
	{#if tableTool.onClick}
		<button class="d-btn d-btn-circle shadow-sm" disabled={loading || initializing} on:click={tableTool.onClick}>
			<i class={tableTool.icon} />
		</button>
	{:else if tableTool.href}
		<a class="d-btn d-btn-circle shadow-sm" href={tableTool.href}>
			<i class={tableTool.icon} />
		</a>
	{:else if tableTool.items && tableTool.items.length}
		<DropdownMenu.Root>
			<!-- TRIGGER -->
			<DropdownMenu.Trigger class="d-btn d-btn-circle" disabled={initializing}>
				<i class={tableTool.icon} />
			</DropdownMenu.Trigger>

			<!-- CONTENT -->
			<DropdownMenu.Content class="min-w-[200px]">
				<DropdownMenu.Label class="text-center">More Tools</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Group class="max-h-[50vh] overflow-y-auto overflow-x-hidden">
					{#each tableTool.items as item}
						<a href={item.href}>
							<DropdownMenu.Item disabled={item.disabled} on:click={() => item.onClick && item.onClick()}>
								<i class={item.icon} />
								{item.label}
							</DropdownMenu.Item>
						</a>
					{/each}
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	{/if}
</Tooltip>
