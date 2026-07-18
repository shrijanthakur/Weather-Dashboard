import { useState } from "react";
import { searchUsers } from "../api/users";
import { getFavoritesByUsername } from "../api/favorites";

export default function UserSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e.preventDefault();
    setError("");
    setSelected(null);
    try {
      setResults(await searchUsers(query));
    } catch (err) {
      setError(err.message);
    }
  }

  async function viewFavorites(username) {
    try {
      setSelected(await getFavoritesByUsername(username));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h3 className="font-semibold mb-2">Find a User</h3>
      <form onSubmit={handleSearch} className="flex gap-2 mb-2">
        <input placeholder="username" className="p-2 rounded text-black flex-1" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit" className="bg-white text-[#5b548a] rounded px-3">Go</button>
      </form>
      {error && <p className="text-red-300 text-sm">{error}</p>}
      <ul className="text-sm mb-3">
        {results.map((u) => (
          <li key={u._id} className="cursor-pointer underline" onClick={() => viewFavorites(u.username)}>{u.username}</li>
        ))}
      </ul>
      {selected && (
        <div className="bg-white/10 rounded p-2">
          <p className="font-semibold">{selected.user.username}'s favorites:</p>
          <ul className="text-sm list-disc list-inside">
            {selected.favorites.length === 0 && <li>No favorites yet</li>}
            {selected.favorites.map((f) => <li key={f._id}>{f.city}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}