import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-800 w-full mt-auto z-50">
      <div className=" mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="text-center md:text-left">
          <Link href="/">
          <Image
            src="/images/logoSD.png"
            alt="San Diego Custom Backyards Logo"
            width={200}
            height={60}
            className="object-contain rounded-md"
            priority
          />
        </Link>

            <h3 className="text-xl font-semibold mb-4 text-green-700">San Diego Custom Backyards & Landscaping</h3>
            <p className="text-gray-600">Providing premium landscaping and outdoor services in San Diego, California.</p>
          </div>

          {/* Contact Information */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4 text-green-700">Contact Us</h4>
            <div className="space-y-2">
              <a href="tel:123-456-7890" className="block text-gray-600 hover:text-green-600">
                <svg className="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                123-456-7890
              </a>
              <a href="mailto:info@sandiegocustombackyardsandlandscaping.com" className="block text-gray-600 hover:text-green-600">
                <svg className="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@SanDiegoCustomBackyardsLandscaping.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4 text-green-700">Quick Links</h4>
            <nav className="space-y-2">
              <Link href="/#services" className="block text-black hover:text-green-600">Our Services</Link>
              <Link href="/#about" className="block text-black hover:text-green-600">About Us</Link>
              <Link href="/booking" className="block text-black hover:text-green-600">Get a Quote</Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-4 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} SanDiegoCustomBackyards&Landscaping. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
