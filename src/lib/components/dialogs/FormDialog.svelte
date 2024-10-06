<script lang="ts">
	// IMPORTED DEP-TYPES
	import type { HTMLFormAttributes } from 'svelte/elements';
	// IMPORTED DEP-MODULES
	import compare from 'just-compare';
	import { Schema } from 'zod';
	// IMPORTED MODULES
	import { createConfirmationDialog } from '$lib/stores';
	import { cn } from '$lib/utils';
	// IMPORTED DEP-COMPONENTS
	import { Dialog, Tooltip, Button } from 'svelte-ux';
	// IMPORTED COMPONENTS
	import Form from '../misc/Form.svelte';

	// -- TYPES -- //

	type $$Props = HTMLFormAttributes & {
		isOpen: boolean;
		schema: Schema;
		initial: Object;
		data: Object;
		title?: string;
		description?: string;
		confirmationMessage?: string;
		positiveButtonText?: string;
		isInitializing?: boolean;
		isLoading?: boolean;
		isPersistent?: boolean;
		hasPadding?: boolean;
		warnOnCloseWhenChanged?: boolean;
		disableSubmit?: boolean;
		disableSubmitWhenUnchanged?: boolean;
		onSubmit: (e?: SubmitEvent) => Promise<void> | void;
		onReset: () => void;
	};

	// -- REQUIRED PROPS -- //

	export let isOpen: $$Props['isOpen'];
	export let schema: $$Props['schema'];
	export let initial: $$Props['initial'];
	export let data: $$Props['data'];
	export let onSubmit: $$Props['onSubmit'];
	export let onReset: $$Props['onReset'];

	// -- OPTIONAL PROPS -- //

	export let isInitializing: $$Props['isInitializing'] = false;
	export let isLoading: $$Props['isLoading'] = false;
	export let title: $$Props['title'] = undefined;
	export let description: $$Props['description'] = undefined;
	export let confirmationMessage: $$Props['confirmationMessage'] = undefined;
	export let isPersistent: $$Props['isPersistent'] = false;
	export let positiveButtonText: $$Props['positiveButtonText'] = 'Continue';
	export let hasPadding: $$Props['hasPadding'] = true;
	export let warnOnCloseWhenChanged: $$Props['warnOnCloseWhenChanged'] = true;
	export let disableSubmit: $$Props['disableSubmit'] = false;
	export let disableSubmitWhenUnchanged: $$Props['disableSubmitWhenUnchanged'] = true;

	export let className: $$Props['class'] = undefined;
	export { className as class };

	// -- STATES -- //

	$: hasChanged = !compare(initial, data);

	// -- UTILS -- //

	function closeModal() {
		if (isLoading) return;

		if (warnOnCloseWhenChanged) {
			if (!hasChanged) {
				isOpen = false;
				onReset();
				return;
			}

			return createConfirmationDialog({
				title: 'Unsaved Changes',
				description: 'Are you sure you want to close this form?',
				callback: () => {
					isOpen = false;
					onReset();
				},
			});
		}

		isOpen = false;
	}
</script>

<Dialog
	classes={{
		root: cn(hasPadding && 'p-2'),
		dialog: cn(
			isInitializing ? 'w-20 h-20 flex-center' : 'p-6 rounded-lg w-full max-w-xl max-h-[90vh] overflow-auto',
			className,
		),
	}}
	persistent={isPersistent}
	on:close-attempt={closeModal}
	bind:open={isOpen}
>
	{#if isInitializing}
		<span class="d-loading d-loading-bars d-loading-lg text-primary"></span>
	{:else}
		{#if !isLoading}
			<!-- CLOSE -->
			<button
				class="absolute right-4 top-4 aspect-square w-[30px] rounded-lg hover:bg-accent"
				disabled={isLoading}
				on:click={closeModal}
			>
				<i class="ph-bold ph-x text-base"></i>
			</button>
		{/if}

		<Form class="flex flex-col gap-4" {...{ schema, confirmationMessage, onSubmit }} bind:data let:errors>
			{#if title || description}
				<header class="text-center">
					{#if title}
						<h1 class="text-2xl font-bold text-primary">{title}</h1>
					{/if}

					{#if description}
						<p class="text-sm md:text-base">{description}</p>
					{/if}
				</header>
			{/if}

			<slot {errors} />

			<footer class="flex gap-4">
				<!-- CANCEL -->
				<Tooltip title="Cancel" placement="top">
					<Button
						classes={{ root: 'w-12' }}
						type="button"
						variant="fill-light"
						size="lg"
						disabled={isLoading}
						rounded
						iconOnly
						on:click={closeModal}
					>
						<i class="ph-bold ph-x"></i>
					</Button>
				</Tooltip>

				<!-- RESET -->
				<Tooltip title="Reset" placement="top">
					<Button
						classes={{ root: 'w-12' }}
						type="button"
						variant="fill-light"
						size="lg"
						disabled={isLoading}
						rounded
						iconOnly
						on:click={onReset}
					>
						<i class="ph-bold ph-arrow-counter-clockwise"></i>
					</Button>
				</Tooltip>

				<!-- CONTINUE -->
				<Button
					classes={{ root: 'flex-grow' }}
					type="submit"
					variant="fill"
					color="primary"
					size="lg"
					loading={isLoading}
					disabled={isLoading || disableSubmit || (disableSubmitWhenUnchanged && !hasChanged)}
				>
					{positiveButtonText}
				</Button>
			</footer>

			<slot name="bottom-extra"></slot>
		</Form>
	{/if}
</Dialog>
