<script lang="ts">
	// IMPORTED ASSETS
	import techCompanyBroPNG from '$lib/assets/storysets/tech company-bro.png';
	// IMPORTED MODULES
	import { isLoggedIn, openCustomDialog } from '$lib/stores';
	// IMPORTED DEP-COMPONENTS
	import { Button } from 'svelte-ux';
	// IMPORTED COMPONENTS
	import { Heading } from '$lib/components';
</script>

<section class="flex flex-col gap-4">
	<Heading icon="ph-fill ph-handshake" title="Membership" />

	<div class="bg-primary-glass grid grid-cols-1 rounded-md border p-4 shadow-sm xl:grid-cols-3">
		<div class="flex-center 2xl:p-4">
			<img class="aspect-[458/303] w-full" src={techCompanyBroPNG} alt="Tech Company" />
		</div>

		<div class="flex flex-col justify-center space-y-4 p-2 sm:p-4 md:col-span-2">
			<h2 class="text-3xl font-bold text-primary dark:text-cyan-600">Join ELITES Organization</h2>
			<p class="text-sm sm:text-base">
				Unlock your potential with exclusive resources, professional networks, and tailored opportunities designed to help
				you grow and succeed in your career. As a member, you'll also enjoy special discounts on official merchandise to
				show your ELITES pride.
			</p>
			<p class="text-sm sm:text-base">
				Ready to take the next step? Join the ELITES today and be part of a movement that shapes the future.
			</p>

			<Button
				classes={{ root: 'w-fit' }}
				variant="fill"
				color="primary"
				size="lg"
				href={$isLoggedIn ? '/membership/register' : undefined}
				on:click={$isLoggedIn ? undefined : () => openCustomDialog('login')}
			>
				Register Now
			</Button>
		</div>
	</div>
</section>
