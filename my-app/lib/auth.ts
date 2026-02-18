import type { SupabaseClient } from "@supabase/supabase-js";

export type ProfileRole = "user" | "admin";

export const resolveRole = (role: string | null | undefined): ProfileRole => {
  if (role === "admin" || role === "user") {
    return role;
  }

  return "user";
};

export const getRoleForSession = async (supabase: SupabaseClient): Promise<ProfileRole> => {
  const { data, error } = await supabase.rpc("get_my_role");

  if (error) {
    return "user";
  }

  return resolveRole(typeof data === "string" ? data : null);
};
