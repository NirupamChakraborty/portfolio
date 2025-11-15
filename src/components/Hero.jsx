import React from "react";
export default function Hero() {
return (
<section className="grid md:grid-cols-2 gap-8 items-center">
<div>
<h2 className="text-4xl md:text-5xl font-extrabold leading-tight">Hi I'm Nirupam. I build beautiful web apps that solves real world problems.</h2>
<p className="mt-4 text-gray-600 max-w-xl">I'm a 4th-year Computer Science student focused on full-stack web development, GenAi and cloud tools. I love clean UI and elegant solutions.  Funfact: Sometimes I prefer Tea over Coffee.</p>
<div className="mt-6 flex items-center gap-4">
<a href="#projects" className="inline-block px-5 py-2 rounded-lg shadow-md border bg-gradient-to-r from-yellow-300 to-yellow-400 text-black font-medium">See Projects</a>
<a href="#contact" className="inline-block px-4 py-2 rounded-lg text-sm border">Get in touch</a>
</div>
<div className="mt-6 text-sm text-gray-500">
<strong>Available for:</strong> Internships • Full-time roles • Freelance projects
</div>
</div>
<div className="flex justify-center md:justify-end">
<div className="w-64 h-64 rounded-2xl bg-white shadow-lg flex items-center justify-center overflow-hidden">
<img src="https://res.cloudinary.com/dlfiyfch6/image/upload/v1763218099/profile_nihyug.jpg" alt="profile" className="object-cover w-full h-full" />
</div>
</div>
</section>
);
}