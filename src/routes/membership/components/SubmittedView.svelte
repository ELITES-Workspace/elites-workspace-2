<script lang="ts">
	// IMPORTED CONSTANTS
	import { CAMPUS, SCHOOL_YEAR, VALIDATION, VALUE } from '$lib/constants';
	// IMPORTED DEP-MODULES
	import compare from 'just-compare';
	import toast from 'svelte-french-toast';
	import { z } from 'zod';
	// IMPORTED MODULES
	import { updateMembership } from '$lib/db';
	import { membership, refreshAuth, user } from '$lib/stores';
	// IMPORTED DEP-COMPONENTS
	import { Button } from 'svelte-ux';
	// IMPORTED COMPONENTS
	import { Form } from '$lib/components';
	import AgreementSection from './AgreementSection.svelte';
	import EmergencyContactSection from './EmergencyContactSection.svelte';
	import MembershipStatusSection from './MembershipStatusSection.svelte';
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

	// -- REACTIVE STATES -- //

	$: hasChanged = !compare(initial, data);

	// -- FUNCTIONS -- //

	const reset = () => {
		initial = {
			// AGREEMENT
			isAgreementConfirmed: $membership?.isAgreementConfirmed || false,

			// PERSONAL INFO
			lastName: $membership?.lastName || VALUE.NULL_STRING,
			firstName: $membership?.firstName || VALUE.NULL_STRING,
			middleName: $membership?.middleName || VALUE.NULL_STRING,
			suffix: $membership?.suffix || VALUE.NULL_STRING,
			contactNumber: $membership?.contactNumber || VALUE.NULL_STRING,
			emailAddress: $membership?.emailAddress || VALUE.NULL_STRING,
			residence: $membership?.residence || VALUE.NULL_STRING,

			// STUDENT INFO
			studentNumber: $user?.studentNumber || VALUE.NULL_STRING,
			campus: CAMPUS,
			schoolYear: SCHOOL_YEAR,
			program: $membership?.program || VALUE.NULL_STRING,
			year: $membership?.year || (VALUE.NULL_STRING as any),
			section: $membership?.section || (VALUE.NULL_STRING as any),

			// EMERGENCY CONTACT
			emergencyName: $membership?.emergencyName || VALUE.NULL_STRING,
			emergencyRelationship: $membership?.emergencyRelationship || VALUE.NULL_STRING,
			emergencyContactNumber: $membership?.emergencyContactNumber || VALUE.NULL_STRING,
			emergencyResidence: $membership?.emergencyResidence || VALUE.NULL_STRING,
		};

		data = { ...initial };
	};

	async function submit() {
		if (!data.isAgreementConfirmed) throw new Error('Please confirm the agreement first.');

		if (!$membership) throw new Error('Membership not found.');

		await updateMembership($membership.id, data);
		await refreshAuth();
	}

	const handleSubmit = () =>
		toast.promise(submit(), {
			loading: 'Saving changes...',
			success: 'Changes saved successfully!',
			error: (e) => e.message,
		});

	// -- SUBSCRIPTIONS -- //

	membership.subscribe(reset);
</script>

<Form
	class="flex flex-col rounded-md border bg-surface-100 shadow-sm"
	confirmationMessage="Are you sure you want to save changes?"
	onSubmit={handleSubmit}
	{schema}
	bind:data
	let:errors
>
	<MembershipStatusSection />

	<hr />

	<AgreementSection bind:data />

	<hr />

	<PersonalInfoSection bind:data {errors} />

	<hr />

	<StudentInfoSection bind:data {errors} />

	<hr />

	<EmergencyContactSection bind:data {errors} />

	<hr />

	<div class="p-4">
		<Button type="submit" variant="fill" color="primary" size="lg" fullWidth disabled={!hasChanged}>Save</Button>
	</div>
</Form>
