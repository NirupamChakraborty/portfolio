const skills = ["HTML", "CSS", "BootStrap", "Tailwind", "RestAPI","TailwindCss", "MaterialUI","JavaScript", "React", "Node.js", "MongoDB", "MySql", "Python", "Docker", "AWS (IAM, EC2, S3, Lambda, RDS)", "Git", "GitHub", "Postman", "C++", "JAVA"];

// const skills = [
//     "React", "Node.js", "MongoDB", "AWS",
//     "Docker", "Tailwind", "Framer Motion"
//   ];
  
  export default function Skills() {
    return (
      <div>
        <h2 className="text-3xl font-semibold mb-6">Skills</h2>
  
        <div className="flex flex-wrap gap-4">
          {skills.map((s) => (
            <span
              key={s}
              className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm glass-card"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    );
  }
  