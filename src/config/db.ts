import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/db.schema";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseApiKey = process.env.SUPABASE_APIKEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseApiKey);
