<script lang="ts">
	// IMPORTED MODULES
	import { dialogs } from '$lib/stores';
	// IMPORTED COMPONENTS
	import ConfirmationDialog from '../dialogs/ConfirmationDialog.svelte';
	import LoginDialog from '../dialogs/LoginDialog.svelte';
	import RegisterDialog from '../dialogs/RegisterDialog.svelte';
</script>

<div id="dialog-wrapper">
	{#each $dialogs as dialog (dialog.id)}
		{#if dialog.type === 'confirmation'}
			<ConfirmationDialog {dialog} />
		{/if}
	{/each}
</div>

<!-- DIALOGS -->
<LoginDialog />
<RegisterDialog />
