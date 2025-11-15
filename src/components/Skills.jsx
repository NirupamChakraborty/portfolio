import React from "react";
export default function Skills() {
const skills = ["HTML", "CSS", "BootStrap", "Tailwind", "RestAPI","TailwindCss", "MaterialUI","JavaScript", "React", "Node.js", "MongoDB", "MySql", "Python", "Docker", "AWS (IAM, EC2, S3, Lambda, RDS)", "Git", "GitHub", "Postman"];
return (
<section id="skills" className="mt-12 bg-white p-6 rounded-xl shadow-sm">
<h3 className="text-2xl font-semibold">Skills</h3>
<div className="mt-4 flex flex-wrap gap-3">
{skills.map((s, i) => (<div key={i} className="px-3 py-1 border rounded-md text-sm">{s}</div>))}
</div>
</section>
);
}