<script lang="ts">
	// IMPORTED MODULES
	import { isBulSUan, membership, membershipStatus, user } from '$lib/stores';
	import { formatDateTimeDisplay, formatFullName } from '$lib/utils';
	// IMPORTED DEP-COMPONENTS
	import { Button, TextField } from 'svelte-ux';
</script>

{#if $user}
	<div class="flex flex-col items-stretch gap-4 p-4 md:p-6">
		<strong class="text-center text-xl">Account Info</strong>

		{#if $membership}
			<!-- FULL NAME -->
			<TextField label="Full Name" value={formatFullName($membership)} disabled />
		{/if}

		<!-- STUDENT NUMBER -->
		<TextField label="Sudent Number" value={$user.studentNumber} disabled />

		{#if $isBulSUan}
			<!-- MEMBERSHIP STATUS -->
			<TextField label="Membership Status" value={$membershipStatus} disabled />
		{/if}

		{#if $membership}
			{#if $membership.isConfirmed && $membership.confirmedAt}
				<!-- MEMBERSHIP CONFIRMED AT -->
				<TextField label="Membership Confirmed At" value={formatDateTimeDisplay($membership.confirmedAt)} disabled />
			{:else}
				<!-- MEMBERSHIP CREATION -->
				<TextField label="Membership Creation" value={formatDateTimeDisplay($membership.createdAt)} disabled />
			{/if}
		{/if}

		<!-- ACCOUNT CREATION -->
		<TextField label="Account Creation" value={formatDateTimeDisplay($user.createdAt)} disabled />

		<!-- CHANGE PASSWORD -->
		<Button classes={{ root: 'mt-auto text-xs sm:text-sm md:text-base' }} variant="fill" color="danger" size="lg" disabled>
			Change Password (Not Available)
		</Button>
	</div>
{/if}
