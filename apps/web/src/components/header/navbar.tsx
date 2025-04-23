import Link from "next/link";

const sections = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "/servicios" },
  { name: "Contacto", href: "/contacto" },
];
export function Navbar() {
  return (
    <nav className="hidden items-center gap-4 text-sm md:flex">
      {sections.map((section) => (
        <Link
          key={section.name}
          href={section.href}
          className="text-foreground/80 transition-colors hover:text-foreground/80"
        >
          {section.name}
        </Link>
      ))}
    </nav>
  );
}
