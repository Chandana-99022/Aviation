const SUPABASE_URL = "https://fhpnchegjzlywqujdjlx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_kAUKT375snYnwFPoPROzwQ_DvJHuPRH";
if (!window.supabase) {
    console.error("Supabase library did not load!");
} else {
    window.aviationDB = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );

    console.log("Aviation database connected:", !!window.aviationDB);
}