import { NavLink } from "react-router-dom";

const Navbar = () => (
  <nav className="w-full max-w-5xl mx-auto px-3 py-5 flex items-center justify-between">
    {/* Left side: logo or site title */}
    <a href="/" className="block">
      <img
        src="/img/icon.png"
        alt="Home"
        className="w-16 h-16 object-cover border-2 border-white shadow"
      />
    </a>
    {/* Right side: navigation */}
    <ul className="flex gap-6 text-white/80 font-medium text-sm items-center">
      <li>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `hover:text-white transition font-medium px-2 py-1 rounded ${
              isActive ? "text-white bg-gray-800" : ""
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `hover:text-white transition font-medium px-2 py-1 rounded ${
              isActive ? "text-white bg-gray-800" : ""
            }`
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `hover:text-white transition font-medium px-2 py-1 rounded ${
              isActive ? "text-white bg-gray-800" : ""
            }`
          }
        >
          Contact
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navbar;
