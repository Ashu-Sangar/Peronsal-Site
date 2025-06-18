import { Github, Linkedin, Mail } from "lucide-react";

// Inline Spotify icon SVG as a React component
const SpotifyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props} width={22} height={22}>
    <circle cx="12" cy="12" r="12" fill="#1DB954"/>
    <path d="M17.3 16.07a.83.83 0 00-1.13-.25c-3.1 1.91-7.02 2.09-11.05.55a.83.83 0 00-.62 1.54c4.38 1.62 8.71 1.41 12.29-.64.38-.23.5-.73.25-1.12zm.6-2.9a1.04 1.04 0 00-1.41-.33c-2.43 1.49-6.13 1.92-8.99.5a1.03 1.03 0 00-.9 1.86c3.33 1.62 7.54 1.13 10.48-.55.49-.29.65-.93.34-1.48zm1.16-2.88A1.34 1.34 0 0017.6 9.8c-2.79-1.69-7.07-1.85-9.65-.48a1.33 1.33 0 101.23 2.34c2.04-1.07 5.73-.92 7.92.34a1.34 1.34 0 001.7-.82z" fill="#fff"/>
  </svg>
);

const Footer = () => (
  <footer className="w-full max-w-5xl mx-auto text-center mt-20 mb-6 px-3 flex flex-col items-center gap-3">
    <div className="flex justify-center gap-4 mb-2">
      <a href="https://github.com/Ashu-Sangar" className="text-white/70 hover:text-white transition" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
        <Github size={22} />
      </a>
      {/* Discord icon removed */}
      <a href="https://www.linkedin.com/in/ashu-sangar/" className="text-white/70 hover:text-white transition" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
        <Linkedin size={22} />
      </a>
      <a href="https://open.spotify.com/user/ashusangar?si=369ebf328e644297" className="text-green-400 hover:text-green-300 transition" aria-label="Spotify" target="_blank" rel="noopener noreferrer">
        <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png" alt="Spotify Logo" width={22} height={22} />
      </a>
      <a href="mailto:ashu.sangar18@gmail.com" className="text-white/70 hover:text-white transition" aria-label="Email">
        <Mail size={22} />
      </a>
    </div>
    <div className="text-xs text-white/50">&copy; 2025 Your Name. All rights reserved.</div>
  </footer>
);

export default Footer;
