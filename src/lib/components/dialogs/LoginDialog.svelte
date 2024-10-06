<script lang="ts">
	// IMPORTED CONSTANTS
	import { VALIDATION, VALUE } from '$lib/constants';
	// IMPORTED DEP-MODULES
	import toast from 'svelte-french-toast';
	import { z } from 'zod';
	// IMPORTED MODULES
	import { closeCustomDialog, customDialogs, login, openCustomDialog } from '$lib/stores';
	// IMPORTED DEP-COMPONENTS
	import { TextField } from 'svelte-ux';
	// IMPORTED COMPONENTS
	import { AccountBenefits, FormDialog } from '$lib/components';

	// -- FORM -- //

	const schema = z.object({
		studentNumber: VALIDATION.STUDENT_NUMBER,
		password: VALIDATION.PASSWORD,
	});

	const initial: z.infer<typeof schema> = {
		studentNumber: VALUE.NULL_STRING,
		password: VALUE.NULL_STRING,
	};

	let data = { ...initial };

	// -- STATES -- //

	let isLoading = false;

	// -- FUNCTIONS -- //

	const reset = () => (data = { ...initial });

	async function submit() {
		try {
			isLoading = true;

			await login(data.studentNumber, data.password);

			closeCustomDialog('login');
			reset();
		} finally {
			isLoading = false;
		}
	}

	async function handleSubmit() {
		await toast.promise(submit(), {
			loading: 'Logging in...',
			success: 'Logged in successfully!',
			error: (e) => e.message,
		});
	}

	async function goToRegister() {
		closeCustomDialog('login');
		openCustomDialog('register');
	}
</script>

<FormDialog
	title="Login Account"
	positiveButtonText="Login"
	onSubmit={handleSubmit}
	onReset={reset}
	{schema}
	{initial}
	{isLoading}
	bind:isOpen={$customDialogs.login}
	bind:data
	let:errors
>
	<AccountBenefits />

	<!-- STUDENT NUMBER -->
	<TextField
		label="Student Number"
		placeholder="Enter Student Number"
		error={errors.studentNumber}
		disabled={isLoading}
		required
		bind:value={data.studentNumber}
	>
		<i class="ph-bold ph-identification-card icon-prefix" slot="prefix"></i>
	</TextField>

	<!-- PASSWORD -->
	<TextField
		type="password"
		label="Password"
		placeholder="Enter Password"
		error={errors.password}
		disabled={isLoading}
		required
		bind:value={data.password}
	>
		<i class="ph-bold ph-lock-key icon-prefix" slot="prefix"></i>
	</TextField>

	<!-- REGISTER -->
	<small class="-mt-2 text-right">
		Don't have an account? <button type="button" class="text-link text-primary" on:click={goToRegister}>Register</button> now.
	</small>
</FormDialog>
