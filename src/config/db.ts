import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/db.types";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseApiKey = process.env.SUPABASE_APIKEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseApiKey);
