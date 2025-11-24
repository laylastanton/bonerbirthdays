import type { Member, UpcomingBirthday } from '$lib/types';

/**
 * Parse various birthday formats and return a Date object
 */
export function parseBirthday(birthdayStr: string): Date | null {
	if (!birthdayStr) return null;

	try {
		// Try parsing as ISO date first
		const isoDate = new Date(birthdayStr);
		if (!isNaN(isoDate.getTime())) {
			return isoDate;
		}

		// Try parsing common formats like "Jan 12", "January 12"
		const monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		const shortMonthNames = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		];

		// Extract month and day
		const parts = birthdayStr.trim().split(/[\s,]+/);
		if (parts.length >= 2) {
			const monthStr = parts[0];
			const day = parseInt(parts[1]);

			const monthIndex =
				monthNames.findIndex((m) => m.toLowerCase() === monthStr.toLowerCase()) ||
				shortMonthNames.findIndex((m) => m.toLowerCase() === monthStr.toLowerCase());

			if (monthIndex !== -1 && !isNaN(day)) {
				// Use current year as placeholder
				const date = new Date(new Date().getFullYear(), monthIndex, day);
				return date;
			}
		}

		return null;
	} catch {
		return null;
	}
}

/**
 * Format birthday to display format (e.g., "Jan 12")
 */
export function formatBirthdayDisplay(date: Date | null): string | null {
	if (!date) return null;

	const shortMonthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	const month = shortMonthNames[date.getMonth()];
	const day = date.getDate();

	return `${month} ${day}`;
}

/**
 * Calculate days until next birthday
 */
export function daysUntilBirthday(birthday: Date): number {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const thisYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());

	// If birthday has passed this year, calculate for next year
	if (thisYearBirthday < today) {
		thisYearBirthday.setFullYear(today.getFullYear() + 1);
	}

	const diffTime = thisYearBirthday.getTime() - today.getTime();
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	return diffDays;
}

/**
 * Get upcoming birthdays within the next n days
 */
export function getUpcomingBirthdays(members: Member[], days: number = 30): UpcomingBirthday[] {
	const upcoming: UpcomingBirthday[] = [];

	for (const member of members) {
		if (!member.birthday_full) continue;

		const birthday = new Date(member.birthday_full);
		const daysUntil = daysUntilBirthday(birthday);

		if (daysUntil <= days) {
			upcoming.push({
				member,
				daysUntil,
				isToday: daysUntil === 0
			});
		}
	}

	// Sort by days until birthday
	upcoming.sort((a, b) => a.daysUntil - b.daysUntil);

	return upcoming;
}

/**
 * Calculate age from birthday
 */
export function calculateAge(birthday: Date): number {
	const today = new Date();
	let age = today.getFullYear() - birthday.getFullYear();
	const monthDiff = today.getMonth() - birthday.getMonth();

	if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
		age--;
	}

	return age;
}

