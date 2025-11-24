<script lang="ts">
	import type { Member, CreateMemberInput, UpdateMemberInput } from '$lib/types';
	import { Input, Button } from '$lib/components/ui';
	import { GRADUATION_YEARS, formatGradYear } from '$lib/types';
	import { parseBirthday, formatBirthdayDisplay } from '$lib/utils/birthday';
	import { isValidPhoneNumber } from '$lib/utils/phone';

	interface Props {
		member?: Member;
		onSubmit: (data: CreateMemberInput | UpdateMemberInput) => Promise<void>;
		onCancel: () => void;
	}

	let { member, onSubmit, onCancel }: Props = $props();

	let name = $state(member?.name || '');
	let graduationYear = $state(member?.year_group || '25s');
	let phone = $state(member?.phone || '');
	let birthdayInput = $state(member?.birthday_display || '');
	let isSubmitting = $state(false);
	let errors = $state<Record<string, string>>({});

	function validate(): boolean {
		errors = {};

		if (!name.trim()) {
			errors.name = 'Name is required';
		}

		if (phone && !isValidPhoneNumber(phone)) {
			errors.phone = 'Please enter a valid phone number';
		}

		return Object.keys(errors).length === 0;
	}

	async function handleSubmit() {
		if (!validate()) return;

		isSubmitting = true;

		try {
			const data: CreateMemberInput | UpdateMemberInput = {
				name: name.trim(),
				year_group: graduationYear,
				phone: phone.trim() || undefined
			};

			// Parse and format birthday if provided
			if (birthdayInput.trim()) {
				const parsedDate = parseBirthday(birthdayInput);
				if (parsedDate) {
					data.birthday_full = parsedDate.toISOString().split('T')[0]; // YYYY-MM-DD format
					data.birthday_display = formatBirthdayDisplay(parsedDate) || undefined;
				}
			}

			await onSubmit(data);
		} catch (error) {
			console.error('Failed to submit form:', error);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-4">
	<Input
		bind:value={name}
		id="member-name"
		label="Name *"
		placeholder="Enter name"
		error={errors.name}
		required
	/>

	<div>
		<label for="grad-year" class="block text-sm font-medium text-gray-700 mb-1">
			Graduation Year *
		</label>
		<select
			id="grad-year"
			bind:value={graduationYear}
			class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
		>
			{#each GRADUATION_YEARS as year}
				<option value={year}>{formatGradYear(year)}</option>
			{/each}
		</select>
	</div>

	<Input
		bind:value={phone}
		id="member-phone"
		label="Phone Number"
		placeholder="(555) 555-5555"
		error={errors.phone}
		helperText="Optional"
		type="tel"
	/>

	<Input
		bind:value={birthdayInput}
		id="member-birthday"
		label="Birthday"
		placeholder="Jan 12 or January 12"
		helperText="Optional - Enter as 'Jan 12' or 'January 12'"
	/>

	<div class="flex items-center justify-end gap-3 pt-4">
		<Button type="button" variant="ghost" onclick={onCancel} disabled={isSubmitting}>
			Cancel
		</Button>
		<Button type="submit" disabled={isSubmitting}>
			{isSubmitting ? 'Saving...' : member ? 'Update' : 'Create'}
		</Button>
	</div>
</form>

