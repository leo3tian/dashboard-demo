import type { User } from "../types";

// Fetches a list of users from the API and ensures it conforms to the `User` type
export async function getUsers(): Promise<User[]> {
  const res = await fetch("/api/users");
  if (!res.ok) throw new Error("Failed to fetch users");

  const data = await res.json();

  return data as User[];
}
