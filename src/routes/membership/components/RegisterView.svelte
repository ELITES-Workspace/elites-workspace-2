<script lang="ts">
	// IMPORTED CONSTANTS
	import { CAMPUS, SCHOOL_YEAR, VALIDATION, VALUE } from '$lib/constants';
	// IMPORTED DEP-MODULES
	import toast from 'svelte-french-toast';
	import { z } from 'zod';
	// IMPORTED MODULES
	import { createMembership } from '$lib/db';
	import { refreshAuth, user } from '$lib/stores';
	// IMPORTED DEP-COMPONENTS
	import { Button } from 'svelte-ux';
	// IMPORTED COMPONENTS
	import { Form } from '$lib/components';
	import AgreementSection from './AgreementSection.svelte';
	import EmergencyContactSection from './EmergencyContactSection.svelte';
	import PersonalInfoSection from './PersonalInfoSection.svelte';
	import StudentInfoSection from './StudentInfoSection.svelte';

	const schema = z.object({
		// AGREEMENT
		isAgreementConfirmed: z.boolean(),

		// PERSONAL INFO
		lastName: VALIDATION.LAST_NAME,
		firstName: VALIDATION.FIRST_NAME,
		middleName: VALIDATION.MIDDLE_NAME,
		suffix: VALIDATION.SUFFIX,
		contactNumber: VALIDATION.CONTACT_NUMBER,
		emailAddress: VALIDATION.EMAIL_ADDRESS,
		residence: VALIDATION.RESIDENCE,

		// STUDENT INFO
		studentNumber: VALIDATION.STUDENT_NUMBER,
		campus: VALIDATION.CAMPUS,
		schoolYear: VALIDATION.SCHOOL_YEAR,
		program: VALIDATION.PROGRAM,
		year: VALIDATION.YEAR,
		section: VALIDATION.SECTION,

		// EMERGENCY CONTACT
		emergencyName: VALIDATION.EMERGENCY_NAME,
		emergencyRelationship: VALIDATION.EMERGENCY_RELATIONSHIP,
		emergencyContactNumber: VALIDATION.CONTACT_NUMBER,
		emergencyResidence: VALIDATION.RESIDENCE,
	});

	let initial: z.infer<typeof schema> = {
		// AGREEMENT
		isAgreementConfirmed: false,

		// PERSONAL INFO
		lastName: VALUE.NULL_STRING,
		firstName: VALUE.NULL_STRING,
		middleName: VALUE.NULL_STRING,
		suffix: VALUE.NULL_STRING,
		contactNumber: VALUE.NULL_STRING,
		emailAddress: VALUE.NULL_STRING,
		residence: VALUE.NULL_STRING,

		// STUDENT INFO
		studentNumber: $user?.studentNumber || VALUE.NULL_STRING,
		campus: CAMPUS,
		schoolYear: SCHOOL_YEAR,
		program: VALUE.NULL_STRING,
		year: VALUE.NULL_STRING as any,
		section: VALUE.NULL_STRING as any,

		// EMERGENCY CONTACT
		emergencyName: VALUE.NULL_STRING,
		emergencyRelationship: VALUE.NULL_STRING,
		emergencyContactNumber: VALUE.NULL_STRING,
		emergencyResidence: VALUE.NULL_STRING,
	};

	let data = { ...initial };

	// -- FUNCTIONS -- //

	const reset = () => (data = { ...initial });

	async function submit() {
		if (!data.isAgreementConfirmed) throw new Error('Please confirm the agreement first.');

		await createMembership(data as any);
		await refreshAuth();

		reset();
	}

	const handleSubmit = () =>
		toast.promise(submit(), {
			loading: 'Submitting...',
			success: 'Submitted successfully!',
			error: (e) => e.message,
		});
</script>

<Form
	class="flex flex-col rounded-md border bg-surface-100 shadow-sm"
	confirmationMessage="Are you sure you want to submit this membership form?"
	onSubmit={handleSubmit}
	{schema}
	bind:data
	let:errors
>
	<AgreementSection bind:data />

	<hr />

	<PersonalInfoSection bind:data {errors} />

	<hr />

	<StudentInfoSection bind:data {errors} />

	<hr />

	<EmergencyContactSection bind:data {errors} />

	<hr />

	<div class="p-4">
		<Button type="submit" variant="fill" color="primary" size="lg" fullWidth>Submit</Button>
	</div>
</Form>
