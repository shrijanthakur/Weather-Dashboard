import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyFavorites, addFavorite, removeFavorite } from "../api/favorites";

export default function FavoritesPanel({ currentWeather }) {
  const { token } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");

  async function loadFavorites() {
    try {
      setFavorites(await getMyFavorites(token));
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => { loadFavorites(); }, []);

  async function handleAdd() {
    if (!currentWeather) return;
    try {
      await addFavorite({ city: currentWeather.name, lat: currentWeather.coord.lat, lon: currentWeather.coord.lon }, token);
      loadFavorites();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleRemove(id) {
    try {
      await removeFavorite(id, token);
      loadFavorites();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">My Favorites</h3>
      {currentWeather && (
        <button onClick={handleAdd} className="text-sm bg-white text-[#5b548a] rounded px-3 py-1 mb-2">
          + Add {currentWeather.name} to favorites
        </button>
      )}
      <ul className="text-sm">
        {favorites.map((fav) => (
          <li key={fav._id} className="flex justify-between items-center py-1">
            <span>{fav.city}</span>
            <button onClick={() => handleRemove(fav._id)} className="text-red-300 text-xs">remove</button>
          </li>
        ))}
      </ul>
      {error && <p className="text-red-300 text-sm">{error}</p>}
    </div>
  );
}