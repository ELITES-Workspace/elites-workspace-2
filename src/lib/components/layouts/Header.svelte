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
	import { handleLogout, isLoggedIn, openCustomDialog, user } from '$lib/stores';
	import { cn, getAvatar } from '$lib/utils';
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
		// {
		// 	title: 'Forum',
		// 	icon: 'ph-chat-centered-text',
		// 	href: '/forum',
		// 	isCurrent: $page.url.pathname === '/forum',
		// },
	];
</script>

<header class="shadow-xs fixed z-10 w-full border-b bg-surface-100" bind:clientHeight={$headerHeight}>
	<div class="container mx-auto flex flex-col gap-2 p-4 pb-2 lg:flex-row lg:pb-4 xl:max-w-[1636px]">
		<div class="flex-start-center flex-grow gap-4">
			<Brand />

			<!-- LINKS -->
			<ul class="ml-auto hidden gap-2 lg:flex">
				{#each links as { title, icon, href, isCurrent }, i}
					<li>
						<a
							class={cn('text-icon-link cursor-pointer', { 'text-primary': isCurrent })}
							href={$isLoggedIn ? href : undefined}
							on:click={$isLoggedIn ? undefined : () => openCustomDialog('login')}
						>
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

			{#if $user}
				<!-- MY ACCOUNT -->
				<DropdownMenu.Root>
					<!-- TRIGGER -->
					<DropdownMenu.Trigger>
						<Tooltip title="Profile">
							<Avatar class="bg-primary-glass border p-[2px]">
								<img src={getAvatar($user.avatarSeed)} alt="Avatar" />
							</Avatar>
						</Tooltip>
					</DropdownMenu.Trigger>

					<!-- CONTENT -->
					<DropdownMenu.Content class="w-full max-w-[200px]">
						<DropdownMenu.Group>
							<div class="bg-primary-glass flex flex-col items-center gap-2 rounded-sm p-2 pt-3">
								<Avatar class="bg-primary-glass border p-[2px]">
									<img src={getAvatar($user.avatarSeed)} alt="Avatar" />
								</Avatar>

								<strong class="text-sm">{$user.studentNumber}</strong>
							</div>

							<DropdownMenu.Separator />

							<!-- PROFILE -->
							<DropdownMenu.Item href="/profile">
								<i class="ph-bold ph-user"></i>
								Profile
							</DropdownMenu.Item>

							<!-- LOGOUT -->
							<DropdownMenu.Item on:click={handleLogout}>
								<i class="ph-bold ph-sign-out"></i>
								Logout
							</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else}
				<Tooltip title="Click to Login">
					<button on:click={() => openCustomDialog('login')}>
						<Avatar class="border">
							<i class="ph-bold ph-user"></i>
						</Avatar>
					</button>
				</Tooltip>
			{/if}
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
