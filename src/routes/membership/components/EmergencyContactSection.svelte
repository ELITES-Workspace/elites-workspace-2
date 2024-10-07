<script lang="ts">
	// IMPORTED CONSTANTS
	import { RELATIONSHIP_OPTIONS } from '$lib/constants';
	// IMPORTED DEP-COMPONENTS
	import { SelectField, TextField } from 'svelte-ux';

	// -- REQUIRED PROPS -- //

	export let data: any, errors: any;
</script>

<!-- PERSONAL INFO -->
<div class="flex flex-col gap-4 p-4">
	<div class="flex-start-center gap-2">
		<div class="flex-center h-8 w-8 rounded-sm bg-primary text-white">4</div>
		<strong class="text-xl">Emergency Contact</strong>
	</div>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<!-- NAME -->
		<TextField
			label="Name"
			placeholder="Eg. Arlene Apura"
			error={errors.emergencyName}
			required
			bind:value={data.emergencyName}
		/>

		<!-- RELATIONSHIP -->
		<SelectField
			label="Relationship"
			placeholder="Select Relationship"
			options={RELATIONSHIP_OPTIONS}
			error={errors.emergencyRelationship}
			required
			bind:value={data.emergencyRelationship}
		/>

		<!-- CONTACT NUMBER -->
		<TextField
			label="Contact Number"
			placeholder="Eg. 09xxxxxxxxx"
			error={errors.emergencyContactNumber}
			required
			bind:value={data.emergencyContactNumber}
		/>

		<!-- RESIDENCE -->
		<TextField
			label="Residence"
			placeholder="Eg. Blk X, Lot X, Phase X, Muzon, CSJDM, Bulacan"
			error={errors.emergencyResidence}
			required
			bind:value={data.emergencyResidence}
		/>
	</div>
</div>
