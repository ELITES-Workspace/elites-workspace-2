<script lang="ts">
	// IMPORTED COMPONENTS
	import Brand from './Brand.svelte';
</script>

<div class="flex flex-col rounded-md border bg-surface-100 shadow-sm">
	<div class="flex flex-col items-center gap-4 p-4 sm:flex-row">
		<Brand />

		<!-- PRIVACY POLICY -->
		<a class="text-link text-xs sm:ml-auto" href="/agreements/privacy-policy">Privacy Policy</a>

		<!-- TERMS AND CONDITIONS -->
		<a class="text-link text-xs" href="/agreements/terms-and-conditions">Terms and Conditions</a>

		<!-- COOKIE POLICY -->
		<a class="text-link text-xs" href="/agreements/cookie-policy">Cookie Policy</a>
	</div>

	<!-- DIVIDER -->
	<hr />

	<!-- COPYRIGHT -->
	<p class="p-4 text-center text-xs">
		© {new Date().getFullYear()} Exemplary League of Information Technology Students | All Rights Reserved.<br />
		<span class="text-[10px] text-primary">
			Developed by
			<a class="hover:underline" href="https://www.facebook.com/arben.apura.9/" target="_blank"> Arben Apura </a>
		</span>
	</p>
</div>
