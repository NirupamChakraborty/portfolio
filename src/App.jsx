import About from "./components/About";
import BackgroundVideo from "./components/BackgroundVideo";
import Contact from "./components/Contact";
import Dock from "./components/Dock";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import WorkExperience from "./components/WorkExperience";

export default function App() {
  return (
    <div className="relative min-h-screen text-white">
      {/* Background video */}
      <BackgroundVideo />

      {/* Content */}
      <main className="relative z-10 px-6 md:px-24 py-32 pb-40 space-y-44">
        <section id="hero"><Hero /></section>
        <section id="about"><About /></section>
        <section id="about"><WorkExperience /></section>
        <section id="projects"><Projects /></section>
        <section id="skills"><Skills /></section>
        <section id="contact"><Contact /></section>
      </main>

      {/* Dock */}
      <Dock />
    </div>
  );
}
