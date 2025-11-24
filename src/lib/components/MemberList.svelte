<script lang="ts">
	import type { Member } from '$lib/types';
	import { formatGradYear } from '$lib/types';
	import MemberCard from './MemberCard.svelte';

	interface Props {
		members: Member[];
		onMemberClick?: (member: Member) => void;
		groupByGradYear?: boolean;
	}

	let { members, onMemberClick, groupByGradYear = false }: Props = $props();

	const groupedMembers = $derived(() => {
		if (!groupByGradYear) {
			return { all: members };
		}

		const groups: Record<string, Member[]> = {};
		members.forEach((member) => {
			if (!groups[member.year_group]) {
				groups[member.year_group] = [];
			}
			groups[member.year_group].push(member);
		});

		// Sort groups by year (newer years first, graduates last)
		const sortedGroups: Record<string, Member[]> = {};
		Object.keys(groups)
			.sort((a, b) => {
				// Special case for 'gra' - always put it last
				if (a === 'gra') return 1;
				if (b === 'gra') return -1;
				// Parse numbers from strings like '25s'
				const aNum = parseInt(a);
				const bNum = parseInt(b);
				return aNum - bNum;
			})
			.forEach((key) => {
				sortedGroups[key] = groups[key];
			});

		return sortedGroups;
	});
</script>

<div class="space-y-8">
	{#each Object.entries(groupedMembers()) as [year, yearMembers]}
		{#if groupByGradYear}
			<div>
				<h2 class="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
					Class of {formatGradYear(year)}
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{#each yearMembers as member (member.id)}
						<MemberCard {member} onclick={() => onMemberClick?.(member)} />
					{/each}
				</div>
			</div>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each yearMembers as member (member.id)}
					<MemberCard {member} onclick={() => onMemberClick?.(member)} />
				{/each}
			</div>
		{/if}
	{/each}

	{#if members.length === 0}
		<div class="text-center py-12">
			<p class="text-gray-500 text-lg">No members found</p>
		</div>
	{/if}
</div>

