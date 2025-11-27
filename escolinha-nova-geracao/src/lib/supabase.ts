import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jwrungjmbaxpxvfxcpve.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3cnVuZ2ptYmF4cHh2ZnhjcHZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNjM4NjksImV4cCI6MjA3OTgzOTg2OX0.4dMf7uoJhOR6oRbcLo-B6Y4SZ6g7LO_KGMNHmw3Y2Dg';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key são necessários');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 