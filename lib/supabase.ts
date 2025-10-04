import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://tmbfxlmptiazzzjxihvx.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtYmZ4bG1wdGlhenp6anhpaHZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1ODI2ODksImV4cCI6MjA3NTE1ODY4OX0.uRheZRGzUydUOKCoYetqU9GFUEICWWGAYiDNxjapDLE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
