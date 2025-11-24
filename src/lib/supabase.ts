import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

// Use empty strings as fallback for development (will be set in production)
const supabaseUrl = PUBLIC_SUPABASE_URL || '';
const supabaseKey = PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

