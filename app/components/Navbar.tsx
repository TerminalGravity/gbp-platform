'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();
  
  const navLinks = [
    { href: '/campaigns', label: 'Campaigns' },
    { href: '/live', label: 'Live' },
    { href: '/agents', label: 'Agents' },
    { href: '/docs', label: 'Docs' },
  ];
  
  return (
    <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#00ff88] rounded-lg flex items-center justify-center text-lg">
            🌍
          </div>
          <span className="font-bold text-xl gradient-text">GBP</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`text-sm font-medium transition ${
                pathname === link.href 
                  ? 'text-white' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <ConnectButton 
          showBalance={false}
          chainStatus="icon"
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full',
          }}
        />
      </div>
    </header>
  );
}
