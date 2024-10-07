<script lang="ts">
	// IMPORTED TYPES
	import type { Column } from './types';
	// IMPORTED DEP-COMPONENTS
	import { DropdownMenu } from '$lib/shadcn';
	import { Button, Switch, Tooltip } from 'svelte-ux';

	// -- REQUIRED PROPS -- //

	export let columns: Column[];
	export let initializing: boolean;
</script>

<DropdownMenu.Root>
	<!-- TRIGGER -->
	<Tooltip title="Column Visibility">
		<DropdownMenu.Trigger disabled={initializing}>
			<Button classes={{ root: 'w-[54px] h-[54px]' }} variant="fill-light" iconOnly disabled={initializing}>
				<i class="ph-bold ph-table text-xl" />
			</Button>
		</DropdownMenu.Trigger>
	</Tooltip>

	<!-- CONTENT -->
	<DropdownMenu.Content class="min-w-[200px]">
		<DropdownMenu.Group>
			<DropdownMenu.Label class="text-center">Columns</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Group class="max-h-[50vh] overflow-y-auto overflow-x-hidden">
				{#each columns as column}
					<label class="dropdown-item">
						<Switch bind:checked={column.visible} />
						{column.label}
					</label>
				{/each}
			</DropdownMenu.Group>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
