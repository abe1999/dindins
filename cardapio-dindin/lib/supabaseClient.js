import { createClient } from "@supabase/supabase-js";

// Pega as variáveis que você colocou no .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Cria e exporta o cliente de conexão
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
