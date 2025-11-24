import { json } from '@sveltejs/kit';

/**
 * Standard error response handler for API routes
 */
export function apiError(message: string, status: number = 500) {
	return json({ error: message }, { status });
}

/**
 * Standard success response handler for API routes
 */
export function apiSuccess<T>(data: T, status: number = 200) {
	return json(data, { status });
}

/**
 * Handle Supabase errors with consistent error messages
 */
export function handleSupabaseError(error: unknown, defaultMessage: string = 'Database operation failed') {
	console.error(defaultMessage, error);
	
	// If it's a Supabase error with a message, use it
	if (error && typeof error === 'object' && 'message' in error) {
		return apiError(error.message as string, 500);
	}
	
	return apiError(defaultMessage, 500);
}

