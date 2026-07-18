import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginUser, registerUser } from "../api/auth";

export default function AuthForms() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ username: "", email: "", password: "", fullName: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      if (mode === "register") await registerUser(form);
      const res = await loginUser({ username: form.username, password: form.password });
      login(res.data.user, res.data.accessToken);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">{mode === "login" ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {mode === "register" && (
          <>
            <input placeholder="Full Name" className="p-2 rounded text-black" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
            <input placeholder="Email" className="p-2 rounded text-black" value={form.email} onChange={(e) => update("email", e.target.value)} />
          </>
        )}
        <input placeholder="Username" className="p-2 rounded text-black" value={form.username} onChange={(e) => update("username", e.target.value)} />
        <input placeholder="Password" type="password" className="p-2 rounded text-black" value={form.password} onChange={(e) => update("password", e.target.value)} />
        <button type="submit" className="bg-white text-[#5b548a] font-semibold rounded py-2 mt-2">
          {mode === "login" ? "Login" : "Register"}
        </button>
      </form>
      {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
      <button className="text-sm underline mt-3" onClick={() => setMode(mode === "login" ? "register" : "login")}>
        {mode === "login" ? "Need an account? Register" : "Already have an account? Login"}
      </button>
    </div>
  );
}