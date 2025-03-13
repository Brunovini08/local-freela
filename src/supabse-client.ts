import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_URL
const subaseKey = import.meta.env.VITE_API

export const supabase = createClient(supabaseUrl, subaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: true,
    detectSessionInUrl: false
  }
})

