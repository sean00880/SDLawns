"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="glass-header sticky top-0 w-full z-50">
      <div className="p-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left side: Logo + contact info */}
        <div className="flex flex-col md:flex-row items-center md:space-x-6 mb-4 md:mb-0">
          {/* Replaced text link with a Logo image link */}
          <Link
            href="/"
            className="
              inline-block 
              hover:opacity-90 
              transition-opacity
            "
          >
            <Image
              src="/images/logo.png"      // Replace with your actual logo path
              alt="No Limits Mobile Detailing Logo"
              width={300}                 // Adjust width & height
              height={100}
              className="object-contain"
              priority
            />
          </Link>

          {/* Contact info */}
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <a
              href="tel:619-384-1134"
              className="flex items-center space-x-2 hover:text-green-300 transition-colors text-white"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 
                  01.948.684l1.498 4.493a1 1 0 
                  01-.502 1.21l-2.257 1.13a11.042 
                  11.042 0 005.516 5.516l1.13-2.257a1 
                  1 0 011.21-.502l4.493 1.498a1 1 
                  0 01.684.949V19a2 2 0 01-2 2h-1C9.716 
                  21 3 14.284 3 6V5z"
                />
              </svg>
              <span>619-384-1134</span>
            </a>
            <a
              href="mailto:service@nolimitsmobiledetailing.com"
              className="flex text-white items-center space-x-2 hover:text-green-300 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 
                  002.22 0L21 8M5 19h14a2 2 0 
                  002-2V7a2 2 0 00-2-2H5a2 2 
                  0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="hidden md:inline">
                service@nolimitsmobiledetailing.com
              </span>
            </a>
          </div>
        </div>

        {/* Right side: Nav */}
        <nav className="w-full md:w-auto">
          <ul className="flex justify-center md:justify-end space-x-8">
            <li>
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link href="#services" className="nav-link">
                Services
              </Link>
            </li>
            <li>
              <Link href="/booking" className="nav-link">
                Instant Free Quote
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
