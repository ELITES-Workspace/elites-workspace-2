<script lang="ts">
	// IMPORTED CONSTANTS
	import { VALIDATION, VALUE } from '$lib/constants';
	// IMPORTED DEP-MODULES
	import toast from 'svelte-french-toast';
	import { z } from 'zod';
	// IMPORTED MODULES
	import { closeCustomDialog, customDialogs, openCustomDialog, register } from '$lib/stores';
	import { getAvatar, triggerConfetti } from '$lib/utils';
	// IMPORTED DEP-COMPONENTS
	import { Avatar, Button, TextField } from 'svelte-ux';
	// IMPORTED COMPONENTS
	import { AccountBenefits, FieldsContainer, FormDialog } from '$lib/components';

	// -- FORM -- //

	const schema = z
		.object({
			avatarSeed: VALIDATION.AVATAR_SEED,
			studentNumber: VALIDATION.STUDENT_NUMBER,
			password: VALIDATION.PASSWORD,
			repassword: VALIDATION.PASSWORD,
		})
		.refine((data) => data.password === data.repassword, {
			message: 'Passwords do not match',
			path: ['repassword'],
		});

	const initial: z.infer<typeof schema> = {
		avatarSeed: crypto.randomUUID(),
		studentNumber: VALUE.NULL_STRING,
		password: VALUE.NULL_STRING,
		repassword: VALUE.NULL_STRING,
	};

	let data = { ...initial };

	// -- STATES -- //

	let isLoading = false;

	// -- FUNCTIONS -- //

	const reset = () => (data = { ...initial });

	const randomizeSeed = () => (data.avatarSeed = crypto.randomUUID());

	async function submit() {
		try {
			isLoading = true;

			await register(data);

			triggerConfetti();
			goToLogin();
			reset();
		} finally {
			isLoading = false;
		}
	}

	async function handleSubmit() {
		await toast.promise(submit(), {
			loading: 'Registering...',
			success: 'Registered successfully!',
			error: (e) => e.message,
		});
	}

	async function goToLogin() {
		closeCustomDialog('register');
		openCustomDialog('login');
	}
</script>

<FormDialog
	title="Register Account"
	positiveButtonText="Register"
	onSubmit={handleSubmit}
	onReset={reset}
	{schema}
	{initial}
	{isLoading}
	bind:isOpen={$customDialogs.register}
	bind:data
	let:errors
>
	<AccountBenefits />

	<!-- AVATAR FIELD -->
	<FieldsContainer class="flex flex-col items-center gap-4 p-4" label="Avatar">
		<!-- AVATAR -->
		<Avatar class="bg-primary-glass h-24 w-24 border p-2">
			<img src={getAvatar(data.avatarSeed)} alt="Avatar" />
		</Avatar>

		<!-- RANDOMIZE -->
		<Button type="button" variant="fill-light" on:click={randomizeSeed}>Randomize</Button>
	</FieldsContainer>

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

	<!-- REPASSWORD -->
	<TextField
		type="password"
		label="Repeat Password"
		placeholder="Enter Password Again"
		error={errors.repassword}
		disabled={isLoading}
		required
		bind:value={data.repassword}
	>
		<i class="ph-bold ph-lock-key icon-prefix" slot="prefix"></i>
	</TextField>

	<!-- REGISTER -->
	<small class="-mt-2 text-right">
		Already have an account? <button type="button" class="text-link text-primary" on:click={goToLogin}>Login</button> now.
	</small>
</FormDialog>
