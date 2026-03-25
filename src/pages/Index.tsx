import Navbar from "@/components/Navbar";
import Intro from "@/components/Intro";
import MainHighlight from "@/components/MainHighlight";
import SpotifyPlaying from "@/components/SpotifyPlaying";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col transition-colors duration-300 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-[-8%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-indigo-500/[0.07] dark:bg-indigo-500/[0.11] blur-[130px]" />
      <Navbar />
      <main className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-3xl mx-auto px-4">
          <Intro />
          <ScrollReveal delay={0.1}>
            <MainHighlight />
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <SpotifyPlaying />
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
