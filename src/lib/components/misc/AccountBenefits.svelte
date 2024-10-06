<script lang="ts">
	// IMPORTED DEP-COMPONENTS
	import { Popover } from '$lib/shadcn';
</script>

<!-- BENEFITS -->
<small class="-mt-4 text-center text-sm">
	Discover the benefits of creating an account by clicking

	<!-- POPOVER -->
	<Popover.Root>
		<Popover.Trigger>
			<button type="button" class="text-link text-primary">here</button>.
		</Popover.Trigger>
		<Popover.Content class="prose prose-sm">
			<h4>Benefits</h4>
			<ul>
				<li>Manage your membership</li>
				<li>Track your merchandise orders</li>
				<li>Access exclusive features</li>
				<li>And more...</li>
			</ul>
		</Popover.Content>
	</Popover.Root>
</small>
