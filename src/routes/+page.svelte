<script lang="ts">
	// IMPORTED COMPONENTS
	import { Heading } from '$lib/components';
	import CBLSection from './__root__/components/CBLSection.svelte';
	import MembershipSection from './__root__/components/MembershipSection.svelte';
	import MerchandiseSection from './__root__/components/MerchandiseSection.svelte';
	import OfficersSection from './__root__/components/OfficersSection.svelte';
	import StatsSection from './__root__/components/StatsSection.svelte';
</script>

<Heading isHeadOnly />

<MembershipSection />
<MerchandiseSection />
<StatsSection />
<OfficersSection />
<CBLSection />
