export type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Restaurants", href: "/restaurants" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default navLinks;
