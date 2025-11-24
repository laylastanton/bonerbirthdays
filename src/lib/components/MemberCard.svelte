<script lang="ts">
	import type { Member } from '$lib/types';
	import { Card, Badge } from '$lib/components/ui';
	import { formatPhoneNumber } from '$lib/utils/phone';

	interface Props {
		member: Member;
		onclick?: () => void;
	}

	let { member, onclick }: Props = $props();

	const formattedPhone = $derived(formatPhoneNumber(member.phone));
</script>

<Card hover={!!onclick} {onclick} class="group">
	<div class="space-y-2">
		<div class="flex items-start justify-between gap-2">
			<h3 class="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
				{member.name}
			</h3>
			<Badge variant="primary" size="sm">
				{member.year_group}
			</Badge>
		</div>

		{#if member.birthday_display}
			<div class="flex items-center gap-1.5 text-sm text-gray-600">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
				<span>{member.birthday_display}</span>
			</div>
		{/if}

		{#if formattedPhone}
			<div class="flex items-center gap-1.5 text-sm text-gray-600">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
					/>
				</svg>
				<span>{formattedPhone}</span>
			</div>
		{/if}
	</div>
</Card>

