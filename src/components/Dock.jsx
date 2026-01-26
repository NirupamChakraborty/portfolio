import { motion } from "framer-motion";
import {
    Code2,
    FolderGit2,
    Home,
    Mail,
    User,
} from "lucide-react";

const items = [
  { id: "hero", icon: Home, label: "Home" },
  { id: "about", icon: User, label: "About" },
  { id: "projects", icon: FolderGit2, label: "Projects" },
  { id: "skills", icon: Code2, label: "Skills" },
  { id: "contact", icon: Mail, label: "Contact" },
];

export default function Dock() {
  return (
    <div
      className="
        fixed bottom-4 md:bottom-6
        left-1/2 -translate-x-1/2
        z-50
      "
    >
      <div
        className="
          flex items-end gap-3 md:gap-4
          px-4 md:px-6
          py-3 md:py-4
          rounded-2xl
          bg-white/15
          backdrop-blur-2xl
          border border-white/20
          shadow-2xl
        "
      >
        {items.map((item) => (
          <DockIcon key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function DockIcon({ item }) {
  const Icon = item.icon;

  return (
    <motion.a
      href={`#${item.id}`}
      whileHover={{
        scale: 1.8,
        y: -14,
      }}
      whileTap={{ scale: 1.4 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 18,
      }}
      className="group relative"
    >
      <div
        className="
          w-10 h-10 md:w-12 md:h-12
          flex items-center justify-center
          rounded-xl
          bg-white/20
          hover:bg-white/30
          transition
        "
      >
        <Icon size={20} className="md:hidden" />
        <Icon size={26} className="hidden md:block" />
      </div>

      {/* Tooltip – desktop only */}
      <span
        className="
          hidden md:block
          absolute -top-10 left-1/2 -translate-x-1/2
          text-xs px-2 py-1
          rounded-md
          bg-black/80
          opacity-0
          group-hover:opacity-100
          transition
          pointer-events-none
        "
      >
        {item.label}
      </span>
    </motion.a>
  );
}
