import { NavLink } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
  <nav className="w-full max-w-5xl mx-auto px-3 py-5 flex items-center justify-between">
    {/* Left side: logo or site title */}
    <a href="/" className="block">
      <img
        src="/img/icon.png"
        alt="Home"
          className="w-16 h-16 object-cover border-2 border-foreground shadow"
      />
    </a>
    {/* Right side: navigation */}
      <ul className="flex gap-6 text-foreground/80 font-medium text-sm items-center">
      <li>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
              `hover:text-foreground transition font-medium px-2 py-1 rounded ${
                isActive ? "text-foreground bg-muted" : ""
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
              `hover:text-foreground transition font-medium px-2 py-1 rounded ${
                isActive ? "text-foreground bg-muted" : ""
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
              `hover:text-foreground transition font-medium px-2 py-1 rounded ${
                isActive ? "text-foreground bg-muted" : ""
            }`
          }
        >
          Contact
        </NavLink>
      </li>
        {/* Theme toggle button */}
        <li>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-foreground/80 hover:text-foreground transition-colors" />
            ) : (
              <Moon className="w-5 h-5 text-foreground/80 hover:text-foreground transition-colors" />
            )}
          </button>
        </li>
    </ul>
  </nav>
);
};

export default Navbar;
