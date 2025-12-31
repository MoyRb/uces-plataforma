export type ProfileRole = "user" | "admin" | "reviewer";

export const resolveRole = (role: string | null | undefined, email?: string | null) => {
  if (role === "admin" || role === "reviewer") {
    return role;
  }

  if (email && email.endsWith("@uces.mx")) {
    // TEMP: replace with roles from profiles table when available
    return "admin" satisfies ProfileRole;
  }

  return (role as ProfileRole) ?? "user";
};
