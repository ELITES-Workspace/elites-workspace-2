<script lang="ts">
	// IMPORTED DEP-COMPONENTS
	import { TextField } from 'svelte-ux';

	// -- REQUIRED PROPS -- //

	export let data: any, errors: any;
</script>

<!-- PERSONAL INFO -->
<div class="flex flex-col gap-4 p-4">
	<div class="flex-start-center gap-2">
		<div class="flex-center h-8 w-8 rounded-sm bg-primary text-white">2</div>
		<strong class="text-xl">Personal Info</strong>
	</div>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
		<!-- LAST NAME -->
		<TextField label="Last Name" placeholder="Eg. Apura" error={errors.lastName} required bind:value={data.lastName} />

		<!-- FIRST NAME -->
		<TextField label="First Name" placeholder="Eg. Arben" error={errors.firstName} required bind:value={data.firstName} />

		<!-- MIDDLE NAME -->
		<TextField
			label="Middle Name (Optional)"
			placeholder="Eg. Mendoza"
			error={errors.middleName}
			bind:value={data.middleName}
		/>

		<!-- SUFFIX -->
		<TextField
			label="Suffix (Optional)"
			placeholder="Leave blank if not applicable"
			error={errors.suffix}
			bind:value={data.suffix}
		/>
	</div>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<!-- CONTACT NUMBER -->
		<TextField
			label="Contact Number"
			placeholder="Eg. 09266943578"
			error={errors.contactNumber}
			required
			bind:value={data.contactNumber}
		/>

		<!-- EMAIL -->
		<TextField
			type="email"
			label="Email"
			placeholder="Eg. arbenapura.official@gmail.com"
			error={errors.emailAddress}
			required
			bind:value={data.emailAddress}
		/>
	</div>

	<!-- RESIDENCE -->
	<TextField
		label="Residence"
		placeholder="Eg. Blk X, Lot X, Phase X, Muzon, CSJDM, Bulacan"
		error={errors.residence}
		required
		bind:value={data.residence}
	/>
</div>
