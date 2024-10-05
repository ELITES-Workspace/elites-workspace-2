<script lang="ts" context="module">
	// IMPORTED DEP-MODULES
	import { writable } from 'svelte/store';

	// -- STORES -- //

	export const headerHeight = writable<number>(0);
</script>

<script lang="ts">
	// IMPORTED DEP-COMPONENTS
	import { Avatar, ThemeSwitch, Tooltip } from 'svelte-ux';
	// IMPORTED COMPONENTS
	import { DropdownMenu } from '$lib/shadcn';
	import Brand from './Brand.svelte';
</script>

<header class="shadow-xs fixed z-10 w-full min-w-[365px] overflow-x-auto border-b bg-surface-100" bind:clientHeight={$headerHeight}>
	<div class="container mx-auto flex flex-col gap-2 p-4 pb-2 lg:flex-row lg:pb-4 xl:max-w-[1636px]">
		<div class="flex-start-center flex-grow gap-4">
			<Brand />

			<!-- LINKS -->
			<ul class="ml-auto hidden gap-2 lg:flex">
				<li>
					<a class="text-icon-link" href="/membership">
						<i class="ph-bold ph-handshake"></i>
						Membership
					</a>
				</li>
				<li>
					<a class="text-icon-link" href="/merchandise">
						<i class="ph-bold ph-storefront"></i>
						Merchandise
					</a>
				</li>
				<li>
					<a class="text-icon-link" href="/forum">
						<i class="ph-bold ph-chat-centered-text"></i>
						Forum
					</a>
				</li>
			</ul>

			<!-- DIVIDER -->
			<div class="hidden opacity-25 lg:block">|</div>

			<!-- THEME SWITCH -->
			<div class="ml-auto lg:ml-0">
				<Tooltip title="Toggle Theme">
					<ThemeSwitch />
				</Tooltip>
			</div>

			<!-- MY ACCOUNT -->
			<DropdownMenu.Root>
				<!-- TRIGGER -->
				<DropdownMenu.Trigger>
					<Avatar class="border">
						<i class="ph-bold ph-user"></i>
					</Avatar>
				</DropdownMenu.Trigger>

				<!-- CONTENT -->
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label>My Account</DropdownMenu.Label>
						<DropdownMenu.Separator />

						<!-- PROFILE -->
						<DropdownMenu.Item href="/profile">
							<i class="ph-bold ph-user"></i>
							Profile
						</DropdownMenu.Item>

						<!-- MEMBERSHIP STATUS -->
						<DropdownMenu.Item href="/membership/status">
							<i class="ph-bold ph-seal-question"></i>
							Membership Status
						</DropdownMenu.Item>

						<!-- LOGOUT -->
						<DropdownMenu.Item>
							<i class="ph-bold ph-sign-out"></i>
							Logout
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>

		<!-- LINKS -->
		<ul class="flex justify-center gap-2 text-sm md:text-base lg:hidden">
			<li>
				<a class="text-icon-link" href="/membership">
					<i class="ph-bold ph-handshake"></i>
					Membership
				</a>
			</li>
			<li>
				<a class="text-icon-link" href="/merchandise">
					<i class="ph-bold ph-storefront"></i>
					Merchandise
				</a>
			</li>
			<li>
				<a class="text-icon-link" href="/forum">
					<i class="ph-bold ph-chat-centered-text"></i>
					Forum
				</a>
			</li>
		</ul>
	</div>
</header>
