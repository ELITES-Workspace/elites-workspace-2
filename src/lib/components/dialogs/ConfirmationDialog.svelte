<script lang="ts">
	// IMPORTED DEP-MODULES
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import { focusAction } from 'svelte-legos';
	// IMPORTED MODULES
	import { removeDialog, type Dialog as TDialog } from '$lib/stores';
	// IMPORTED DEP-COMPONENTS
	import { Button, Dialog } from 'svelte-ux';
	import { isAsync } from '$lib/utils';

	// -- REQUIRED PROPS -- //

	export let dialog: TDialog;

	// -- STATES -- //

	let isOpen = true;
	let isLoading = false;

	// -- FUNCTIONS -- //

	const addFocusAction = (node: any): any => {
		const action = focusAction(node);

		setTimeout(() => action.update(true), 50);

		return [action];
	};

	function closeDialog() {
		isOpen = false;
		removeDialog(dialog.id);
	}

	async function handleContinue() {
		try {
			if (isAsync(dialog.callback)) {
				isLoading = true;
				await dialog.callback();
				isLoading = false;
			} else {
				dialog.callback();
			}

			closeDialog();
		} catch (e: any) {
			toast.error(e.message);
		}
	}
</script>

<Dialog
	classes={{ root: 'p-2', dialog: 'flex flex-col gap-4 p-6 rounded-lg w-full max-w-lg' }}
	persistent={false || isLoading}
	bind:open={isOpen}
>
	{#if !isLoading}
		<!-- CLOSE -->
		<button
			class="absolute right-4 top-4 aspect-square w-[30px] rounded-lg hover:bg-accent"
			disabled={isLoading}
			on:click={() => {
				closeDialog();
				if (dialog.cancelCallback) dialog.cancelCallback();
			}}
		>
			<i class="ph-bold ph-x text-base"></i>
		</button>
	{/if}

	<header class="text-center">
		<h1 class="mb-2 text-2xl font-bold text-primary">{dialog.title}</h1>
		<p>{dialog.description}</p>
	</header>

	<footer class="flex gap-4">
		<!-- CANCEL -->
		<Button
			classes={{ root: 'flex-grow' }}
			type="button"
			variant="fill-light"
			size="lg"
			disabled={isLoading}
			on:click={() => {
				closeDialog();
				if (dialog.cancelCallback) dialog.cancelCallback();
			}}
		>
			Cancel
		</Button>

		<!-- CONTINUE -->
		<Button
			classes={{ root: 'flex-grow' }}
			type="submit"
			variant="fill"
			color="primary"
			size="lg"
			loading={isLoading}
			actions={addFocusAction}
			on:click={handleContinue}
		>
			Continue
		</Button>
	</footer>
</Dialog>
