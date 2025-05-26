import type { User } from "../types"

export async function getUsers(): Promise<User[]> {
    const res = await fetch("/api/users");
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
}
