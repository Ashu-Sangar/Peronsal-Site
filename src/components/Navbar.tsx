import { NavLink } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left side: logo */}
        <a href="/" className="block shrink-0">
          <img
            src="/img/icon.png"
            alt="Home"
            className="w-12 h-12 object-cover rounded-full border-2 border-foreground/20 shadow-sm"
          />
        </a>
        {/* Right side: navigation */}
        <ul className="flex gap-1 text-foreground/80 font-medium text-sm items-center">
          {[
            { to: "/", label: "Home", end: true },
            { to: "/about", label: "About" },
            { to: "/projects", label: "Projects" },
            { to: "/contact", label: "Contact" },
          ].map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `hover:text-foreground transition-colors duration-150 font-medium px-3 py-1.5 rounded-md ${
                    isActive ? "text-foreground border border-foreground/20" : ""
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li className="ml-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-muted transition-colors duration-200 cursor-pointer"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-foreground/80" />
              ) : (
                <Moon className="w-5 h-5 text-foreground/80" />
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
