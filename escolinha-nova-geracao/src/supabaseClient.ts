import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ctpftyjnazlwcqgmmolz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0cGZ0eWpuYXpsd2NxZ21tb2x6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzOTI2NjEsImV4cCI6MjA2Mzk2ODY2MX0.hDHDkXz6bZ8lhNO6SegW8iTragMAHssHseXoAxXlFnA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 