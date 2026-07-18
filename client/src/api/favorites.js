export async function getMyFavorites(token) {
  const res = await fetch("/api/favorites", { headers: { Authorization: `Bearer ${token}` } });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch favorites");
  return data.data;
}

export async function addFavorite({ city, lat, lon }, token) {
  const res = await fetch("/api/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ city, lat, lon }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to add favorite");
  return data.data;
}

export async function removeFavorite(id, token) {
  const res = await fetch(`/api/favorites/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to remove favorite");
}

export async function getFavoritesByUsername(username) {
  const res = await fetch(`/api/favorites/user/${username}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "User not found");
  return data.data;
}