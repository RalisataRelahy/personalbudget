import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yqqniguyqlocmyywztue.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxcW5pZ3V5cWxvY215eXd6dHVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5OTYyODMsImV4cCI6MjA3OTU3MjI4M30.biypFNcsbYsfGXyDbr1TcMTHUDJnKtTudexd6defF_M";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
