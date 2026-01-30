import { motion } from "framer-motion";

const projects = [
  { title: "Chat AI", github:"https://github.com/NirupamChakraborty/chat-ai" , live:"" , desc: "Developed an AI-powered chat application enabling real-time, context-aware conversations using the OpenAI API. Designed RESTful backend APIs to store, retrieve, and manage chat history in MongoDB, with efficient frontend state management in React." },
  { title: "Phishing Detector",github:"https://github.com/NirupamChakraborty/Malware-and-Phishing-Detection-WebApp" , live:"" , desc: "Developed a cybersecurity web application to analyze URLs and uploaded files (PDF/TXT) for phishing, malware, and defacement threats. Designed and implemented RESTful APIs and integrated third-party services to support secure data processing. Built a MySQL-based authentication system to enhance security, reliability, and application efficiency." },
  { title: "VibeStay",github:"https://github.com/NirupamChakraborty/vibestay-project" , live:"https://vibestay-project.onrender.com/listings" , desc: "Developed a full-stack destination listing and review platform with secure authentication and CRUD operations. Integrated Cloudinary-based image uploads and implemented MVC architecture for scalable and maintainable backend design." },
  { title: "Weatherly",github:"https://github.com/NirupamChakraborty/react-weather-app" , live:" https://hub.docker.com/r/nirupamchakraborty/weather-app" , desc: "Built a responsive weather application displaying real-time temperature, humidity, and weather conditions using the OpenWeatherMap API. Containerized the application using Docker and published the image on Docker Hub." },
  { title: "QuickAI",github:"https://github.com/NirupamChakraborty/Quick-Ai" , live:"https://quick-ai-client-tau.vercel.app/" , desc: "Developed a full-stack AI SaaS platform enabling article generation, blog title creation, resume review, and AI-powered image processing with secure authentication via Clerk. Integrated Gemini API for text generation, Cloudinary for image transformations, and PostgreSQL for persistent storage with usage-based access control for free and premium users."}
];

export default function Projects() {
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-10">Projects</h2>

      <div className="grid md:grid-cols-3 gap-8 ">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ rotateX: 8, rotateY: -8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl glass-card"
          >
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-sm text-white/60 mt-2">{p.desc}</p>
            <div>
            {p.github && <span className="text-lg font-semibold"><a href={p.github}>Github</a></span>}
            {p.live && <span className="mx-10 text-lg font-semibold"><a href={p.live}>Live</a></span>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
