import { Mail, MapPin, Phone, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: "Men's Collection", href: '#' },
      { name: "Women's Collection", href: '#' },
      { name: "Kids' Collection", href: '#' },
      { name: 'Accessories', href: '#' },
      { name: 'New Arrivals', href: '#' },
      { name: 'Sale', href: '#' },
    ],
    help: [
      { name: 'Customer Service', href: '#' },
      { name: 'Track Order', href: '#' },
      { name: 'Returns & Exchanges', href: '#' },
      { name: 'Shipping Info', href: '#' },
      { name: 'Size Guide', href: '#' },
      { name: 'FAQ', href: '#' },
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Sustainability', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Contact', href: '#' },
    ],
  };

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Youtube', icon: Youtube, href: '#' },
  ];

  return (
    <footer className="bg-primary-900 text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 pb-16 border-b border-primary-700">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-3">
              Join the LUXE Community
            </h3>
            <p className="text-primary-300 mb-6">
              Subscribe for exclusive offers, early access, and style tips
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-lg bg-primary-800 border border-primary-700 focus:border-white focus:outline-none transition-colors duration-200 text-white placeholder-primary-400"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-primary-900 font-semibold rounded-lg hover:bg-primary-100 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary-900 font-bold text-xl">L</span>
              </div>
              <span className="text-2xl font-bold tracking-tight">LUXE</span>
            </div>
            <p className="text-primary-300 mb-6 max-w-sm">
              Crafting premium fashion for the modern individual. Quality, style, and sustainability woven into every piece.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-primary-300">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span>123 Fashion Ave, New York, NY</span>
              </div>
              <div className="flex items-center gap-3 text-primary-300">
                <Phone className="w-5 h-5 text-primary-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-primary-300">
                <Mail className="w-5 h-5 text-primary-400" />
                <span>hello@luxe.com</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Help</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-400 text-sm">
            {currentYear} LUXE Fashion. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="p-2 bg-primary-800 hover:bg-primary-700 rounded-lg transition-colors duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-4 text-sm text-primary-400">
            <a href="#" className="hover:text-white transition-colors duration-200">
              Privacy
            </a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors duration-200">
              Terms
            </a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors duration-200">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
