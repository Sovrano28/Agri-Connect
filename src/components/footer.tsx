'use client';
import Link from "next/link";
import { Mountain } from "lucide-react";
import { useLanguage } from '@/lib/contexts';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-secondary/70 text-secondary-foreground py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Mountain className="h-6 w-6 text-primary" />
            <span className="font-headline font-bold text-lg">Agri-Connect</span>
          </Link>
          <p className="text-sm">{t('hero_title')}</p>
        </div>
        <div>
          <h3 className="font-headline font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/farmland" className="hover:text-primary">{t('farmland')}</Link></li>
            <li><Link href="/equipment" className="hover:text-primary">{t('equipment')}</Link></li>
            <li><Link href="/dashboard" className="hover:text-primary">{t('dashboard')}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-headline font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-primary">{t('terms')}</Link></li>
            <li><Link href="#" className="hover:text-primary">{t('privacy')}</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-border/50 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Agri-Connect. All rights reserved.</p>
      </div>
    </footer>
  );
}
