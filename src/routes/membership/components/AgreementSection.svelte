<script lang="ts">
	// IMPORTED DEP-COMPONENTS
	import { Accordion } from '$lib/shadcn';
	import { Checkbox } from 'svelte-ux';

	// -- REQUIRED PROPS -- //

	export let data: any;
</script>

<!-- AGREEMENT -->
<div class="flex flex-col gap-4 p-4">
	<div class="flex-start-center gap-2">
		<div class="flex-center h-8 w-8 rounded-sm bg-primary text-white">1</div>
		<strong class="text-xl">Agreement</strong>
	</div>

	<!-- PERSONAL INFORMATION CONSENT -->
	<Accordion.Root class="rounded-md border bg-surface-200 p-4">
		<Accordion.Item value="item-1">
			<Accordion.Trigger class="font-semibold">Personal Information Consent</Accordion.Trigger>
			<Accordion.Content class="selectable ">
				<div class="prose prose-sm max-h-[300px] max-w-none overflow-auto">
					<p>
						In compliance with the <b>Data Privacy Act (DPA) of 2012</b> and its
						<b>Implementing Rules and Regulations (IRR) of 2016</b>, I hereby grant permission to the
						<b>Exemplary League of Information Technology Students (ELITES) Organization</b>
						to store and utilize my data for the purpose of operating the organization's database. By completing this form,
						I provide my full consent and authorization for
						<b>ELITES Organization</b>, its <b>Executive Board Members</b>, and its
						<b>Membership Committee</b> to:
					</p>
					<ol>
						<li>
							Use my personal data to communicate information to the respective administration for the <b
								>Academic Year 2024 - 2025</b
							>.
						</li>
						<li>
							Restrict access to the submitted data exclusively to the
							<b>Executive Board Members</b> and <b>Membership Committees</b>
							within <b>ELITES Organization</b>, with the exception of Student Number and Student Name, which may be
							accessed for the sole purpose of verifying membership status.
						</li>
						<li>
							Retain my information until the end of the Academic Year or until I submit a written cancellation
							letter to <b>ELITES Organization</b>, whichever occurs earlier. I acknowledge and understand that my
							information will be archived for documentation purposes, with access limited to the parties mentioned
							in Section 2.
						</li>
						<li>
							Understand that improper use of the information in this form (online, offline, or printed) may result
							in appropriate actions being taken under the
							<b>Data Privacy Act (DPA) of 2012</b>.
						</li>
						<li>
							I acknowledge and trust that <b>ELITES Organization</b> and its
							<b>Board Members</b>
							will take necessary precautions to protect my personal information.
						</li>
					</ol>
				</div>
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>

	<!-- AGREEMENT CONFIRMATION -->
	<Checkbox bind:checked={data.isAgreementConfirmed}>
		<p class="ml-2 text-xs md:text-sm">I have read and understood the Personal Information Consent.</p>
	</Checkbox>
</div>
