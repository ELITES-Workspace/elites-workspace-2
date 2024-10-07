<script lang="ts">
	// IMPORTED DEP-MODULES
	import { page } from '$app/stores';
	// IMPORTED MODULES
	import { cn } from '$lib/utils';

	// -- CONSTANTS -- //

	const DEFAULT_TITLE = 'ELITES Workspace';

	// -- OPTIONAL PROPS -- //

	export let reflectHeadTitle = true;
	export let icon: string = 'ph-fill ph-question';
	export let title: string = DEFAULT_TITLE;
	export let description: string = 'A workspace for the Exemplary League of Information Technology Students.';
	export let keywords: string = '';
	export let url: string = $page.url.href;
	export let thumbnail: string = '/thumbnail.png';
	export let isHeadOnly = false;

	title = title === DEFAULT_TITLE ? title : title + ' • ELITES Workspace';
</script>

<svelte:head>
	{#if reflectHeadTitle}
		<!-- HTML META TAGS -->
		<title>{title}</title>
		<meta name="title" content={title} />
		<meta name="description" content={description} />
		<meta name="keywords" content={keywords} />
		<meta name="robots" content="index, follow" />
		<meta name="language" content="English" />
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

		<!-- GOOGLE / SEARCH ENGINE TAGS -->
		<meta itemprop="name" content={title} />
		<meta itemprop="description" content={description} />
		<meta itemprop="image" content={thumbnail} />

		<!-- FACEBOOK META TAGS -->
		<meta property="og:url" content={url} />
		<meta property="og:type" content="website" />
		<meta property="og:title" content={title} />
		<meta property="og:description" content={description} />
		<meta property="og:image" content={thumbnail} />

		<!-- TWITTER META TAGS -->
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={title} />
		<meta name="twitter:description" content={description} />
		<meta name="twitter:image" content={thumbnail} />
	{/if}
</svelte:head>

{#if !isHeadOnly}
	<div class="flex-start-center gap-3">
		<div class="flex-center bg-surface-base bg- aspect-square w-10 rounded-md border bg-surface-100 shadow-sm">
			<i class={cn('text-2xl', icon)}></i>
		</div>

		<p class="mt-1 font-['Ultimate_Gear'] text-xl md:text-3xl">{title.replace(' • ELITES Workspace', '')}</p>
	</div>
{/if}
