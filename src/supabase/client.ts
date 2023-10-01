import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'url_failure';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your_default_key';
// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
