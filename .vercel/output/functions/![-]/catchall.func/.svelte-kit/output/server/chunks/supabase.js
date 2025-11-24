import { createClient } from "@supabase/supabase-js";
const PUBLIC_SUPABASE_URL = "https://placeholder.supabase.co";
const PUBLIC_SUPABASE_ANON_KEY = "placeholder_key_needs_to_be_replaced";
const supabaseUrl = PUBLIC_SUPABASE_URL;
const supabaseKey = PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
export {
  supabase as s
};
