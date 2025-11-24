export interface Member {
	id: string;
	name: string;
	year_group: string;
	phone: string | null;
	birthday_full: string | null; // ISO date string
	birthday_display: string | null; // "Jan 12" format
	created_at: string;
	updated_at: string;
}

export interface CreateMemberInput {
	name: string;
	year_group: string;
	phone?: string;
	birthday_full?: string;
	birthday_display?: string;
}

export interface UpdateMemberInput {
	name?: string;
	year_group?: string;
	phone?: string;
	birthday_full?: string;
	birthday_display?: string;
}

export interface UpcomingBirthday {
	member: Member;
	daysUntil: number;
	isToday: boolean;
}

export const GRADUATION_YEARS = ['25s', '26s', '27s', '28s', '29s', 'gra'] as const;
export type GraduationYear = (typeof GRADUATION_YEARS)[number];

/**
 * Format graduation year for display
 * @example formatGradYear('25s') => "'25s"
 * @example formatGradYear('gra') => "Graduate"
 */
export function formatGradYear(year: string): string {
	return year === 'gra' ? 'Graduate' : `'${year}`;
}

