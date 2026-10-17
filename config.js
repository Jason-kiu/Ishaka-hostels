// Supabase connection. The anon key is public by design (the database rules protect the data).
// NEVER put the service_role key here.
window.SUPABASE_URL = 'https://einbiacxyrmhibcephyq.supabase.co';
window.SUPABASE_ANON_KEY = 'sb_publishable_24q15BNOkkIeLqJenxYGIA_5Od2US9D';
window.db = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
