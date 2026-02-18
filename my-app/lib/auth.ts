import type { SupabaseClient } from "@supabase/supabase-js";

export type ProfileRole = "user" | "admin";

export const resolveRole = (role: string | null | undefined) => {
  if (role === "admin" || role === "user") {
    return role;
  }

  return "user";
};

export const getRoleForUser = async (supabase: SupabaseClient, userId: string): Promise<ProfileRole> => {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    return "user";
  }

  return resolveRole(data?.role);
};
