import { API_URL } from "./config";

export async function searchUsers(query) {
  const res = await fetch(`${API_URL}/api/users/search?username=${encodeURIComponent(query)}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Search failed");
  return data.data;
}