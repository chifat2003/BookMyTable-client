import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🍽️</span>
              <span className="text-xl font-bold text-white">BookMyTable</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Discover and book the best restaurants near you. Your perfect dining experience is just a click away.
            </p>
            <div className="flex gap-4 mt-4">
              {[
                { label: "Facebook", icon: "f" },
                { label: "Twitter", icon: "t" },
                { label: "Instagram", icon: "in" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold hover:bg-orange-500 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Restaurants", "About", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item === "Home" ? "" : item.toLowerCase()}`}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cuisines */}
          <div>
            <h3 className="text-white font-semibold mb-4">Cuisines</h3>
            <ul className="space-y-2">
              {["Italian", "Chinese", "Indian", "Japanese", "Mexican", "American"].map((c) => (
                <li key={c}>
                  <a href="#" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>123 Food Street, Dining City, DC 10001</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+1 (555) 000-0000</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <span>hello@bookmytable.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} BookMyTable. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
