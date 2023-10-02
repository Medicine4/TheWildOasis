import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lousiukjohxxmqodtjxv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvdXNpdWtqb2h4eG1xb2R0anh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYyMTYzMjksImV4cCI6MjAxMTc5MjMyOX0.pep64FFTZagaLHiDQDA1OvgV5G9dxg7Enrpq8hKCV8A";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
