'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const fullPath = pathname + window.location.hash;
    setActiveLink(fullPath);
  }, [pathname]);

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
  };

  const isActive = (href: string) => {
    return activeLink === href;
  };

  return (
    <div className="flex justify-center items-center sticky top-3 w-full z-10">
      <nav className="flex gap-1 p-0.5 border border-white/20 rounded-full bg-white/10 backdrop-blur-sm">
        <Link
          href="/"
          className={`nav-item ${isActive('/') ? 'bg-green-300 text-gray-900 hover:bg-green-300/70 hover:text-gray-900' : ''}`}
          onClick={() => handleLinkClick('/')}
        >
          Home
        </Link>
        <Link
          href="/#projects"
          className={`nav-item ${isActive('/#projects') ? 'bg-green-300 text-gray-900 hover:bg-green-300/70 hover:text-gray-900' : ''}`}
          onClick={() => handleLinkClick('/#projects')}
        >
          Projects
        </Link>
        <Link
          href="/about"
          className={`nav-item ${isActive('/about') ? 'bg-green-300 text-gray-900 hover:bg-green-300/70 hover:text-gray-900' : ''}`}
          onClick={() => handleLinkClick('/about')}
        >
          About
        </Link>

        <Link href="/Yvonne_Product Designer.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={`nav-item ${isActive('/#contact') ? 'bg-green-300 text-gray-900 hover:bg-green-300/70 hover:text-gray-900' : ''}`}
          onClick={() => handleLinkClick('/#contact')}
        >
          Resume
        </Link>
      </nav>
    </div>
  );
};