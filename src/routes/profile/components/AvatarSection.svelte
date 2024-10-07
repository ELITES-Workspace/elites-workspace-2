<script lang="ts">
	// IMPORTED DEP-MODULES
	import toast from 'svelte-french-toast';
	// IMPORTED MODULES
	import { createConfirmationDialog, updateAvatarSeed, user } from '$lib/stores';
	import { getAvatar } from '$lib/utils';
	// IMPORTED DEP-COMPONENTS
	import { Avatar, Button } from 'svelte-ux';

	// -- STATES -- //

	let isLoading = false;

	let avatarSeed = $user?.avatarSeed || crypto.randomUUID();

	// -- REACTIVE STATES -- //

	$: hasChanged = avatarSeed !== $user?.avatarSeed;

	// -- FUNCTIONS -- //

	const randomizeAvatar = () => (avatarSeed = crypto.randomUUID());

	const handleSave = () =>
		createConfirmationDialog({
			description: 'Are you sure you want to update your avatar?',
			callback: async () => {
				try {
					isLoading = true;

					await toast.promise(updateAvatarSeed(avatarSeed), {
						loading: 'Updating avatar...',
						success: 'Avatar updated successfully!',
						error: (e) => e.message,
					});
				} finally {
					isLoading = false;
				}
			},
		});
</script>

{#if $user}
	<div class="flex flex-col items-center gap-4 border-b p-4 md:border-b-0 md:border-r md:p-6">
		<strong class="text-xl">Avatar</strong>

		<div class="flex-center flex-grow py-4">
			<Avatar class="bg-primary-glass max-h-[200px] min-h-[200px] min-w-[200px] max-w-[200px] flex-grow border p-4">
				<img src={getAvatar(avatarSeed)} alt="Avatar" />
			</Avatar>
		</div>

		<div class="grid w-full gap-4 md:grid-cols-2">
			<!-- RANDOMIZE -->
			<Button variant="fill-light" size="lg" disabled={isLoading} on:click={randomizeAvatar}>Randomize Avatar</Button>

			<!-- SAVE -->
			<Button variant="fill" color="primary" size="lg" disabled={isLoading || !hasChanged} on:click={handleSave}>
				Save
			</Button>
		</div>
	</div>
{/if}
