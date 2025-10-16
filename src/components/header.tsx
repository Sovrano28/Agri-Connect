'use client';
import Link from 'next/link';
import { Mountain, Trees, Tractor, Menu } from 'lucide-react';
import { UserNav } from './user-nav';
import { LanguageToggle } from './language-toggle';
import { useLanguage } from '@/lib/contexts';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from './ui/button';
import { useState } from 'react';

export function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/farmland', label: t('farmland'), icon: <Trees className="h-4 w-4" /> },
    { href: '/equipment', label: t('equipment'), icon: <Tractor className="h-4 w-4" /> },
    { href: '/dashboard', label: t('dashboard'), icon: <Tractor className="h-4 w-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Mountain className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline hidden sm:inline-block">
            Agri-Connect
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-foreground/60'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <LanguageToggle />
          <UserNav />
          <div className="md:hidden">
             <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 pt-6">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                  <Mountain className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline">Agri-Connect</span>
                </Link>
                 {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                       onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'text-lg transition-colors hover:text-primary',
                        pathname === link.href ? 'text-primary' : 'text-foreground'
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
