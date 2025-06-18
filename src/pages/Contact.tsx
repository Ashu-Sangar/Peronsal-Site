import { Mail, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

// Utility card for contact links
const ContactCard = ({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-start gap-3 bg-white/5 border border-white/15 rounded-lg px-5 py-4 hover:bg-white/10 transition-colors min-h-[64px] w-full"
  >
    <span className="mt-1">{icon}</span>
    <span>
      <span className="block font-semibold text-white">{label}</span>
      <span className="block text-gray-400 text-sm">{value}</span>
    </span>
  </a>
);

// Utility card for calendar/booking options
const CallOptionCard = ({
  minutes,
  title,
  subtitle,
  onSelect
}: {
  minutes: number;
  title: string;
  subtitle: string;
  onSelect?: () => void;
}) => (
  <div className="flex flex-col border border-white/15 rounded-lg px-6 py-5 bg-white/5 hover:bg-white/10 transition-colors w-full">
    <div className="flex items-center gap-2 mb-2">
      <span className="font-bold text-white">{title}</span>
      <span className="bg-gray-700/80 text-white/80 text-xs font-medium rounded px-2 py-0.5 ml-1">{minutes} min</span>
    </div>
    <span className="text-gray-300 text-sm mb-1">{subtitle}</span>
    <button
      className="text-xs text-gray-400 flex items-center gap-1 mt-2 hover:underline"
      onClick={onSelect}
      type="button"
    >
      Select this option
      <svg className="inline-block ml-1" width="16" height="16" fill="none">
        <path d="m6 4 4 4-4 4" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  </div>
);

export default function Contact() {
  const [showCalendar, setShowCalendar] = useState<null | '15' | '30' | '45'>(null);

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center pt-16 pb-12">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center px-4">
          <h1 className="text-3xl font-bold text-white text-center">Contact</h1>
          <p className="text-white/70 text-center text-lg mt-2 mb-8">Let's connect.</p>
          <p className="mb-7 text-gray-400 text-center text-base">
            Connect with me through any of these platforms.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-10">
            <ContactCard
              icon={<Mail size={22} className="text-white" />}
              label="Email"
              value="ashu.sangar18@gmail.com"
              href="mailto:ashu.sangar18@gmail.com"
            />
            <ContactCard
              icon={<Instagram size={22} className="text-white" />}
              label="Instagram"
              value="@ashuknows"
              href="https://instagram.com/ashuknows"
            />
            <ContactCard
              icon={<Linkedin size={22} className="text-white" />}
              label="LinkedIn"
              value="in/ashu-sangar"
              href="https://linkedin.com/in/ashu-sangar"
            />
          </div>
          <section className="w-full">
            <h2 className="text-xl font-semibold text-white mb-1">Book a Call</h2>
            <p className="text-gray-400 text-base mb-6">
              Schedule a call with me if you need a more in-depth conversation about anything you want!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center place-items-center">
              {/* 15 Min Chat Card or Calendar */}
              <div className="w-full">
                {showCalendar === '15' ? (
                  <div className="flex flex-col border border-white/15 rounded-lg px-0 py-0 bg-white/5 w-full h-full">
                    <button
                      className="self-start m-4 px-3 py-1 rounded bg-gray-800 text-white text-xs hover:bg-gray-700 transition"
                      onClick={() => setShowCalendar(null)}
                      type="button"
                    >
                      ← Back
                    </button>
                    <iframe
                      src="https://cal.com/ashu-sangar/15min"
                      width="100%"
                      height="600"
                      style={{ border: "none", borderRadius: "12px" }}
                      title="Schedule a meeting"
                    />
                  </div>
                ) : (
                  <CallOptionCard
                    minutes={15}
                    title="15 Min Chat"
                    subtitle="Quick chat"
                    onSelect={() => setShowCalendar('15')}
                  />
                )}
              </div>
              {/* 30 Min Chat Card or Calendar */}
              <div className="w-full">
                {showCalendar === '30' ? (
                  <div className="flex flex-col border border-white/15 rounded-lg px-0 py-0 bg-white/5 w-full h-full">
                    <button
                      className="self-start m-4 px-3 py-1 rounded bg-gray-800 text-white text-xs hover:bg-gray-700 transition"
                      onClick={() => setShowCalendar(null)}
                      type="button"
                    >
                      ← Back
                    </button>
                    <iframe
                      src="https://cal.com/ashu-sangar/30min"
                      width="100%"
                      height="600"
                      style={{ border: "none", borderRadius: "12px" }}
                      title="Schedule a meeting"
                    />
                  </div>
                ) : (
                  <CallOptionCard
                    minutes={30}
                    title="30 Min Chat"
                    subtitle="Standard meeting"
                    onSelect={() => setShowCalendar('30')}
                  />
                )}
              </div>
              {/* 45 Min Chat Card or Calendar */}
              <div className="w-full">
                {showCalendar === '45' ? (
                  <div className="flex flex-col border border-white/15 rounded-lg px-0 py-0 bg-white/5 w-full h-full">
                    <button
                      className="self-start m-4 px-3 py-1 rounded bg-gray-800 text-white text-xs hover:bg-gray-700 transition"
                      onClick={() => setShowCalendar(null)}
                      type="button"
                    >
                      ← Back
                    </button>
                    <iframe
                      src="https://cal.com/ashu-sangar/45min"
                      width="100%"
                      height="600"
                      style={{ border: "none", borderRadius: "12px" }}
                      title="Schedule a meeting"
                    />
                  </div>
                ) : (
                  <CallOptionCard
                    minutes={45}
                    title="45 Min Chat"
                    subtitle="Standard meeting"
                    onSelect={() => setShowCalendar('45')}
                  />
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
