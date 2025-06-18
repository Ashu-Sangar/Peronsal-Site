import Navbar from "@/components/Navbar";
import Intro from "@/components/Intro";
import MainHighlight from "@/components/MainHighlight";
import SpotifyPlaying from "@/components/SpotifyPlaying";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-2xl mx-auto px-4">
          <Intro />
          <MainHighlight />
          <SpotifyPlaying />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
