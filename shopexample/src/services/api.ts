import { supabase } from "@/lib/supabaseClient";

export async function Api(tableName: string) {
  const { data, error } = await supabase.from(tableName).select("*");

  if (error) console.error(error);
  return data;
}
