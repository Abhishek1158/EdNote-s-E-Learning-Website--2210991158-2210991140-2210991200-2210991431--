import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const tohandleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/login", { email, password });
      console.log("API response:", res.data);
      // saving token
      localStorage.setItem("token", res.data.token);
      // save user for Navbar
      localStorage.setItem( "user", JSON.stringify({ id: res.data.user?._id, username: res.data.user?.name || res.data.user?.username || email, email: res.data.user?.email || email  }) );
      console.log("Login successful!");
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Failed to login");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-100 to-pink-200">
      <form onSubmit={tohandleLogin} className="bg-gray-400 p-10 rounded-2xl shadow-2xl w-full max-w-md flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Welcome Back</h2>
        {/* email input */}
        <div className="relative">
          <input type="email" placeholder="Email..." value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition" required />
        </div>
        {/* password input*/}
        <div className="relative">
          <input type="password" placeholder="Password..." value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition" required />
        </div>
        {/* log in button*/}
        <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:scale-105 transform transition" >
          Login
        </button>
        <p className="text-center text-black mt-2">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 font-semibold hover:underline"> Register </a>
        </p>
      </form>
    </div>
  );
}