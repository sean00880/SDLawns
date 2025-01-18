"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sidebar w-1/6">
      <ul>
        <li>
          <Link href="/services" className={pathname === '/services' ? 'active' : ''}>Services</Link>
        </li>
        <li>
          <Link href="/contact" className={pathname === '/contact' ? 'active' : ''}>Contact</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
