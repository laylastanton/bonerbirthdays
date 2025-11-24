<script lang="ts">
	import { Badge } from '$lib/components/ui';
	import { GRADUATION_YEARS, formatGradYear } from '$lib/types';

	interface Props {
		selectedYear: string | null;
	}

	let { selectedYear = $bindable() }: Props = $props();
</script>

<div class="flex flex-wrap items-center gap-2">
	<span class="text-sm font-medium text-gray-700">Filter by year:</span>
	<button
		onclick={() => (selectedYear = null)}
		class="px-3 py-1.5 text-sm font-medium rounded-full transition-colors {selectedYear === null
			? 'bg-primary-600 text-white'
			: 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
	>
		All
	</button>
	{#each GRADUATION_YEARS as year}
		<button
			onclick={() => (selectedYear = year)}
			class="px-3 py-1.5 text-sm font-medium rounded-full transition-colors {selectedYear === year
				? 'bg-primary-600 text-white'
				: 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
		>
			{formatGradYear(year)}
		</button>
	{/each}
</div>

