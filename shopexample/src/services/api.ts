"use client";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export function Api<T>(tableName: string) {
  const [info, setInfo] = useState<T[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from(tableName).select("*");

      if (error) console.error(error);
      else if (data) setInfo(data);
    };

    fetchData();
  }, [tableName]);

  return info;
}
