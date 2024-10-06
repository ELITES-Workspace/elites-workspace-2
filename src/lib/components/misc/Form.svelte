<script lang="ts">
	// IMPORTED DEP-TYPES
	import type { HTMLFormAttributes } from 'svelte/elements';
	// IMPORTED DEP-MODULES
	import { onMount } from 'svelte';
	import { Schema } from 'zod';
	// IMPORTED MODULES
	import { createConfirmationDialog } from '$lib/stores';

	// -- TYPES -- //

	type $$Props = HTMLFormAttributes & {
		schema: Schema;
		data: Object;
		confirmationMessage?: string;
		onSubmit: (e?: SubmitEvent) => Promise<void> | void;
	};

	// -- REQUIRED PROPS -- //

	export let schema: $$Props['schema'];
	export let data: $$Props['data'];
	export let onSubmit: $$Props['onSubmit'];

	// -- OPTIONAL PROPS -- //

	export let confirmationMessage: $$Props['confirmationMessage'] = undefined;

	let className: $$Props['class'] = undefined;
	export { className as class };

	// -- STATES -- //

	let errors: { [key: string]: string } = {};

	// -- FUNCTIONS -- //

	const clearErrors = () => Object.keys(data).map((key) => (errors[key] = ''));

	// -- LIFECYCLES -- //

	onMount(clearErrors);
</script>

<form
	class={className}
	on:submit|preventDefault={(e) => {
		const result = schema.safeParse(data);

		if (!result.success) {
			for (const issue of result.error.issues) {
				errors[issue.path[0]] = issue.message;
			}
		} else {
			clearErrors();

			if (confirmationMessage) {
				createConfirmationDialog({
					description: confirmationMessage,
					callback: () => onSubmit(e),
				});
			} else onSubmit(e);
		}
	}}
	{...$$restProps}
>
	<slot {errors} />
</form>
