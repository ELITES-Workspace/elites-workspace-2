<script lang="ts">
	// IMPORTED TYPES
	import type { FilterGroup } from './types';
	// IMPORTED DEP-COMPONENTS
	import { DropdownMenu } from '$lib/shadcn';
	import { Button, Switch, Tooltip } from 'svelte-ux';

	// -- REQUIRED PROPS --//

	export let filterGroups: FilterGroup[];
	export let initializing: boolean;

	// -- UTILS -- //

	const handleSelectAll = (filterGroupI: number) => {
		filterGroups = filterGroups.map((filterGroup, i) => {
			if (i !== filterGroupI) return filterGroup;
			filterGroup.items = filterGroup.items.map((item) => {
				if (!item.match) return item;
				item.active = false;
				return item;
			});
			return filterGroup;
		});
	};

	const handleDeselectAll = (filterGroupI: number) => {
		filterGroups = filterGroups.map((filterGroup, i) => {
			if (i !== filterGroupI) return filterGroup;
			filterGroup.items = filterGroup.items.map((item) => {
				if (item.match) return item;
				item.active = false;
				return item;
			});
			return filterGroup;
		});
	};

	const handleDeselectRest = (filterGroupI: number, itemI: number) => {
		filterGroups = filterGroups.map((filterGroup, i) => {
			if (i !== filterGroupI) return filterGroup;
			filterGroup.items = filterGroup.items.map((item, j) => {
				if (j === itemI) return item;
				item.active = false;
				return item;
			});
			return filterGroup;
		});
	};
</script>

<DropdownMenu.Root>
	<!-- TRIGGER -->
	<Tooltip title="Filter">
		<DropdownMenu.Trigger disabled={initializing}>
			<Button classes={{ root: 'w-[54px] h-[54px]' }} variant="fill-light" iconOnly disabled={initializing}>
				<i class="ph-bold ph-sliders text-xl" />
			</Button>
		</DropdownMenu.Trigger>
	</Tooltip>

	<!-- CONTENT -->
	<DropdownMenu.Content class="min-w-[200px]">
		<DropdownMenu.Label class="text-center">Filter</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group class="max-h-[50vh] overflow-y-auto overflow-x-hidden">
			{#each filterGroups as filterGroup, i}
				{@const hasSelectAll = filterGroup.items.some((item) => !item.match)}
				<DropdownMenu.Sub>
					<DropdownMenu.SubTrigger>
						<i class="ph-bold ph-sliders" />
						{filterGroup.label}
					</DropdownMenu.SubTrigger>
					<DropdownMenu.SubContent>
						<DropdownMenu.Label class="flex-center gap-2">
							Show <small class="text-xs text-primary">
								({filterGroup.single ? 'Single' : 'Multiple'})
							</small>
						</DropdownMenu.Label>
						<DropdownMenu.Separator />
						{#each filterGroup.items as item, j}
							<label
								class="dropdown-item relative"
								on:click={() =>
									filterGroup.single
										? handleDeselectRest(i, j)
										: hasSelectAll
											? !item.match
												? handleSelectAll(i)
												: handleDeselectAll(i)
											: null}
							>
								<Switch bind:checked={item.active} />
								{item.label}
							</label>
						{/each}
					</DropdownMenu.SubContent>
				</DropdownMenu.Sub>
			{/each}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
