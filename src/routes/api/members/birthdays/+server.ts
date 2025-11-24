import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabase';
import { getUpcomingBirthdays } from '$lib/utils/birthday';
import type { Member } from '$lib/types';
import { apiSuccess, handleSupabaseError } from '$lib/utils/api';

// GET /api/members/birthdays - Get upcoming birthdays
export const GET: RequestHandler = async ({ url }) => {
	const days = parseInt(url.searchParams.get('days') || '30');

	try {
		const { data, error } = await supabase
			.from('members')
			.select('*')
			.not('birthday_full', 'is', null);

		if (error) {
			return handleSupabaseError(error, 'Failed to fetch birthdays');
		}

		const upcomingBirthdays = getUpcomingBirthdays(data as Member[], days);

		return apiSuccess({ birthdays: upcomingBirthdays });
	} catch (error) {
		return handleSupabaseError(error, 'Failed to fetch birthdays');
	}
};

