<script lang="ts">
	// IMPORTED MODULES
	import { user } from '$lib/stores';
	import { formatDateTimeDisplay } from '$lib/utils';
	// IMPORTED DEP-COMPONENTS
	import { TextField, Button } from 'svelte-ux';
</script>

{#if $user}
	<div class="flex flex-col items-stretch gap-4 p-4 md:p-6">
		<strong class="text-center text-xl">Account Info</strong>

		<!-- STUDENT NUMBER -->
		<TextField label="Sudent Number" value={$user.studentNumber} disabled />

		<!-- MEMBERSHIP STATUS -->
		<TextField label="Membership Status" value="Not Registered" disabled />

		<!-- ACCOUNT CREATION -->
		<TextField label="Account Creation" value={formatDateTimeDisplay($user.createdAt)} disabled />

		<!-- CHANGE PASSWORD -->
		<Button classes={{ root: 'mt-auto text-xs sm:text-sm md:text-base' }} variant="fill" color="danger" size="lg" disabled>
			Change Password (Not Available)
		</Button>
	</div>
{/if}
