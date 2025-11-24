<script lang="ts">
	import type { UpcomingBirthday } from '$lib/types';
	import { Card, Badge } from '$lib/components/ui';

	interface Props {
		birthdays: UpcomingBirthday[];
	}

	let { birthdays }: Props = $props();

	function getDaysText(days: number): string {
		if (days === 0) return 'Today! 🎉';
		if (days === 1) return 'Tomorrow';
		return `in ${days} days`;
	}
</script>

{#if birthdays.length > 0}
	<Card class="bg-gradient-to-br from-primary-50 to-blue-50">
		<div class="space-y-3">
			<div class="flex items-center gap-2">
				<svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
					/>
				</svg>
				<h2 class="text-lg font-bold text-gray-900">Upcoming Birthdays</h2>
			</div>

			<div class="space-y-2">
				{#each birthdays as { member, daysUntil, isToday } (member.id)}
					<div
						class="flex items-center justify-between p-3 bg-white rounded-lg {isToday
							? 'ring-2 ring-primary-500'
							: ''}"
					>
						<div class="flex-1">
							<div class="flex items-center gap-2">
								<p class="font-semibold text-gray-900">{member.name}</p>
								<Badge variant="primary" size="sm">
									{member.year_group}
								</Badge>
							</div>
							<p class="text-sm text-gray-600">{member.birthday_display}</p>
						</div>
						<div class="text-right">
							<p
								class="text-sm font-medium {isToday
									? 'text-primary-600 font-bold'
									: 'text-gray-600'}"
							>
								{getDaysText(daysUntil)}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</Card>
{/if}

