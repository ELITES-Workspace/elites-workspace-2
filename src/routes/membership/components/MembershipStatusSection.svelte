<script lang="ts">
	// IMPORTED MODULES
	import { membership } from '$lib/stores';
	import { formatDateTimeDisplay } from '$lib/utils';
	// IMPORTED DEP-COMPONENTS
	import { TextField } from 'svelte-ux';
</script>

{#if $membership}
	<!-- MEMBERSHIP STATUS -->
	<div class="flex flex-col gap-4 p-4">
		<div class="flex-start-center gap-2">
			<div class="flex-center h-8 w-8 rounded-sm bg-primary text-white">
				<i class="ph-bold ph-seal-check"></i>
			</div>
			<strong class="text-xl">Membership Status</strong>
		</div>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<!-- PAYMENT STATUS -->
			<TextField label="Payment Status" value={$membership.isConfirmed ? 'Paid' : 'Pending'} disabled />

			<!-- CONFIRMED AT -->
			<TextField
				label="Confirmed At"
				value={$membership.isConfirmed
					? $membership.confirmedAt
						? formatDateTimeDisplay($membership.confirmedAt)
						: 'No Date Indicated'
					: 'Not Yet Confirmed'}
				disabled
			/>
		</div>

		{#if !$membership.isConfirmed}
			<!-- NOTICE -->
			<div class="bg-primary-glass flex-start-center gap-1 rounded-md border p-2">
				<i class="ph-bold ph-info"></i>
				<small>
					You can pay the membership fee (₱50) through your class mayor or year representative. For more information,
					feel free to message us on our FB page:
					<a class="text-link text-primary" href="https://www.facebook.com/THENEWELITES.BulSU" target="_blank">
						ELITES Organization
					</a>.
				</small>
			</div>
		{/if}
	</div>
{/if}
