import { useAuth } from "../context/AuthContext";
import AuthForms from "./AuthForms";
import FavoritesPanel from "./FavoritesPanel";
import UserSearch from "./UserSearch";
import { logoutUser } from "../api/auth";

export default function SideMenu({ open, onClose, currentWeather }) {
  const { user, token, logout } = useAuth();

  async function handleLogout() {
    try { await logoutUser(token); } catch {}
    logout();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="w-80 bg-[#5b548a] text-white h-full p-5 overflow-y-auto">
        <button onClick={onClose} className="mb-4 text-white/80">✕ Close</button>
        {!user ? (
          <AuthForms />
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-1">Hi, {user.username}</h2>
            <button onClick={handleLogout} className="text-sm underline mb-4">Logout</button>
            <FavoritesPanel currentWeather={currentWeather} />
            <UserSearch />
          </div>
        )}
      </div>
      <div className="flex-1" onClick={onClose} />
    </div>
  );
}