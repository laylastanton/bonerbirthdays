import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabase';
import type { UpdateMemberInput } from '$lib/types';
import { apiError, apiSuccess, handleSupabaseError } from '$lib/utils/api';

// GET /api/members/[id] - Get a single member
export const GET: RequestHandler = async ({ params }) => {
	try {
		const { data, error } = await supabase
			.from('members')
			.select('*')
			.eq('id', params.id)
			.single();

		if (error) {
			return handleSupabaseError(error, 'Member not found');
		}

		return apiSuccess({ member: data });
	} catch (error) {
		return handleSupabaseError(error, 'Failed to fetch member');
	}
};

// PUT /api/members/[id] - Update a member
export const PUT: RequestHandler = async ({ params, request }) => {
	try {
		const body: UpdateMemberInput = await request.json();

		const updateData: Record<string, unknown> = {};
		if (body.name !== undefined) updateData.name = body.name;
		if (body.year_group !== undefined) updateData.year_group = body.year_group;
		if (body.phone !== undefined) updateData.phone = body.phone;
		if (body.birthday_full !== undefined) updateData.birthday_full = body.birthday_full;
		if (body.birthday_display !== undefined) updateData.birthday_display = body.birthday_display;

		const { data, error } = await supabase
			.from('members')
			.update(updateData)
			.eq('id', params.id)
			.select()
			.single();

		if (error) {
			return handleSupabaseError(error, 'Failed to update member');
		}

		return apiSuccess({ member: data });
	} catch (error) {
		return handleSupabaseError(error, 'Failed to update member');
	}
};

// DELETE /api/members/[id] - Delete a member
export const DELETE: RequestHandler = async ({ params }) => {
	try {
		const { error } = await supabase.from('members').delete().eq('id', params.id);

		if (error) {
			return handleSupabaseError(error, 'Failed to delete member');
		}

		return apiSuccess({ success: true });
	} catch (error) {
		return handleSupabaseError(error, 'Failed to delete member');
	}
};

