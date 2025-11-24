import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabase';
import type { CreateMemberInput } from '$lib/types';
import { apiError, apiSuccess, handleSupabaseError } from '$lib/utils/api';

// GET /api/members - List all members with optional filtering
export const GET: RequestHandler = async ({ url }) => {
	const gradYear = url.searchParams.get('gradYear');

	try {
		let query = supabase.from('members').select('*').order('year_group', { ascending: false });

		if (gradYear) {
			query = query.eq('year_group', gradYear);
		}

		const { data, error } = await query;

		if (error) {
			return handleSupabaseError(error, 'Failed to fetch members');
		}

		return apiSuccess({ members: data });
	} catch (error) {
		return handleSupabaseError(error, 'Failed to fetch members');
	}
};

// POST /api/members - Create a new member
export const POST: RequestHandler = async ({ request }) => {
	try {
		const body: CreateMemberInput = await request.json();

		const { data, error } = await supabase
			.from('members')
			.insert([
				{
					name: body.name,
					year_group: body.year_group,
					phone: body.phone || null,
					birthday_full: body.birthday_full || null,
					birthday_display: body.birthday_display || null
				}
			])
			.select()
			.single();

		if (error) {
			return handleSupabaseError(error, 'Failed to create member');
		}

		return apiSuccess({ member: data }, 201);
	} catch (error) {
		return handleSupabaseError(error, 'Failed to create member');
	}
};

