import React from "react";
export default function About() {
return (
<section id="about" className="mt-16 bg-white rounded-2xl p-8 shadow-sm">
<h3 className="text-2xl font-semibold flex items-center gap-3">About Me <a href="/updated_resume.pdf" target="_blank" rel="noreferrer" className="px-3 py-1 border rounded-md text-sm bg-gradient-to-r from-yellow-300 to-yellow-400 text-black">Resume</a></h3> 
<p className="mt-4 text-gray-600">Hello, I'm Nirupam a final year Computer Science Undergrad at Jorhat Engineering College. I love to build  web applications, solve problems, learn about cloud services etc. </p>
<div className="mt-6 grid md:grid-cols-3 gap-4">
<div className="p-4 border rounded-lg">
<h4 className="font-semibold">Education</h4>
<p className="text-sm text-gray-900 mt-2">Jorhat Engineering College (2022 to 2026)</p>
<p className="text-sm text-gray-500 mt-2">B.Tech — Computer Science (4th year)</p> <br />
<p className="text-sm text-gray-900 mt-2">The Little Stars Sr. Sec. School (2019 to 2021)</p>
<p className="text-sm text-gray-500 mt-2">12th (Science)</p>

</div>
<div className="p-4 border rounded-lg">
<h4 className="font-semibold">Interests</h4>
<p className="text-sm text-gray-500 mt-2">Full‑stack, Cloud Services, Frontend, Backend, Databases</p>
</div>
<div className="p-4 border rounded-lg">
<h4 className="font-semibold">Tools</h4>
<p className="text-sm text-gray-500 mt-2">VSCode, Git, Postman, Docker, AWS</p>
</div>
</div>
</section>
);
}