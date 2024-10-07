<script lang="ts">
	// IMPORTED CONSTANTS
	import { PROGRAM_OPTIONS, SECTION_OPTIONS, YEAR_OPTIONS } from '$lib/constants';
	// IMPORTED DEP-COMPONENTS
	import { SelectField, TextField } from 'svelte-ux';

	// -- REQUIRED PROPS -- //

	export let data: any, errors: any;
</script>

<!-- PERSONAL INFO -->
<div class="flex flex-col gap-4 p-4">
	<div class="flex-start-center gap-2">
		<div class="flex-center h-8 w-8 rounded-sm bg-primary text-white">3</div>
		<strong class="text-xl">Student Info</strong>
	</div>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
		<!-- STUDENT NUMBER -->
		<TextField label="StudentNumber" error={errors.studentNumber} disabled value={data.studentNumber} />

		<!-- CAMPUS -->
		<TextField label="Campus" error={errors.campus} disabled value={data.campus} />

		<!-- SCHOOL YEAR -->
		<TextField label="School Year" error={errors.schoolYear} disabled value={data.schoolYear} />
	</div>

	<!-- PROGRAM -->
	<SelectField
		label="Program"
		placeholder="Select Program"
		options={PROGRAM_OPTIONS}
		error={errors.program}
		required
		bind:value={data.program}
	/>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<!-- YEAR -->
		<SelectField
			label="Year"
			placeholder="Select Year"
			options={YEAR_OPTIONS}
			error={errors.year}
			required
			bind:value={data.year}
		/>

		<!-- SECTION -->
		<SelectField
			label="Section"
			placeholder="Select Section"
			options={SECTION_OPTIONS}
			error={errors.section}
			required
			bind:value={data.section}
		/>
	</div>
</div>
