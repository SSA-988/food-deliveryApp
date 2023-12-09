import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://lmbmtfbkeupxjhqloudk.supabase.co";

const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtYm10ZmJrZXVweGpocWxvdWRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA5OTg3ODgsImV4cCI6MjAxNjU3NDc4OH0.9_ygHp-b8cPeeJ4r9h_AeIF1Cs6JxttYXtzQKd4hWt0"


export const supabase = createClient(supabaseUrl,supabaseAnonKey)