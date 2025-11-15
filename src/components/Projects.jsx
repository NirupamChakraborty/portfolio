import React from "react";
export default function Projects() {
const projects = [
{ title: "Chat AI", desc: "Chat app that can ans personal queries, generate formatted code etc", tech: ["gpt-o4-mini model","MongoDB", "React", "Node.js"], link: "https://github.com/NirupamChakraborty/chat-ai" },
{ title: "Phishing Detector", desc: "Phishing and Malware detector.", tech: ["Python", "Flask", "gemini-flash-2.5 model", "mysql"], link: "https://github.com/NirupamChakraborty/Malware-and-Phishing-Detection-WebApp" },
{ title: "VibeStay", desc: "A platform where users can list there favourite locations and review them", tech: ["ejs", "Bootstrap", "passport.js", "express.js", "MongoDB"], link: "https://github.com/NirupamChakraborty/vibestay-project" }
];
return (
<section id="projects" className="mt-12">
<h3 className="text-2xl font-semibold">Selected Projects</h3>
<div className="mt-6 grid md:grid-cols-3 gap-6">
{projects.map((p, i) => (
<article key={i} className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
<h4 className="font-semibold text-lg">{p.title}</h4>
<p className="text-sm text-gray-600 mt-2">{p.desc}</p>
<div className="mt-4 flex flex-wrap gap-2">
{p.tech.map((t, idx) => (<span key={idx} className="text-xs px-2 py-1 border rounded-full">{t}</span>))}
</div>
<div className="mt-4"><a href={p.link} className="text-sm underline">View project</a></div>
</article>
))}
</div>
</section>
);
}