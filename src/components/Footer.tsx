import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-footer w-full mt-auto">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-white to-green-300 bg-clip-text text-transparent">
              No Limits Mobile Detailing
            </h3>
            <p className="text-white/80">Professional auto detailing services in San Diego, California</p>
          </div>
          
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <div className="space-y-2">
              <p className="flex items-center justify-center md:justify-start space-x-2">
                <span className="text-[#004d40]">Owner:</span>
                <span className="text-white/80">Myles Phillips</span>
              </p>
              <a href="tel:619-384-1134" className="flex items-center justify-center md:justify-start space-x-2 hover:text-green-300 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span>619-384-1134</span>
              </a>
              <a href="mailto:service@nolimitsmobiledetailing.com" className="flex items-center justify-center md:justify-start space-x-2 hover:text-green-300 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span>service@nolimitsmobiledetailing.com</span>
              </a>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <Link href="/services" className="block hover:text-green-300 transition-colors">Our Services</Link>
              <Link href="/contact" className="block hover:text-green-300 transition-colors">Contact Us</Link>
              <Link href="/admin" className="block hover:text-green-300 transition-colors">Admin Portal</Link>
            </nav>
          </div>
        </div>
        
        <div className="border-t border-white/10 py-4 text-center text-sm text-white/60">
          <p>&copy; {currentYear} No Limits Mobile Detailing LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
