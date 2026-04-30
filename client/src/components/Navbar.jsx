import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const getColorFromString = (str) => {
    const colors=["bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-pink-500", "bg-yellow-500"];
    let hashed = 0;
    for (let i = 0; i < str.length; i++) {
      hashed = str.charCodeAt(i) + ((hashed << 5) - hashed);
    }
    return colors[Math.abs(hashed) % colors.length];
  };
  const Rawuser = localStorage.getItem("user");
  const user = Rawuser ? JSON.parse(Rawuser) : null;
  const nameDisplay = user?.name || user?.email || "";
  const firstLetter = nameDisplay ? nameDisplay.trim().charAt(0).toUpperCase() : "..";
  const avatarName = nameDisplay || "guest";
  const avatarColor = getColorFromString(avatarName);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <nav className="bg-gradient-to-r from-[#191970] to-[#102C26] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        {/* logo */}
        <div className="flex items-center gap-2">
          <img src="images/EdNote's.png" className="w-8 h-8 rounded" alt="EdNote's portrait"></img>
          <Link to="/" className="text-2xl font-bold"> EdNote's </Link>
        </div>
        {/* courses */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          {token && (
            <Link to="/courses" className="hover:text-gray-200"> Courses </Link>
          )}
          {!token ? (
            <>
              <Link to="/login" className="hover:text-gray-200">Login</Link>
              <Link to="/register" className="hover:text-gray-200">Register</Link>
            </>
          ) : (
            /* user name */
            <div className="relative">
              <div onClick={() => setMenuOpen(!menuOpen)} title={user?.email}
                className={`w-10 h-10 cursor-pointer rounded-full bg-gray-200 text-black flex items-center justify-center font-bold cursor-pointer ${avatarColor}`} >
                {firstLetter}
              </div>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white text-gray-800 rounded shadow-lg">
                  <button onClick={handleLogout} className="w-full px-4 py-2 text-left hover:bg-gray-100" > Logout </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}