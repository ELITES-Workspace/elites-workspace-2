<script lang="ts" context="module">
	// IMPORTED DEP-MODULES
	import { writable } from 'svelte/store';

	// -- STORES -- //

	export const headerHeight = writable<number>(0);
</script>

<script lang="ts">
	// IMPORTED DEP-MODULES
	import { page } from '$app/stores';
	// IMPORTED MODULES
	import { cn } from '$lib/utils';
	// IMPORTED DEP-COMPONENTS
	import { Avatar, ThemeSwitch, Tooltip } from 'svelte-ux';
	// IMPORTED COMPONENTS
	import { DropdownMenu } from '$lib/shadcn';
	import Brand from './Brand.svelte';

	// -- REACTIVE STATES -- //

	$: links = [
		{
			title: 'Membership',
			icon: 'ph-handshake',
			href: '/membership',
			isCurrent: $page.url.pathname === '/membership',
		},
		{
			title: 'Merchandise',
			icon: 'ph-shopping-cart',
			href: '/merchandise',
			isCurrent: $page.url.pathname === '/merchandise',
		},
		{
			title: 'Forum',
			icon: 'ph-chat-centered-text',
			href: '/forum',
			isCurrent: $page.url.pathname === '/forum',
		},
	];
</script>

<header class="shadow-xs fixed z-10 w-full min-w-[365px] overflow-x-auto border-b bg-surface-100" bind:clientHeight={$headerHeight}>
	<div class="container mx-auto flex flex-col gap-2 p-4 pb-2 lg:flex-row lg:pb-4 xl:max-w-[1636px]">
		<div class="flex-start-center flex-grow gap-4">
			<Brand />

			<!-- LINKS -->
			<ul class="ml-auto hidden gap-2 lg:flex">
				{#each links as { title, icon, href, isCurrent }, i}
					<li>
						<a class={cn('text-icon-link', { 'text-primary': isCurrent })} {href}>
							<i class={cn('ph-bold', icon)}></i>
							{title}
						</a>
					</li>
				{/each}
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
		<ul class="flex justify-center gap-1 text-sm md:gap-2 md:text-base lg:hidden">
			{#each links as { title, icon, href, isCurrent }}
				<li>
					<a class={cn('text-icon-link', { 'text-primary': isCurrent })} {href}>
						<i class={cn('ph-bold', icon)}></i>
						{title}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</header>
