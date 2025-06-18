import { useTheme } from "@/context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <footer className="w-full max-w-5xl mx-auto text-center mt-20 mb-6 px-3 flex flex-col items-center gap-3">
      <div className="flex justify-center gap-4 mb-2">
        {/* GitHub Icon */}
        <a href="https://github.com/Ashu-Sangar" className="hover:opacity-80 transition" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
          <img 
            src={theme === 'dark' 
              ? "https://img.icons8.com/?size=100&id=12598&format=png&color=FFFFFF"
              : "https://img.icons8.com/?size=100&id=12598&format=png&color=000000"
            } 
            alt="GitHub" 
            width={22} 
            height={22} 
            className="transition-opacity duration-300"
          />
        </a>
        
        {/* LinkedIn Icon */}
        <a href="https://www.linkedin.com/in/ashu-sangar/" className="hover:opacity-80 transition" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
          <img 
            src={theme === 'dark' 
              ? "https://img.icons8.com/?size=100&id=447&format=png&color=FFFFFF"
              : "https://img.icons8.com/?size=100&id=447&format=png&color=000000"
            } 
            alt="LinkedIn" 
            width={22} 
            height={22} 
            className="transition-opacity duration-300"
          />
        </a>
        
        {/* Spotify Icon */}
        <a href="https://open.spotify.com/user/ashusangar?si=369ebf328e644297" className="hover:opacity-80 transition" aria-label="Spotify" target="_blank" rel="noopener noreferrer">
          <img 
            src={theme === 'dark' 
              ? "https://img.icons8.com/?size=100&id=6707&format=png&color=FFFFFF"
              : "https://img.icons8.com/?size=100&id=6707&format=png&color=000000"
            } 
            alt="Spotify" 
            width={22} 
            height={22} 
            className="transition-opacity duration-300"
          />
        </a>
        
        {/* Email Icon */}
        <a href="mailto:ashu.sangar18@gmail.com" className="hover:opacity-80 transition" aria-label="Email">
          <img 
            src={theme === 'dark' 
              ? "https://img.icons8.com/?size=100&id=rUgzXdXFnhmg&format=png&color=FFFFFF"
              : "https://img.icons8.com/?size=100&id=rUgzXdXFnhmg&format=png&color=000000"
            } 
            alt="Email" 
            width={22} 
            height={22} 
            className="transition-opacity duration-300"
          />
        </a>
      </div>
      <div className="text-xs text-muted-foreground">&copy; 2025 Ashu Sangar. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
