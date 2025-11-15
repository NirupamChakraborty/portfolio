import React from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";


export default function PersonalPortfolio() {
return (
<div className="min-h-screen bg-blue-50 text-gray-900 antialiased">
<header className="bg-white shadow">
<div className="container mx-auto px-6 py-4 flex items-center justify-between">
<div className="flex items-center space-x-3">
<div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center text-white font-bold">NC</div>
<div>
<h1 className="text-lg font-semibold">Nirupam Chakraborty</h1>
<p className="text-sm text-gray-500">4th-year CSE • Full‑Stack Web Developer</p>
</div>
</div>


<nav className="hidden md:flex items-center space-x-6 text-sm">
<a href="#about" className="hover:text-yellow-600">About</a>
<a href="#projects" className="hover:text-yellow-600">Projects</a>
<a href="#skills" className="hover:text-yellow-600">Skills</a>
<a href="#contact" className="hover:text-yellow-600">Contact</a>

</nav>


{/* <div className="md:hidden">
<button className="text-sm px-3 py-1 border rounded-md">Menu</button>
</div> */}
</div>
</header>


<main className="container mx-auto px-6 py-12">
<Hero />
<About />
<Projects />
<Skills />
<Contact />


<footer className="mt-12 py-6 text-center text-sm text-gray-500">
© {new Date().getFullYear()} Nirupam Chakraborty — Built with ❤️ • <a href="#" className="underline">Privacy</a>
</footer>
</main>
</div>
);
}